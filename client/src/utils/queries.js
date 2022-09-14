import { gql } from '@apollo/client'; 

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

// we can now use QUERY_THOUGHTS function anywhere we need throughout the front end of the app. This query will be used on the homepage of the application so lets import it and put it to use there at home.js in the pages directory 