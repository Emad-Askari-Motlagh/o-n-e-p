import { CostumerAddressInput } from "./../../generated/graphql";
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

export const UPDATE_MENU_ITEMS = gql`
  mutation UpdateMenuItems(
    $productId: ID!
    $restaurant: String!
    $category: String!
    $input: MenuItemInput
  ) {
    UpdateMenuItems(
      productId: $productId
      restaurant: $restaurant
      category: $category
      input: $input
    ) {
      name
    }
  }
`;
export const ADD_MENU_ITEM = gql`
  mutation AddMenuItem(
    $restaurant: String!
    $category: String!
    $input: MenuItemInput
  ) {
    AddMenuItem(restaurant: $restaurant, category: $category, input: $input) {
      name
    }
  }
`;
export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword(
    $token: String!
    $newPass: String!
    $userId: String!
  ) {
    UpdatePassword(token: $token, newPass: $newPass, userId: $userId) {
      email
    }
  }
`;

export const SEND_RESET_PASSWORD = gql`
  mutation SendResetPassword($email: String!) {
    SendResetPassword(email: $email) {
      token
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $category: String!
    $image: String!
    $categoryId: String!
  ) {
    UpdateCategory(
      category: $category
      image: $image
      categoryId: $categoryId
    ) {
      itemName
    }
  }
`;

export const PAY = gql`
  mutation Pay($restaurant: String, $products: [MenuItemInput]) {
    Pay(restaurant: $restaurant, products: $products) {
      product {
        name
      }
    }
  }
`;

export const ADD_CUSTOMER_ADDRESS = gql`
  mutation AddCostumerAddress($address: CostumerAddressInput) {
    AddCostumerAddress(address: $address) {
      title
      city
      region
      postNumber
      address
    }
  }
`;

export const ADD_MENU_CATEGORY = gql`
  mutation AddMenuCategory($name: String!, $image: String!) {
    AddMenuCategory(name: $name, image: $image) {
      itemName
    }
  }
`;

export const EDIT_USER_INFO_ITEM = gql`
  mutation EditUserInfoItem($name: String!, $value: String!) {
    EditUserInfoItem(name: $name, value: $value) {
      name
    }
  }
`;
export const EDIT_RESTAURANT_INFO_ITEM = gql`
  mutation EditRestaurantInfoItem(
    $restaurant: String!
    $name: String!
    $value: String!
  ) {
    EditRestaurantInfoItem(
      restaurant: $restaurant
      name: $name
      value: $value
    ) {
      name
    }
  }
`;
