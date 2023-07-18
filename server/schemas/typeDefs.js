const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [post]
  }

  type post {
    _id: ID
    message: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String): User
    posts(username: String): [post]
    post(postId: ID!): post
    me: User 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addpost(message: String!): post
    addComment(postId: ID!, commentText: String!): post
    removepost(postId: ID!): post
    removeComment(postId: ID!, commentId: ID!): post
  }
`;

module.exports = typeDefs;