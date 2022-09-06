import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      token
    }
  }
`;
export const LOGIN_WITH_GOOGLE = gql`
  mutation SignInWithGoogle($email: String!, $password: String!) {
    SignInWithGoogle(email: $email, password: $password) {
      token
    }
  }
`;
export const ADD_COSTUMER = gql`
  mutation AddCostumer($name: String!, $email: String!, $table: Int!) {
    AddCostumer(name: $name, email: $email, table: $table) {
      name
      table
      email
    }
  }
`;
export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    CreateUser(email: $email, password: $password, username: $username) {
      email
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    SignOut
  }
`;

export const SIGN_OUT_COSTUMER = gql`
  mutation SignOutCostumer {
    SignOutCostumer
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder($productId: ID!) {
    AddOrder(productId: $productId) {
      orderQuantity
    }
  }
`;

export const REMOVE_ORDER = gql`
  mutation RemoveOrder($productId: ID!) {
    RemoveOrder(productId: $productId) {
      orderQuantity
    }
  }
`;

export const DELETE_COSTUMER = gql`
  mutation DeleteCostumer($costumerId: String) {
    DeleteCostumer(costumerId: $costumerId) {
      name
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation PostMessage($user: String!, $content: String!) {
    PostMessage(user: $user, content: $content)
  }
`;
export const GET_COSTUMER_ORDERS = gql`
  mutation GetCostumerOrders($restaurant: String!) {
    GetCostumerOrders(restaurant: $restaurant) {
      orderQuantity
      _id
      product {
        name
        price
        description
        _id
      }
    }
  }
`;
