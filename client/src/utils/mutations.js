import { gql } from '@apollo/client';

//client side mutations for our react app

// login user mutation 
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// add user mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// add book mutation
export const SAVE_BOOK = gql`
  mutation addBook($userId: ID!, $bookId: String!, $authors: [String]!, $title: String!, $description: String!, $image: String!, $link: String!) {
  addBook(userId: $userId, bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image, link: $link) {
    _id
    username
    email
    password
    bookCount
    savedBooks {
      bookId
      authors
      title
      description
      image
      link
    }
  }
}
`;

// delete book mutation
export const REMOVE_BOOK = gql`
mutation deleteBook($userId: ID!, $bookId: String!) {
  deleteBook(userId: $userId, bookId: $bookId) {
    _id
    username
    email
    password
    bookCount
    savedBooks {
      bookId
      authors
      title
      description
      image
      link
    }
  }
}
`;