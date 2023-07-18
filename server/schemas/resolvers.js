const {AuthenticationError} = require('apollo-server-express');
const {user, post} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async() => {
            return user.find().populate('posts');
        },
        user: async(parent, {username}) => {
            return user.findOne({username}).populate('posts');
        },
        posts: async(parent, {username}) => {
            const params = username ? {username} : {};
            return post.find(params).sort({ createdAt: -1});
        },
        post: async(parent, {postId}) => {
            return post.findOne({ _id:postId});
        },
        me: async(parent, args, context) => {
            if (context.user) {
                return user.findOne({ _id: context.user._id}).populate('posts');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await user.create({ username, email, password});
            const token= signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await user.findOne({ email });

            if (!user){
                throw new AuthenticationError('No user found with these credentials')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            const token = signToken(user);

            return { token, user };
        },
        addpost: async (parent, { message }, context) => {
            if (context.user) {
              const post = await post.create({
                message,
                postAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { posts: post._id } }
              );
      
              return post;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          addComment: async (parent, { postId, commentText }, context) => {
            if (context.user) {
              return post.findOneAndUpdate(
                { _id: postId },
                {
                  $addToSet: {
                    comments: { commentText, commentAuthor: context.user.username },
                  },
                },
                {
                  new: true,
                  runValidators: true,
                }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removepost: async (parent, { postId }, context) => {
            if (context.user) {
              const post = await post.findOneAndDelete({
                _id: postId,
                postAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { posts: post._id } }
              );
      
              return post;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeComment: async (parent, { postId, commentId }, context) => {
            if (context.user) {
              return post.findOneAndUpdate(
                { _id: postId },
                {
                  $pull: {
                    comments: {
                      _id: commentId,
                      commentAuthor: context.user.username,
                    },
                  },
                },
                { new: true }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    }
};

module.exports = resolvers;