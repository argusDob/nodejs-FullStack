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

//Post Mutatations

//User Mutation

export const SIGNIN = gql`
mutation($username:String!, $password:String!){
  signInUser(username:$username, password: $password){
   token
  }
}
`;

export const SIGNUP =  gql`
mutation($username:String!, $email:String!, $password:String!){
  signupUser(username:$username, email:$email, password:$password){
  token
    
  }
}
`;

