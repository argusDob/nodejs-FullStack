import { gql } from "apollo-boost";


// Posts Querries

export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
    }
  }
`;

// USer queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      password
      avatar
      joinDate
      favorites {
        _id
        title
        imageUrl
      }
    }
  }
`;

//Post Mutatations

//User Mutation

export const SIGNIN = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_POSTS = gql`
  mutation(
    $title: String!
    $description: String!
    $imageUrl: String!
    $creatorId: ID!
    $categories: [String]!
  ) {
    addPost(
      title: $title
      imageUrl: $imageUrl
      categories: $categories
      creatorId: $creatorId
      description: $description
    ) {
      _id
      title
      description
      imageUrl
    }
  }
`;
