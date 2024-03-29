import { ExtraItemInput } from "./../../generated/graphql";
import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      token
    }
  }
`;
export const LOGIN_WITH_GOOGLE = gql`
  mutation SignInWithGoogle {
    SignInWithGoogle {
      email
    }
  }
`;

export const SIGN_UP_WITH_GOOGLE = gql`
  mutation SignUpWithGoogle {
    SignUpWithGoogle {
      email
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
    $subCat: [String]
  ) {
    AddMenuItem(
      restaurant: $restaurant
      category: $category
      input: $input
      subCat: $subCat
    ) {
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
  mutation Pay($restaurant: String!, $products: [String!], $price: Float!) {
    Pay(restaurant: $restaurant, products: $products, price: $price) {
      _id
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
  mutation AddMenuCategory(
    $name: String!
    $image: String!
    $restaurant: String!
    $parent: String!
  ) {
    AddMenuCategory(
      name: $name
      image: $image
      restaurant: $restaurant
      parent: $parent
    ) {
      itemName
      parent
    }
  }
`;
export const DELETE_CATEGORY = gql`
  mutation DeleteMenuCategory($categoryId: String!, $restaurant: String!) {
    DeleteMenuCategory(categoryId: $categoryId, restaurant: $restaurant)
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
  mutation EditRestaurantInfoItem($name: String!, $value: String!) {
    EditRestaurantInfoItem(name: $name, value: $value) {
      name
    }
  }
`;
export const GET_ANALISTICS = gql`
  mutation GetAnalistics($year: Int) {
    GetAnalistics(year: $year) {
      sum
      _id
    }
  }
`;
export const GET_RAPPORT = gql`
  mutation GetRapport($beginDate: Date, $finishDate: Date) {
    GetRapport(beginDate: $beginDate, finishDate: $finishDate) {
      categorizedByName {
        _id
        sum
      }
      categorizedByTags {
        _id
        sum
      }
      categorizedByDate {
        _id
        sum
      }
    }
  }
`;
export const GET_BILL_INFO = gql`
  mutation GetBillInfo($restaurant: String!, $recieptId: String!) {
    GetBillInfo(restaurant: $restaurant, recieptId: $recieptId) {
      _id
      date
      price
      products {
        name
        price
        _id
      }
    }
  }
`;
export const ADD_MENU_SUB_CATEGORY = gql`
  mutation AddSubCategory($id: String!, $cat: String!, $restaurant: String!) {
    AddSubCategory(id: $id, cat: $cat, restaurant: $restaurant) {
      itemName
      subCategory
      parent
    }
  }
`;
export const ADD_MENU_ITEM_SUB_CATEGORY = gql`
  mutation AddMenuItemSubCategory(
    $id: String!
    $cat: String!
    $restaurant: String!
  ) {
    AddMenuItemSubCategory(id: $id, cat: $cat, restaurant: $restaurant) {
      name
    }
  }
`;

export const DELETE_MENU_ITEM_SUB_CATEGORY = gql`
  mutation DeleteMenuItemSubCategory(
    $id: String!
    $cat: String!
    $restaurant: String!
  ) {
    DeleteMenuItemSubCategory(id: $id, cat: $cat, restaurant: $restaurant) {
      name
    }
  }
`;

export const ADD_EXTRA_ORDER = gql`
  mutation AddExtraItem(
    $description: String
    $id: ID!
    $orderItem: [ExtraItemInput]
  ) {
    AddExtraItem(description: $description, id: $id, orderItem: $orderItem)
  }
`;

export const DELETE_ADMIN_ORDER = gql`
  mutation DeleteItemFromAdminList($itemId: String, $costumerId: String) {
    DeleteItemFromAdminList(itemId: $itemId, costumerId: $costumerId)
  }
`;
