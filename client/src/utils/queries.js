import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        message
        createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts {
    posts {
      _id
      message
      postAuthor
      createdAt
    }
  }
`;

export const QUERY_POST = gql`
  query getSingleThought($postId: ID!) {
    post(postId: $postId) {
      _id
      message
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        message
        postAuthor
        createdAt
      }
    }
  }
`;