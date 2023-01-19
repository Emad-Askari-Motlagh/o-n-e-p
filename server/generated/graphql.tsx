import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Address = {
  __typename?: 'Address';
  first: Scalars['String'];
  secound: Scalars['String'];
};

export type AdminOrder = {
  __typename?: 'AdminOrder';
  _id?: Maybe<Scalars['ID']>;
  costumer?: Maybe<Costumer>;
  date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  orderQuantity?: Maybe<Scalars['Int']>;
  product?: Maybe<MenuItem>;
  restaurant?: Maybe<Scalars['String']>;
};

export type Analistic = {
  __typename?: 'Analistic';
  _id?: Maybe<Scalars['ID']>;
  sum?: Maybe<Scalars['Int']>;
};

export type Category = {
  __typename?: 'Category';
  _id?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['Int']>;
};

export type CategoryParent = {
  __typename?: 'CategoryParent';
  categorizedByDate?: Maybe<Array<Maybe<Category>>>;
  categorizedByName?: Maybe<Array<Maybe<Category>>>;
  categorizedByTags?: Maybe<Array<Maybe<Category>>>;
};

export type CookieError = {
  __typename?: 'CookieError';
  message: Scalars['String'];
};

export type CookieSuccess = {
  __typename?: 'CookieSuccess';
  message?: Maybe<Scalars['String']>;
};

export type Costumer = {
  __typename?: 'Costumer';
  _id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  table?: Maybe<Scalars['Int']>;
};

export type CostumerAddress = {
  __typename?: 'CostumerAddress';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postNumber?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CostumerAddressInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  postNumber?: InputMaybe<Scalars['Int']>;
  region?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CostumerMenuChoises = MenuItem | OrderItem;

export type InfoItem = Restaurant | User;

export type Location = {
  __typename?: 'Location';
  coordinates?: Maybe<Array<Scalars['Float']>>;
  type: Scalars['String'];
};

export type LocationInput = {
  coordinates?: InputMaybe<Array<Scalars['Int']>>;
  mytype: Scalars['String'];
};

export type Menu = {
  __typename?: 'Menu';
  _id?: Maybe<Scalars['ID']>;
  category?: Maybe<Array<Maybe<MenuParent>>>;
  restaurant?: Maybe<Restaurant>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  _id?: Maybe<Scalars['ID']>;
  availability?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  itemsType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderQuantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  restaurant?: Maybe<Scalars['String']>;
  subCat?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MenuItemInput = {
  availability?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  itemsType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type MenuParent = {
  __typename?: 'MenuParent';
  _id?: Maybe<Scalars['ID']>;
  collectionType?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  item?: Maybe<Array<Maybe<MenuItem>>>;
  itemName?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  restaurant?: Maybe<Restaurant>;
  subCategory?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MenuParentInput = {
  collectionType: Scalars['String'];
  id: Scalars['Int'];
  item?: InputMaybe<Array<MenuItemInput>>;
  itemName: Scalars['String'];
};

export type MenuSubItem = {
  __typename?: 'MenuSubItem';
  _id?: Maybe<MenuItem>;
};

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddAddress: User;
  AddCostumer?: Maybe<Costumer>;
  AddCostumerAddress?: Maybe<CostumerAddress>;
  AddMenu?: Maybe<Menu>;
  AddMenuCategory?: Maybe<MenuParent>;
  AddMenuItem?: Maybe<MenuItem>;
  AddOrder: Array<Maybe<AdminOrder>>;
  AddRestaurant: Restaurant;
  AddSellInfo: SellInfo;
  CostumerExpiry?: Maybe<CookieSuccess>;
  CreateUser: User;
  DeleteCostumer?: Maybe<Costumer>;
  DeleteMenuCategory: Scalars['String'];
  EditRestaurantInfoItem?: Maybe<Restaurant>;
  EditUserInfoItem?: Maybe<User>;
  EmitSocket?: Maybe<OrderItem>;
  FetchRestaurantsByQuery?: Maybe<Array<Maybe<Restaurant>>>;
  GetAnalistics?: Maybe<Array<Maybe<Analistic>>>;
  GetBillInfo: OrderHistory;
  GetCostumerOrders: Array<Maybe<OrderItem>>;
  GetOrderItem?: Maybe<OrderItem>;
  GetRapport?: Maybe<Array<Maybe<CategoryParent>>>;
  Pay: SellInfo;
  PostMessage: Scalars['ID'];
  RemoveOrder: Array<Maybe<AdminOrder>>;
  SendResetPassword: User;
  SignIn: Token;
  SignInWithGoogle?: Maybe<Scalars['String']>;
  SignOut?: Maybe<Scalars['String']>;
  SignOutCostumer?: Maybe<Scalars['String']>;
  SignUpWithGoogle: User;
  UpdateCategory: MenuParent;
  UpdateMenuItems: MenuItem;
  UpdatePassword: User;
  UpdateUser: User;
};


export type MutationAddAddressArgs = {
  address: Scalars['String'];
};


export type MutationAddCostumerArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  table: Scalars['Int'];
};


export type MutationAddCostumerAddressArgs = {
  address?: InputMaybe<CostumerAddressInput>;
};


export type MutationAddMenuArgs = {
  category?: InputMaybe<Array<MenuParentInput>>;
  restaurant: Scalars['String'];
};


export type MutationAddMenuCategoryArgs = {
  image: Scalars['String'];
  name: Scalars['String'];
  parent: Scalars['String'];
  restaurant: Scalars['String'];
};


export type MutationAddMenuItemArgs = {
  category: Scalars['String'];
  input?: InputMaybe<MenuItemInput>;
  restaurant: Scalars['String'];
};


export type MutationAddOrderArgs = {
  productId: Scalars['ID'];
};


export type MutationAddRestaurantArgs = {
  description: Scalars['String'];
  id: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  location: LocationInput;
  name: Scalars['String'];
  numReviews: Scalars['Int'];
  owner: Scalars['String'];
  rating: Scalars['Int'];
  reviews?: InputMaybe<Array<Scalars['String']>>;
  type: Scalars['String'];
};


export type MutationAddSellInfoArgs = {
  items: Array<InputMaybe<Scalars['String']>>;
  price: Scalars['Float'];
  restaurant: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteCostumerArgs = {
  costumerId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteMenuCategoryArgs = {
  categoryId: Scalars['String'];
  restaurant: Scalars['String'];
};


export type MutationEditRestaurantInfoItemArgs = {
  name: Scalars['String'];
  restaurant?: InputMaybe<Scalars['String']>;
  value: Scalars['String'];
};


export type MutationEditUserInfoItemArgs = {
  name: Scalars['String'];
  value: Scalars['String'];
};


export type MutationFetchRestaurantsByQueryArgs = {
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type MutationGetAnalisticsArgs = {
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationGetBillInfoArgs = {
  recieptId: Scalars['String'];
  restaurant: Scalars['String'];
};


export type MutationGetCostumerOrdersArgs = {
  restaurant: Scalars['String'];
};


export type MutationGetOrderItemArgs = {
  productId: Scalars['ID'];
  restaurant: Scalars['String'];
};


export type MutationGetRapportArgs = {
  beginDate?: InputMaybe<Scalars['String']>;
  finishDate?: InputMaybe<Scalars['String']>;
};


export type MutationPayArgs = {
  price: Scalars['Float'];
  products?: InputMaybe<Array<Scalars['String']>>;
  restaurant: Scalars['String'];
};


export type MutationPostMessageArgs = {
  content: Scalars['String'];
  user: Scalars['String'];
};


export type MutationRemoveOrderArgs = {
  productId: Scalars['ID'];
};


export type MutationSendResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpWithGoogleArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCategoryArgs = {
  category?: InputMaybe<Scalars['String']>;
  categoryId: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateMenuItemsArgs = {
  category: Scalars['String'];
  input?: InputMaybe<MenuItemInput>;
  productId: Scalars['ID'];
  restaurant: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  newPass: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  id: Scalars['String'];
};

export type OrderHistory = {
  __typename?: 'OrderHistory';
  _id?: Maybe<Scalars['ID']>;
  costumer?: Maybe<Costumer>;
  createdAt?: Maybe<Scalars['Date']>;
  date?: Maybe<Scalars['Date']>;
  price?: Maybe<Scalars['Float']>;
  products?: Maybe<Array<Maybe<MenuItem>>>;
  restaurant?: Maybe<Scalars['String']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  _id?: Maybe<Scalars['ID']>;
  costumer?: Maybe<Costumer>;
  id?: Maybe<Scalars['ID']>;
  orderQuantity?: Maybe<Scalars['Int']>;
  product?: Maybe<MenuItem>;
  restaurant?: Maybe<Scalars['String']>;
};

export type PayedItem = {
  __typename?: 'PayedItem';
  _id?: Maybe<Scalars['ID']>;
  costumer?: Maybe<Costumer>;
  createdAt?: Maybe<Scalars['Date']>;
  date?: Maybe<Scalars['Date']>;
  orderQuantity?: Maybe<Scalars['Int']>;
  product?: Maybe<MenuItem>;
  restaurant?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Address?: Maybe<CostumerAddress>;
  AdminOrders: Array<Maybe<AdminOrder>>;
  Costumer?: Maybe<Costumer>;
  CostumerOrders: Array<Maybe<OrderItem>>;
  CurrentUser?: Maybe<User>;
  Menu?: Maybe<Array<Maybe<MenuParent>>>;
  MenuByCategory?: Maybe<Array<Maybe<MenuParent>>>;
  MenuBySubCategory?: Maybe<Array<Maybe<MenuParent>>>;
  MenuItemByCategory?: Maybe<Array<Maybe<CostumerMenuChoises>>>;
  MenuItemCount?: Maybe<OrderItem>;
  OrderItems?: Maybe<OrderItem>;
  Orders: Array<Maybe<OrderItem>>;
  PayedOrders: Array<Maybe<OrderHistory>>;
  Restaurants?: Maybe<Array<Maybe<Restaurant>>>;
  messages?: Maybe<Array<Message>>;
};


export type QueryCostumerOrdersArgs = {
  restaurant: Scalars['String'];
};


export type QueryMenuArgs = {
  restaurant: Scalars['String'];
};


export type QueryMenuByCategoryArgs = {
  restaurant: Scalars['String'];
};


export type QueryMenuBySubCategoryArgs = {
  restaurant: Scalars['String'];
  subCategory?: InputMaybe<Scalars['String']>;
};


export type QueryMenuItemByCategoryArgs = {
  category: Scalars['String'];
  restaurant: Scalars['String'];
};


export type QueryMenuItemCountArgs = {
  category: Scalars['String'];
  restaurant: Scalars['String'];
};


export type QueryOrdersArgs = {
  restaurant: Scalars['String'];
};


export type QueryPayedOrdersArgs = {
  restaurant: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id?: Maybe<Scalars['ID']>;
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  foodTypes?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']>;
  numReviews?: Maybe<Scalars['Int']>;
  openTimes?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  reviews?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
};

export type SaveCookie = CookieError | CookieSuccess;

export type SellInfo = {
  __typename?: 'SellInfo';
  _id?: Maybe<Scalars['ID']>;
  costumer?: Maybe<Costumer>;
  date?: Maybe<Scalars['Date']>;
  items?: Maybe<Array<Maybe<MenuItem>>>;
  restaurant?: Maybe<Restaurant>;
  sum?: Maybe<Scalars['Float']>;
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
  restaurant: Restaurant;
  token: Scalars['String'];
};

export type MyArray = {
  __typename?: 'myArray';
  name: Scalars['String'];
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', SignIn: { __typename?: 'Token', token: string } };

export type SignInWithGoogleMutationVariables = Exact<{ [key: string]: never; }>;


export type SignInWithGoogleMutation = { __typename?: 'Mutation', SignInWithGoogle?: string | null };

export type SignUpWithGoogleMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type SignUpWithGoogleMutation = { __typename?: 'Mutation', SignUpWithGoogle: { __typename?: 'User', email: string } };

export type AddCostumerMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  table: Scalars['Int'];
}>;


export type AddCostumerMutation = { __typename?: 'Mutation', AddCostumer?: { __typename?: 'Costumer', name?: string | null, table?: number | null, email?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser: { __typename?: 'User', email: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', SignOut?: string | null };

export type SignOutCostumerMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutCostumerMutation = { __typename?: 'Mutation', SignOutCostumer?: string | null };

export type AddOrderMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type AddOrderMutation = { __typename?: 'Mutation', AddOrder: Array<{ __typename?: 'AdminOrder', orderQuantity?: number | null } | null> };

export type RemoveOrderMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type RemoveOrderMutation = { __typename?: 'Mutation', RemoveOrder: Array<{ __typename?: 'AdminOrder', orderQuantity?: number | null } | null> };

export type DeleteCostumerMutationVariables = Exact<{
  costumerId?: InputMaybe<Scalars['String']>;
}>;


export type DeleteCostumerMutation = { __typename?: 'Mutation', DeleteCostumer?: { __typename?: 'Costumer', name?: string | null } | null };

export type PostMessageMutationVariables = Exact<{
  user: Scalars['String'];
  content: Scalars['String'];
}>;


export type PostMessageMutation = { __typename?: 'Mutation', PostMessage: string };

export type GetCostumerOrdersMutationVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type GetCostumerOrdersMutation = { __typename?: 'Mutation', GetCostumerOrders: Array<{ __typename?: 'OrderItem', orderQuantity?: number | null, _id?: string | null, product?: { __typename?: 'MenuItem', name?: string | null, price?: number | null, description?: string | null, _id?: string | null } | null } | null> };

export type UpdateMenuItemsMutationVariables = Exact<{
  productId: Scalars['ID'];
  restaurant: Scalars['String'];
  category: Scalars['String'];
  input?: InputMaybe<MenuItemInput>;
}>;


export type UpdateMenuItemsMutation = { __typename?: 'Mutation', UpdateMenuItems: { __typename?: 'MenuItem', name?: string | null } };

export type AddMenuItemMutationVariables = Exact<{
  restaurant: Scalars['String'];
  category: Scalars['String'];
  input?: InputMaybe<MenuItemInput>;
}>;


export type AddMenuItemMutation = { __typename?: 'Mutation', AddMenuItem?: { __typename?: 'MenuItem', name?: string | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPass: Scalars['String'];
  userId: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', UpdatePassword: { __typename?: 'User', email: string } };

export type SendResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendResetPasswordMutation = { __typename?: 'Mutation', SendResetPassword: { __typename?: 'User', token: string } };

export type UpdateCategoryMutationVariables = Exact<{
  category: Scalars['String'];
  image: Scalars['String'];
  categoryId: Scalars['String'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', UpdateCategory: { __typename?: 'MenuParent', itemName?: string | null } };

export type PayMutationVariables = Exact<{
  restaurant: Scalars['String'];
  products?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  price: Scalars['Float'];
}>;


export type PayMutation = { __typename?: 'Mutation', Pay: { __typename?: 'SellInfo', _id?: string | null } };

export type AddCostumerAddressMutationVariables = Exact<{
  address?: InputMaybe<CostumerAddressInput>;
}>;


export type AddCostumerAddressMutation = { __typename?: 'Mutation', AddCostumerAddress?: { __typename?: 'CostumerAddress', title?: string | null, city?: string | null, region?: string | null, postNumber?: number | null, address?: string | null } | null };

export type AddMenuCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  image: Scalars['String'];
  restaurant: Scalars['String'];
  parent: Scalars['String'];
}>;


export type AddMenuCategoryMutation = { __typename?: 'Mutation', AddMenuCategory?: { __typename?: 'MenuParent', itemName?: string | null, parent?: string | null } | null };

export type DeleteMenuCategoryMutationVariables = Exact<{
  categoryId: Scalars['String'];
  restaurant: Scalars['String'];
}>;


export type DeleteMenuCategoryMutation = { __typename?: 'Mutation', DeleteMenuCategory: string };

export type EditUserInfoItemMutationVariables = Exact<{
  name: Scalars['String'];
  value: Scalars['String'];
}>;


export type EditUserInfoItemMutation = { __typename?: 'Mutation', EditUserInfoItem?: { __typename?: 'User', name: string } | null };

export type EditRestaurantInfoItemMutationVariables = Exact<{
  restaurant: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['String'];
}>;


export type EditRestaurantInfoItemMutation = { __typename?: 'Mutation', EditRestaurantInfoItem?: { __typename?: 'Restaurant', name?: string | null } | null };

export type GetAnalisticsMutationVariables = Exact<{
  year?: InputMaybe<Scalars['Int']>;
}>;


export type GetAnalisticsMutation = { __typename?: 'Mutation', GetAnalistics?: Array<{ __typename?: 'Analistic', sum?: number | null, _id?: string | null } | null> | null };

export type GetRapportMutationVariables = Exact<{
  beginDate?: InputMaybe<Scalars['String']>;
  finishDate?: InputMaybe<Scalars['String']>;
}>;


export type GetRapportMutation = { __typename?: 'Mutation', GetRapport?: Array<{ __typename?: 'CategoryParent', categorizedByName?: Array<{ __typename?: 'Category', _id?: string | null, sum?: number | null } | null> | null, categorizedByTags?: Array<{ __typename?: 'Category', _id?: string | null, sum?: number | null } | null> | null, categorizedByDate?: Array<{ __typename?: 'Category', _id?: string | null, sum?: number | null } | null> | null } | null> | null };

export type GetBillInfoMutationVariables = Exact<{
  restaurant: Scalars['String'];
  recieptId: Scalars['String'];
}>;


export type GetBillInfoMutation = { __typename?: 'Mutation', GetBillInfo: { __typename?: 'OrderHistory', _id?: string | null, date?: any | null, price?: number | null, products?: Array<{ __typename?: 'MenuItem', name?: string | null, price?: number | null, _id?: string | null } | null> | null } };

export type RestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type RestaurantsQuery = { __typename?: 'Query', Restaurants?: Array<{ __typename?: 'Restaurant', name?: string | null, owner?: string | null, description?: string | null, numReviews?: number | null, reviews?: Array<string | null> | null, type?: string | null, images?: Array<string | null> | null, rating?: number | null, openTimes?: string | null, address?: string | null, foodTypes?: string | null, _id?: string | null, location?: { __typename?: 'Location', coordinates?: Array<number> | null } | null } | null> | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', CurrentUser?: { __typename?: 'User', name: string, email: string, _id: string, restaurant: { __typename?: 'Restaurant', name?: string | null, openTimes?: string | null, address?: string | null, foodTypes?: string | null } } | null };

export type CostumerQueryVariables = Exact<{ [key: string]: never; }>;


export type CostumerQuery = { __typename?: 'Query', Costumer?: { __typename?: 'Costumer', name?: string | null, email?: string | null, table?: number | null, _id?: string | null } | null };

export type MenuByCategoryQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type MenuByCategoryQuery = { __typename?: 'Query', MenuByCategory?: Array<{ __typename?: 'MenuParent', itemName?: string | null, collectionType?: string | null, _id?: string | null, image?: string | null, subCategory?: Array<string | null> | null, parent?: string | null } | null> | null };

export type MenuBySubCategoryQueryVariables = Exact<{
  restaurant: Scalars['String'];
  subCategory: Scalars['String'];
}>;


export type MenuBySubCategoryQuery = { __typename?: 'Query', MenuBySubCategory?: Array<{ __typename?: 'MenuParent', itemName?: string | null, collectionType?: string | null, image?: string | null, _id?: string | null, subCategory?: Array<string | null> | null, parent?: string | null } | null> | null };

export type MenuQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type MenuQuery = { __typename?: 'Query', Menu?: Array<{ __typename?: 'MenuParent', itemName?: string | null } | null> | null };

export type MenuItemByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
  restaurant: Scalars['String'];
}>;


export type MenuItemByCategoryQuery = { __typename?: 'Query', MenuItemByCategory?: Array<{ __typename: 'MenuItem', name?: string | null, orderQuantity?: number | null, description?: string | null, price?: number | null, quantity?: number | null, images?: Array<string | null> | null, _id?: string | null, category?: string | null, subCat?: Array<string | null> | null } | { __typename: 'OrderItem', orderQuantity?: number | null } | null> | null };

export type MenuItemCountQueryVariables = Exact<{
  category: Scalars['String'];
  restaurant: Scalars['String'];
}>;


export type MenuItemCountQuery = { __typename?: 'Query', MenuItemCount?: { __typename?: 'OrderItem', product?: { __typename?: 'MenuItem', name?: string | null } | null } | null };

export type OrderItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrderItemsQuery = { __typename?: 'Query', OrderItems?: { __typename?: 'OrderItem', _id?: string | null, product?: { __typename?: 'MenuItem', quantity?: number | null } | null } | null };

export type OrdersQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type OrdersQuery = { __typename?: 'Query', Orders: Array<{ __typename?: 'OrderItem', _id?: string | null, orderQuantity?: number | null, product?: { __typename?: 'MenuItem', name?: string | null, price?: number | null, description?: string | null, _id?: string | null } | null } | null> };

export type AdminOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminOrdersQuery = { __typename?: 'Query', AdminOrders: Array<{ __typename: 'AdminOrder', _id?: string | null, orderQuantity?: number | null, date?: any | null, product?: { __typename: 'MenuItem', name?: string | null, price?: number | null, description?: string | null, _id?: string | null } | null, costumer?: { __typename: 'Costumer', table?: number | null, _id?: string | null } | null } | null> };

export type CostumerOrdersQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type CostumerOrdersQuery = { __typename?: 'Query', CostumerOrders: Array<{ __typename?: 'OrderItem', orderQuantity?: number | null, _id?: string | null, product?: { __typename?: 'MenuItem', name?: string | null, price?: number | null, description?: string | null, _id?: string | null } | null } | null> };

export type AddressQueryVariables = Exact<{ [key: string]: never; }>;


export type AddressQuery = { __typename?: 'Query', Address?: { __typename?: 'CostumerAddress', title?: string | null, city?: string | null, region?: string | null, postNumber?: number | null, address?: string | null } | null };

export type PayedOrdersQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type PayedOrdersQuery = { __typename?: 'Query', PayedOrders: Array<{ __typename?: 'OrderHistory', _id?: string | null, date?: any | null, price?: number | null, products?: Array<{ __typename?: 'MenuItem', name?: string | null, itemsType?: string | null, price?: number | null } | null> | null } | null> };


export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  SignIn(email: $email, password: $password) {
    token
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignInWithGoogleDocument = gql`
    mutation SignInWithGoogle {
  SignInWithGoogle
}
    `;
export type SignInWithGoogleMutationFn = Apollo.MutationFunction<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>;

/**
 * __useSignInWithGoogleMutation__
 *
 * To run a mutation, you first call `useSignInWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithGoogleMutation, { data, loading, error }] = useSignInWithGoogleMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignInWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>(SignInWithGoogleDocument, options);
      }
export type SignInWithGoogleMutationHookResult = ReturnType<typeof useSignInWithGoogleMutation>;
export type SignInWithGoogleMutationResult = Apollo.MutationResult<SignInWithGoogleMutation>;
export type SignInWithGoogleMutationOptions = Apollo.BaseMutationOptions<SignInWithGoogleMutation, SignInWithGoogleMutationVariables>;
export const SignUpWithGoogleDocument = gql`
    mutation SignUpWithGoogle($username: String!) {
  SignUpWithGoogle(username: $username) {
    email
  }
}
    `;
export type SignUpWithGoogleMutationFn = Apollo.MutationFunction<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>;

/**
 * __useSignUpWithGoogleMutation__
 *
 * To run a mutation, you first call `useSignUpWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWithGoogleMutation, { data, loading, error }] = useSignUpWithGoogleMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSignUpWithGoogleMutation(baseOptions?: Apollo.MutationHookOptions<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>(SignUpWithGoogleDocument, options);
      }
export type SignUpWithGoogleMutationHookResult = ReturnType<typeof useSignUpWithGoogleMutation>;
export type SignUpWithGoogleMutationResult = Apollo.MutationResult<SignUpWithGoogleMutation>;
export type SignUpWithGoogleMutationOptions = Apollo.BaseMutationOptions<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>;
export const AddCostumerDocument = gql`
    mutation AddCostumer($name: String!, $email: String!, $table: Int!) {
  AddCostumer(name: $name, email: $email, table: $table) {
    name
    table
    email
  }
}
    `;
export type AddCostumerMutationFn = Apollo.MutationFunction<AddCostumerMutation, AddCostumerMutationVariables>;

/**
 * __useAddCostumerMutation__
 *
 * To run a mutation, you first call `useAddCostumerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCostumerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCostumerMutation, { data, loading, error }] = useAddCostumerMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      table: // value for 'table'
 *   },
 * });
 */
export function useAddCostumerMutation(baseOptions?: Apollo.MutationHookOptions<AddCostumerMutation, AddCostumerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCostumerMutation, AddCostumerMutationVariables>(AddCostumerDocument, options);
      }
export type AddCostumerMutationHookResult = ReturnType<typeof useAddCostumerMutation>;
export type AddCostumerMutationResult = Apollo.MutationResult<AddCostumerMutation>;
export type AddCostumerMutationOptions = Apollo.BaseMutationOptions<AddCostumerMutation, AddCostumerMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $username: String!) {
  CreateUser(email: $email, password: $password, username: $username) {
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  SignOut
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SignOutCostumerDocument = gql`
    mutation SignOutCostumer {
  SignOutCostumer
}
    `;
export type SignOutCostumerMutationFn = Apollo.MutationFunction<SignOutCostumerMutation, SignOutCostumerMutationVariables>;

/**
 * __useSignOutCostumerMutation__
 *
 * To run a mutation, you first call `useSignOutCostumerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutCostumerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutCostumerMutation, { data, loading, error }] = useSignOutCostumerMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutCostumerMutation(baseOptions?: Apollo.MutationHookOptions<SignOutCostumerMutation, SignOutCostumerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutCostumerMutation, SignOutCostumerMutationVariables>(SignOutCostumerDocument, options);
      }
export type SignOutCostumerMutationHookResult = ReturnType<typeof useSignOutCostumerMutation>;
export type SignOutCostumerMutationResult = Apollo.MutationResult<SignOutCostumerMutation>;
export type SignOutCostumerMutationOptions = Apollo.BaseMutationOptions<SignOutCostumerMutation, SignOutCostumerMutationVariables>;
export const AddOrderDocument = gql`
    mutation AddOrder($productId: ID!) {
  AddOrder(productId: $productId) {
    orderQuantity
  }
}
    `;
export type AddOrderMutationFn = Apollo.MutationFunction<AddOrderMutation, AddOrderMutationVariables>;

/**
 * __useAddOrderMutation__
 *
 * To run a mutation, you first call `useAddOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrderMutation, { data, loading, error }] = useAddOrderMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddOrderMutation(baseOptions?: Apollo.MutationHookOptions<AddOrderMutation, AddOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrderMutation, AddOrderMutationVariables>(AddOrderDocument, options);
      }
export type AddOrderMutationHookResult = ReturnType<typeof useAddOrderMutation>;
export type AddOrderMutationResult = Apollo.MutationResult<AddOrderMutation>;
export type AddOrderMutationOptions = Apollo.BaseMutationOptions<AddOrderMutation, AddOrderMutationVariables>;
export const RemoveOrderDocument = gql`
    mutation RemoveOrder($productId: ID!) {
  RemoveOrder(productId: $productId) {
    orderQuantity
  }
}
    `;
export type RemoveOrderMutationFn = Apollo.MutationFunction<RemoveOrderMutation, RemoveOrderMutationVariables>;

/**
 * __useRemoveOrderMutation__
 *
 * To run a mutation, you first call `useRemoveOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrderMutation, { data, loading, error }] = useRemoveOrderMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveOrderMutation(baseOptions?: Apollo.MutationHookOptions<RemoveOrderMutation, RemoveOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveOrderMutation, RemoveOrderMutationVariables>(RemoveOrderDocument, options);
      }
export type RemoveOrderMutationHookResult = ReturnType<typeof useRemoveOrderMutation>;
export type RemoveOrderMutationResult = Apollo.MutationResult<RemoveOrderMutation>;
export type RemoveOrderMutationOptions = Apollo.BaseMutationOptions<RemoveOrderMutation, RemoveOrderMutationVariables>;
export const DeleteCostumerDocument = gql`
    mutation DeleteCostumer($costumerId: String) {
  DeleteCostumer(costumerId: $costumerId) {
    name
  }
}
    `;
export type DeleteCostumerMutationFn = Apollo.MutationFunction<DeleteCostumerMutation, DeleteCostumerMutationVariables>;

/**
 * __useDeleteCostumerMutation__
 *
 * To run a mutation, you first call `useDeleteCostumerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCostumerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCostumerMutation, { data, loading, error }] = useDeleteCostumerMutation({
 *   variables: {
 *      costumerId: // value for 'costumerId'
 *   },
 * });
 */
export function useDeleteCostumerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCostumerMutation, DeleteCostumerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCostumerMutation, DeleteCostumerMutationVariables>(DeleteCostumerDocument, options);
      }
export type DeleteCostumerMutationHookResult = ReturnType<typeof useDeleteCostumerMutation>;
export type DeleteCostumerMutationResult = Apollo.MutationResult<DeleteCostumerMutation>;
export type DeleteCostumerMutationOptions = Apollo.BaseMutationOptions<DeleteCostumerMutation, DeleteCostumerMutationVariables>;
export const PostMessageDocument = gql`
    mutation PostMessage($user: String!, $content: String!) {
  PostMessage(user: $user, content: $content)
}
    `;
export type PostMessageMutationFn = Apollo.MutationFunction<PostMessageMutation, PostMessageMutationVariables>;

/**
 * __usePostMessageMutation__
 *
 * To run a mutation, you first call `usePostMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMessageMutation, { data, loading, error }] = usePostMessageMutation({
 *   variables: {
 *      user: // value for 'user'
 *      content: // value for 'content'
 *   },
 * });
 */
export function usePostMessageMutation(baseOptions?: Apollo.MutationHookOptions<PostMessageMutation, PostMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument, options);
      }
export type PostMessageMutationHookResult = ReturnType<typeof usePostMessageMutation>;
export type PostMessageMutationResult = Apollo.MutationResult<PostMessageMutation>;
export type PostMessageMutationOptions = Apollo.BaseMutationOptions<PostMessageMutation, PostMessageMutationVariables>;
export const GetCostumerOrdersDocument = gql`
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
export type GetCostumerOrdersMutationFn = Apollo.MutationFunction<GetCostumerOrdersMutation, GetCostumerOrdersMutationVariables>;

/**
 * __useGetCostumerOrdersMutation__
 *
 * To run a mutation, you first call `useGetCostumerOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetCostumerOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getCostumerOrdersMutation, { data, loading, error }] = useGetCostumerOrdersMutation({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useGetCostumerOrdersMutation(baseOptions?: Apollo.MutationHookOptions<GetCostumerOrdersMutation, GetCostumerOrdersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetCostumerOrdersMutation, GetCostumerOrdersMutationVariables>(GetCostumerOrdersDocument, options);
      }
export type GetCostumerOrdersMutationHookResult = ReturnType<typeof useGetCostumerOrdersMutation>;
export type GetCostumerOrdersMutationResult = Apollo.MutationResult<GetCostumerOrdersMutation>;
export type GetCostumerOrdersMutationOptions = Apollo.BaseMutationOptions<GetCostumerOrdersMutation, GetCostumerOrdersMutationVariables>;
export const UpdateMenuItemsDocument = gql`
    mutation UpdateMenuItems($productId: ID!, $restaurant: String!, $category: String!, $input: MenuItemInput) {
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
export type UpdateMenuItemsMutationFn = Apollo.MutationFunction<UpdateMenuItemsMutation, UpdateMenuItemsMutationVariables>;

/**
 * __useUpdateMenuItemsMutation__
 *
 * To run a mutation, you first call `useUpdateMenuItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMenuItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMenuItemsMutation, { data, loading, error }] = useUpdateMenuItemsMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      restaurant: // value for 'restaurant'
 *      category: // value for 'category'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMenuItemsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMenuItemsMutation, UpdateMenuItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMenuItemsMutation, UpdateMenuItemsMutationVariables>(UpdateMenuItemsDocument, options);
      }
export type UpdateMenuItemsMutationHookResult = ReturnType<typeof useUpdateMenuItemsMutation>;
export type UpdateMenuItemsMutationResult = Apollo.MutationResult<UpdateMenuItemsMutation>;
export type UpdateMenuItemsMutationOptions = Apollo.BaseMutationOptions<UpdateMenuItemsMutation, UpdateMenuItemsMutationVariables>;
export const AddMenuItemDocument = gql`
    mutation AddMenuItem($restaurant: String!, $category: String!, $input: MenuItemInput) {
  AddMenuItem(restaurant: $restaurant, category: $category, input: $input) {
    name
  }
}
    `;
export type AddMenuItemMutationFn = Apollo.MutationFunction<AddMenuItemMutation, AddMenuItemMutationVariables>;

/**
 * __useAddMenuItemMutation__
 *
 * To run a mutation, you first call `useAddMenuItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMenuItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMenuItemMutation, { data, loading, error }] = useAddMenuItemMutation({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *      category: // value for 'category'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMenuItemMutation(baseOptions?: Apollo.MutationHookOptions<AddMenuItemMutation, AddMenuItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMenuItemMutation, AddMenuItemMutationVariables>(AddMenuItemDocument, options);
      }
export type AddMenuItemMutationHookResult = ReturnType<typeof useAddMenuItemMutation>;
export type AddMenuItemMutationResult = Apollo.MutationResult<AddMenuItemMutation>;
export type AddMenuItemMutationOptions = Apollo.BaseMutationOptions<AddMenuItemMutation, AddMenuItemMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($token: String!, $newPass: String!, $userId: String!) {
  UpdatePassword(token: $token, newPass: $newPass, userId: $userId) {
    email
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPass: // value for 'newPass'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const SendResetPasswordDocument = gql`
    mutation SendResetPassword($email: String!) {
  SendResetPassword(email: $email) {
    token
  }
}
    `;
export type SendResetPasswordMutationFn = Apollo.MutationFunction<SendResetPasswordMutation, SendResetPasswordMutationVariables>;

/**
 * __useSendResetPasswordMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordMutation, { data, loading, error }] = useSendResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendResetPasswordMutation, SendResetPasswordMutationVariables>(SendResetPasswordDocument, options);
      }
export type SendResetPasswordMutationHookResult = ReturnType<typeof useSendResetPasswordMutation>;
export type SendResetPasswordMutationResult = Apollo.MutationResult<SendResetPasswordMutation>;
export type SendResetPasswordMutationOptions = Apollo.BaseMutationOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($category: String!, $image: String!, $categoryId: String!) {
  UpdateCategory(category: $category, image: $image, categoryId: $categoryId) {
    itemName
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *      image: // value for 'image'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const PayDocument = gql`
    mutation Pay($restaurant: String!, $products: [String!], $price: Float!) {
  Pay(restaurant: $restaurant, products: $products, price: $price) {
    _id
  }
}
    `;
export type PayMutationFn = Apollo.MutationFunction<PayMutation, PayMutationVariables>;

/**
 * __usePayMutation__
 *
 * To run a mutation, you first call `usePayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payMutation, { data, loading, error }] = usePayMutation({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *      products: // value for 'products'
 *      price: // value for 'price'
 *   },
 * });
 */
export function usePayMutation(baseOptions?: Apollo.MutationHookOptions<PayMutation, PayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PayMutation, PayMutationVariables>(PayDocument, options);
      }
export type PayMutationHookResult = ReturnType<typeof usePayMutation>;
export type PayMutationResult = Apollo.MutationResult<PayMutation>;
export type PayMutationOptions = Apollo.BaseMutationOptions<PayMutation, PayMutationVariables>;
export const AddCostumerAddressDocument = gql`
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
export type AddCostumerAddressMutationFn = Apollo.MutationFunction<AddCostumerAddressMutation, AddCostumerAddressMutationVariables>;

/**
 * __useAddCostumerAddressMutation__
 *
 * To run a mutation, you first call `useAddCostumerAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCostumerAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCostumerAddressMutation, { data, loading, error }] = useAddCostumerAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useAddCostumerAddressMutation(baseOptions?: Apollo.MutationHookOptions<AddCostumerAddressMutation, AddCostumerAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCostumerAddressMutation, AddCostumerAddressMutationVariables>(AddCostumerAddressDocument, options);
      }
export type AddCostumerAddressMutationHookResult = ReturnType<typeof useAddCostumerAddressMutation>;
export type AddCostumerAddressMutationResult = Apollo.MutationResult<AddCostumerAddressMutation>;
export type AddCostumerAddressMutationOptions = Apollo.BaseMutationOptions<AddCostumerAddressMutation, AddCostumerAddressMutationVariables>;
export const AddMenuCategoryDocument = gql`
    mutation AddMenuCategory($name: String!, $image: String!, $restaurant: String!, $parent: String!) {
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
export type AddMenuCategoryMutationFn = Apollo.MutationFunction<AddMenuCategoryMutation, AddMenuCategoryMutationVariables>;

/**
 * __useAddMenuCategoryMutation__
 *
 * To run a mutation, you first call `useAddMenuCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMenuCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMenuCategoryMutation, { data, loading, error }] = useAddMenuCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      restaurant: // value for 'restaurant'
 *      parent: // value for 'parent'
 *   },
 * });
 */
export function useAddMenuCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddMenuCategoryMutation, AddMenuCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMenuCategoryMutation, AddMenuCategoryMutationVariables>(AddMenuCategoryDocument, options);
      }
export type AddMenuCategoryMutationHookResult = ReturnType<typeof useAddMenuCategoryMutation>;
export type AddMenuCategoryMutationResult = Apollo.MutationResult<AddMenuCategoryMutation>;
export type AddMenuCategoryMutationOptions = Apollo.BaseMutationOptions<AddMenuCategoryMutation, AddMenuCategoryMutationVariables>;
export const DeleteMenuCategoryDocument = gql`
    mutation DeleteMenuCategory($categoryId: String!, $restaurant: String!) {
  DeleteMenuCategory(categoryId: $categoryId, restaurant: $restaurant)
}
    `;
export type DeleteMenuCategoryMutationFn = Apollo.MutationFunction<DeleteMenuCategoryMutation, DeleteMenuCategoryMutationVariables>;

/**
 * __useDeleteMenuCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteMenuCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMenuCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMenuCategoryMutation, { data, loading, error }] = useDeleteMenuCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useDeleteMenuCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMenuCategoryMutation, DeleteMenuCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMenuCategoryMutation, DeleteMenuCategoryMutationVariables>(DeleteMenuCategoryDocument, options);
      }
export type DeleteMenuCategoryMutationHookResult = ReturnType<typeof useDeleteMenuCategoryMutation>;
export type DeleteMenuCategoryMutationResult = Apollo.MutationResult<DeleteMenuCategoryMutation>;
export type DeleteMenuCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteMenuCategoryMutation, DeleteMenuCategoryMutationVariables>;
export const EditUserInfoItemDocument = gql`
    mutation EditUserInfoItem($name: String!, $value: String!) {
  EditUserInfoItem(name: $name, value: $value) {
    name
  }
}
    `;
export type EditUserInfoItemMutationFn = Apollo.MutationFunction<EditUserInfoItemMutation, EditUserInfoItemMutationVariables>;

/**
 * __useEditUserInfoItemMutation__
 *
 * To run a mutation, you first call `useEditUserInfoItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserInfoItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserInfoItemMutation, { data, loading, error }] = useEditUserInfoItemMutation({
 *   variables: {
 *      name: // value for 'name'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useEditUserInfoItemMutation(baseOptions?: Apollo.MutationHookOptions<EditUserInfoItemMutation, EditUserInfoItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserInfoItemMutation, EditUserInfoItemMutationVariables>(EditUserInfoItemDocument, options);
      }
export type EditUserInfoItemMutationHookResult = ReturnType<typeof useEditUserInfoItemMutation>;
export type EditUserInfoItemMutationResult = Apollo.MutationResult<EditUserInfoItemMutation>;
export type EditUserInfoItemMutationOptions = Apollo.BaseMutationOptions<EditUserInfoItemMutation, EditUserInfoItemMutationVariables>;
export const EditRestaurantInfoItemDocument = gql`
    mutation EditRestaurantInfoItem($restaurant: String!, $name: String!, $value: String!) {
  EditRestaurantInfoItem(restaurant: $restaurant, name: $name, value: $value) {
    name
  }
}
    `;
export type EditRestaurantInfoItemMutationFn = Apollo.MutationFunction<EditRestaurantInfoItemMutation, EditRestaurantInfoItemMutationVariables>;

/**
 * __useEditRestaurantInfoItemMutation__
 *
 * To run a mutation, you first call `useEditRestaurantInfoItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRestaurantInfoItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRestaurantInfoItemMutation, { data, loading, error }] = useEditRestaurantInfoItemMutation({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *      name: // value for 'name'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useEditRestaurantInfoItemMutation(baseOptions?: Apollo.MutationHookOptions<EditRestaurantInfoItemMutation, EditRestaurantInfoItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditRestaurantInfoItemMutation, EditRestaurantInfoItemMutationVariables>(EditRestaurantInfoItemDocument, options);
      }
export type EditRestaurantInfoItemMutationHookResult = ReturnType<typeof useEditRestaurantInfoItemMutation>;
export type EditRestaurantInfoItemMutationResult = Apollo.MutationResult<EditRestaurantInfoItemMutation>;
export type EditRestaurantInfoItemMutationOptions = Apollo.BaseMutationOptions<EditRestaurantInfoItemMutation, EditRestaurantInfoItemMutationVariables>;
export const GetAnalisticsDocument = gql`
    mutation GetAnalistics($year: Int) {
  GetAnalistics(year: $year) {
    sum
    _id
  }
}
    `;
export type GetAnalisticsMutationFn = Apollo.MutationFunction<GetAnalisticsMutation, GetAnalisticsMutationVariables>;

/**
 * __useGetAnalisticsMutation__
 *
 * To run a mutation, you first call `useGetAnalisticsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAnalisticsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAnalisticsMutation, { data, loading, error }] = useGetAnalisticsMutation({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetAnalisticsMutation(baseOptions?: Apollo.MutationHookOptions<GetAnalisticsMutation, GetAnalisticsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetAnalisticsMutation, GetAnalisticsMutationVariables>(GetAnalisticsDocument, options);
      }
export type GetAnalisticsMutationHookResult = ReturnType<typeof useGetAnalisticsMutation>;
export type GetAnalisticsMutationResult = Apollo.MutationResult<GetAnalisticsMutation>;
export type GetAnalisticsMutationOptions = Apollo.BaseMutationOptions<GetAnalisticsMutation, GetAnalisticsMutationVariables>;
export const GetRapportDocument = gql`
    mutation GetRapport($beginDate: String, $finishDate: String) {
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
export type GetRapportMutationFn = Apollo.MutationFunction<GetRapportMutation, GetRapportMutationVariables>;

/**
 * __useGetRapportMutation__
 *
 * To run a mutation, you first call `useGetRapportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetRapportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getRapportMutation, { data, loading, error }] = useGetRapportMutation({
 *   variables: {
 *      beginDate: // value for 'beginDate'
 *      finishDate: // value for 'finishDate'
 *   },
 * });
 */
export function useGetRapportMutation(baseOptions?: Apollo.MutationHookOptions<GetRapportMutation, GetRapportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetRapportMutation, GetRapportMutationVariables>(GetRapportDocument, options);
      }
export type GetRapportMutationHookResult = ReturnType<typeof useGetRapportMutation>;
export type GetRapportMutationResult = Apollo.MutationResult<GetRapportMutation>;
export type GetRapportMutationOptions = Apollo.BaseMutationOptions<GetRapportMutation, GetRapportMutationVariables>;
export const GetBillInfoDocument = gql`
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
export type GetBillInfoMutationFn = Apollo.MutationFunction<GetBillInfoMutation, GetBillInfoMutationVariables>;

/**
 * __useGetBillInfoMutation__
 *
 * To run a mutation, you first call `useGetBillInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetBillInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getBillInfoMutation, { data, loading, error }] = useGetBillInfoMutation({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *      recieptId: // value for 'recieptId'
 *   },
 * });
 */
export function useGetBillInfoMutation(baseOptions?: Apollo.MutationHookOptions<GetBillInfoMutation, GetBillInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetBillInfoMutation, GetBillInfoMutationVariables>(GetBillInfoDocument, options);
      }
export type GetBillInfoMutationHookResult = ReturnType<typeof useGetBillInfoMutation>;
export type GetBillInfoMutationResult = Apollo.MutationResult<GetBillInfoMutation>;
export type GetBillInfoMutationOptions = Apollo.BaseMutationOptions<GetBillInfoMutation, GetBillInfoMutationVariables>;
export const RestaurantsDocument = gql`
    query Restaurants {
  Restaurants {
    name
    owner
    description
    location {
      coordinates
    }
    numReviews
    reviews
    type
    images
    rating
    openTimes
    address
    foodTypes
    _id
  }
}
    `;

/**
 * __useRestaurantsQuery__
 *
 * To run a query within a React component, call `useRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
      }
export function useRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
        }
export type RestaurantsQueryHookResult = ReturnType<typeof useRestaurantsQuery>;
export type RestaurantsLazyQueryHookResult = ReturnType<typeof useRestaurantsLazyQuery>;
export type RestaurantsQueryResult = Apollo.QueryResult<RestaurantsQuery, RestaurantsQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  CurrentUser {
    name
    email
    _id
    restaurant {
      name
      openTimes
      address
      foodTypes
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const CostumerDocument = gql`
    query Costumer {
  Costumer {
    name
    email
    table
    _id
  }
}
    `;

/**
 * __useCostumerQuery__
 *
 * To run a query within a React component, call `useCostumerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCostumerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCostumerQuery({
 *   variables: {
 *   },
 * });
 */
export function useCostumerQuery(baseOptions?: Apollo.QueryHookOptions<CostumerQuery, CostumerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CostumerQuery, CostumerQueryVariables>(CostumerDocument, options);
      }
export function useCostumerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CostumerQuery, CostumerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CostumerQuery, CostumerQueryVariables>(CostumerDocument, options);
        }
export type CostumerQueryHookResult = ReturnType<typeof useCostumerQuery>;
export type CostumerLazyQueryHookResult = ReturnType<typeof useCostumerLazyQuery>;
export type CostumerQueryResult = Apollo.QueryResult<CostumerQuery, CostumerQueryVariables>;
export const MenuByCategoryDocument = gql`
    query MenuByCategory($restaurant: String!) {
  MenuByCategory(restaurant: $restaurant) {
    itemName
    collectionType
    _id
    image
    subCategory
    parent
  }
}
    `;

/**
 * __useMenuByCategoryQuery__
 *
 * To run a query within a React component, call `useMenuByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuByCategoryQuery({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useMenuByCategoryQuery(baseOptions: Apollo.QueryHookOptions<MenuByCategoryQuery, MenuByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MenuByCategoryQuery, MenuByCategoryQueryVariables>(MenuByCategoryDocument, options);
      }
export function useMenuByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MenuByCategoryQuery, MenuByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MenuByCategoryQuery, MenuByCategoryQueryVariables>(MenuByCategoryDocument, options);
        }
export type MenuByCategoryQueryHookResult = ReturnType<typeof useMenuByCategoryQuery>;
export type MenuByCategoryLazyQueryHookResult = ReturnType<typeof useMenuByCategoryLazyQuery>;
export type MenuByCategoryQueryResult = Apollo.QueryResult<MenuByCategoryQuery, MenuByCategoryQueryVariables>;
export const MenuBySubCategoryDocument = gql`
    query MenuBySubCategory($restaurant: String!, $subCategory: String!) {
  MenuBySubCategory(restaurant: $restaurant, subCategory: $subCategory) {
    itemName
    collectionType
    image
    _id
    subCategory
    parent
  }
}
    `;

/**
 * __useMenuBySubCategoryQuery__
 *
 * To run a query within a React component, call `useMenuBySubCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuBySubCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuBySubCategoryQuery({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *      subCategory: // value for 'subCategory'
 *   },
 * });
 */
export function useMenuBySubCategoryQuery(baseOptions: Apollo.QueryHookOptions<MenuBySubCategoryQuery, MenuBySubCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MenuBySubCategoryQuery, MenuBySubCategoryQueryVariables>(MenuBySubCategoryDocument, options);
      }
export function useMenuBySubCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MenuBySubCategoryQuery, MenuBySubCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MenuBySubCategoryQuery, MenuBySubCategoryQueryVariables>(MenuBySubCategoryDocument, options);
        }
export type MenuBySubCategoryQueryHookResult = ReturnType<typeof useMenuBySubCategoryQuery>;
export type MenuBySubCategoryLazyQueryHookResult = ReturnType<typeof useMenuBySubCategoryLazyQuery>;
export type MenuBySubCategoryQueryResult = Apollo.QueryResult<MenuBySubCategoryQuery, MenuBySubCategoryQueryVariables>;
export const MenuDocument = gql`
    query Menu($restaurant: String!) {
  Menu(restaurant: $restaurant) {
    itemName
  }
}
    `;

/**
 * __useMenuQuery__
 *
 * To run a query within a React component, call `useMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuQuery({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useMenuQuery(baseOptions: Apollo.QueryHookOptions<MenuQuery, MenuQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MenuQuery, MenuQueryVariables>(MenuDocument, options);
      }
export function useMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MenuQuery, MenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MenuQuery, MenuQueryVariables>(MenuDocument, options);
        }
export type MenuQueryHookResult = ReturnType<typeof useMenuQuery>;
export type MenuLazyQueryHookResult = ReturnType<typeof useMenuLazyQuery>;
export type MenuQueryResult = Apollo.QueryResult<MenuQuery, MenuQueryVariables>;
export const MenuItemByCategoryDocument = gql`
    query MenuItemByCategory($category: String!, $restaurant: String!) {
  MenuItemByCategory(category: $category, restaurant: $restaurant) {
    __typename
    ... on MenuItem {
      name
      orderQuantity
      description
      price
      quantity
      images
      _id
      category
      subCat
    }
    __typename
    ... on OrderItem {
      orderQuantity
    }
  }
}
    `;

/**
 * __useMenuItemByCategoryQuery__
 *
 * To run a query within a React component, call `useMenuItemByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuItemByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuItemByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useMenuItemByCategoryQuery(baseOptions: Apollo.QueryHookOptions<MenuItemByCategoryQuery, MenuItemByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MenuItemByCategoryQuery, MenuItemByCategoryQueryVariables>(MenuItemByCategoryDocument, options);
      }
export function useMenuItemByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MenuItemByCategoryQuery, MenuItemByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MenuItemByCategoryQuery, MenuItemByCategoryQueryVariables>(MenuItemByCategoryDocument, options);
        }
export type MenuItemByCategoryQueryHookResult = ReturnType<typeof useMenuItemByCategoryQuery>;
export type MenuItemByCategoryLazyQueryHookResult = ReturnType<typeof useMenuItemByCategoryLazyQuery>;
export type MenuItemByCategoryQueryResult = Apollo.QueryResult<MenuItemByCategoryQuery, MenuItemByCategoryQueryVariables>;
export const MenuItemCountDocument = gql`
    query MenuItemCount($category: String!, $restaurant: String!) {
  MenuItemCount(category: $category, restaurant: $restaurant) {
    product {
      name
    }
  }
}
    `;

/**
 * __useMenuItemCountQuery__
 *
 * To run a query within a React component, call `useMenuItemCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuItemCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuItemCountQuery({
 *   variables: {
 *      category: // value for 'category'
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useMenuItemCountQuery(baseOptions: Apollo.QueryHookOptions<MenuItemCountQuery, MenuItemCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MenuItemCountQuery, MenuItemCountQueryVariables>(MenuItemCountDocument, options);
      }
export function useMenuItemCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MenuItemCountQuery, MenuItemCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MenuItemCountQuery, MenuItemCountQueryVariables>(MenuItemCountDocument, options);
        }
export type MenuItemCountQueryHookResult = ReturnType<typeof useMenuItemCountQuery>;
export type MenuItemCountLazyQueryHookResult = ReturnType<typeof useMenuItemCountLazyQuery>;
export type MenuItemCountQueryResult = Apollo.QueryResult<MenuItemCountQuery, MenuItemCountQueryVariables>;
export const OrderItemsDocument = gql`
    query OrderItems {
  OrderItems {
    _id
    product {
      quantity
    }
  }
}
    `;

/**
 * __useOrderItemsQuery__
 *
 * To run a query within a React component, call `useOrderItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderItemsQuery(baseOptions?: Apollo.QueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
      }
export function useOrderItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
        }
export type OrderItemsQueryHookResult = ReturnType<typeof useOrderItemsQuery>;
export type OrderItemsLazyQueryHookResult = ReturnType<typeof useOrderItemsLazyQuery>;
export type OrderItemsQueryResult = Apollo.QueryResult<OrderItemsQuery, OrderItemsQueryVariables>;
export const OrdersDocument = gql`
    query Orders($restaurant: String!) {
  Orders(restaurant: $restaurant) {
    _id
    orderQuantity
    product {
      name
      price
      description
      _id
    }
  }
}
    `;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useOrdersQuery(baseOptions: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const AdminOrdersDocument = gql`
    query AdminOrders {
  AdminOrders {
    __typename
    _id
    orderQuantity
    date
    product {
      __typename
      name
      price
      description
      _id
    }
    costumer {
      __typename
      table
      _id
    }
  }
}
    `;

/**
 * __useAdminOrdersQuery__
 *
 * To run a query within a React component, call `useAdminOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminOrdersQuery(baseOptions?: Apollo.QueryHookOptions<AdminOrdersQuery, AdminOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminOrdersQuery, AdminOrdersQueryVariables>(AdminOrdersDocument, options);
      }
export function useAdminOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminOrdersQuery, AdminOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminOrdersQuery, AdminOrdersQueryVariables>(AdminOrdersDocument, options);
        }
export type AdminOrdersQueryHookResult = ReturnType<typeof useAdminOrdersQuery>;
export type AdminOrdersLazyQueryHookResult = ReturnType<typeof useAdminOrdersLazyQuery>;
export type AdminOrdersQueryResult = Apollo.QueryResult<AdminOrdersQuery, AdminOrdersQueryVariables>;
export const CostumerOrdersDocument = gql`
    query CostumerOrders($restaurant: String!) {
  CostumerOrders(restaurant: $restaurant) {
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

/**
 * __useCostumerOrdersQuery__
 *
 * To run a query within a React component, call `useCostumerOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCostumerOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCostumerOrdersQuery({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function useCostumerOrdersQuery(baseOptions: Apollo.QueryHookOptions<CostumerOrdersQuery, CostumerOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CostumerOrdersQuery, CostumerOrdersQueryVariables>(CostumerOrdersDocument, options);
      }
export function useCostumerOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CostumerOrdersQuery, CostumerOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CostumerOrdersQuery, CostumerOrdersQueryVariables>(CostumerOrdersDocument, options);
        }
export type CostumerOrdersQueryHookResult = ReturnType<typeof useCostumerOrdersQuery>;
export type CostumerOrdersLazyQueryHookResult = ReturnType<typeof useCostumerOrdersLazyQuery>;
export type CostumerOrdersQueryResult = Apollo.QueryResult<CostumerOrdersQuery, CostumerOrdersQueryVariables>;
export const AddressDocument = gql`
    query Address {
  Address {
    title
    city
    region
    postNumber
    address
  }
}
    `;

/**
 * __useAddressQuery__
 *
 * To run a query within a React component, call `useAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function useAddressQuery(baseOptions?: Apollo.QueryHookOptions<AddressQuery, AddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressQuery, AddressQueryVariables>(AddressDocument, options);
      }
export function useAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressQuery, AddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressQuery, AddressQueryVariables>(AddressDocument, options);
        }
export type AddressQueryHookResult = ReturnType<typeof useAddressQuery>;
export type AddressLazyQueryHookResult = ReturnType<typeof useAddressLazyQuery>;
export type AddressQueryResult = Apollo.QueryResult<AddressQuery, AddressQueryVariables>;
export const PayedOrdersDocument = gql`
    query PayedOrders($restaurant: String!) {
  PayedOrders(restaurant: $restaurant) {
    _id
    date
    price
    products {
      name
      itemsType
      price
    }
  }
}
    `;

/**
 * __usePayedOrdersQuery__
 *
 * To run a query within a React component, call `usePayedOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayedOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayedOrdersQuery({
 *   variables: {
 *      restaurant: // value for 'restaurant'
 *   },
 * });
 */
export function usePayedOrdersQuery(baseOptions: Apollo.QueryHookOptions<PayedOrdersQuery, PayedOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayedOrdersQuery, PayedOrdersQueryVariables>(PayedOrdersDocument, options);
      }
export function usePayedOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayedOrdersQuery, PayedOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayedOrdersQuery, PayedOrdersQueryVariables>(PayedOrdersDocument, options);
        }
export type PayedOrdersQueryHookResult = ReturnType<typeof usePayedOrdersQuery>;
export type PayedOrdersLazyQueryHookResult = ReturnType<typeof usePayedOrdersLazyQuery>;
export type PayedOrdersQueryResult = Apollo.QueryResult<PayedOrdersQuery, PayedOrdersQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AdminOrder: ResolverTypeWrapper<AdminOrder>;
  Analistic: ResolverTypeWrapper<Analistic>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryParent: ResolverTypeWrapper<CategoryParent>;
  CookieError: ResolverTypeWrapper<CookieError>;
  CookieSuccess: ResolverTypeWrapper<CookieSuccess>;
  Costumer: ResolverTypeWrapper<Costumer>;
  CostumerAddress: ResolverTypeWrapper<CostumerAddress>;
  CostumerAddressInput: CostumerAddressInput;
  CostumerMenuChoises: ResolversTypes['MenuItem'] | ResolversTypes['OrderItem'];
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InfoItem: ResolversTypes['Restaurant'] | ResolversTypes['User'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  Menu: ResolverTypeWrapper<Menu>;
  MenuItem: ResolverTypeWrapper<MenuItem>;
  MenuItemInput: MenuItemInput;
  MenuParent: ResolverTypeWrapper<MenuParent>;
  MenuParentInput: MenuParentInput;
  MenuSubItem: ResolverTypeWrapper<MenuSubItem>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderHistory: ResolverTypeWrapper<OrderHistory>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  PayedItem: ResolverTypeWrapper<PayedItem>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  SaveCookie: ResolversTypes['CookieError'] | ResolversTypes['CookieSuccess'];
  SellInfo: ResolverTypeWrapper<SellInfo>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Token: ResolverTypeWrapper<Token>;
  UploadedFileResponse: ResolverTypeWrapper<UploadedFileResponse>;
  User: ResolverTypeWrapper<User>;
  myArray: ResolverTypeWrapper<MyArray>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AdminOrder: AdminOrder;
  Analistic: Analistic;
  Boolean: Scalars['Boolean'];
  Category: Category;
  CategoryParent: CategoryParent;
  CookieError: CookieError;
  CookieSuccess: CookieSuccess;
  Costumer: Costumer;
  CostumerAddress: CostumerAddress;
  CostumerAddressInput: CostumerAddressInput;
  CostumerMenuChoises: ResolversParentTypes['MenuItem'] | ResolversParentTypes['OrderItem'];
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  InfoItem: ResolversParentTypes['Restaurant'] | ResolversParentTypes['User'];
  Int: Scalars['Int'];
  Location: Location;
  LocationInput: LocationInput;
  Menu: Menu;
  MenuItem: MenuItem;
  MenuItemInput: MenuItemInput;
  MenuParent: MenuParent;
  MenuParentInput: MenuParentInput;
  MenuSubItem: MenuSubItem;
  Message: Message;
  Mutation: {};
  OrderHistory: OrderHistory;
  OrderItem: OrderItem;
  PayedItem: PayedItem;
  Query: {};
  RegisterInput: RegisterInput;
  Restaurant: Restaurant;
  SaveCookie: ResolversParentTypes['CookieError'] | ResolversParentTypes['CookieSuccess'];
  SellInfo: SellInfo;
  String: Scalars['String'];
  Token: Token;
  UploadedFileResponse: UploadedFileResponse;
  User: User;
  myArray: MyArray;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  first?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  secound?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminOrder'] = ResolversParentTypes['AdminOrder']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  costumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  orderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnalisticResolvers<ContextType = any, ParentType extends ResolversParentTypes['Analistic'] = ResolversParentTypes['Analistic']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryParentResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryParent'] = ResolversParentTypes['CategoryParent']> = {
  categorizedByDate?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  categorizedByName?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  categorizedByTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CookieErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CookieError'] = ResolversParentTypes['CookieError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CookieSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['CookieSuccess'] = ResolversParentTypes['CookieSuccess']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CostumerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Costumer'] = ResolversParentTypes['Costumer']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  table?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CostumerAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['CostumerAddress'] = ResolversParentTypes['CostumerAddress']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CostumerMenuChoisesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CostumerMenuChoises'] = ResolversParentTypes['CostumerMenuChoises']> = {
  __resolveType: TypeResolveFn<'MenuItem' | 'OrderItem', ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type InfoItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['InfoItem'] = ResolversParentTypes['InfoItem']> = {
  __resolveType: TypeResolveFn<'Restaurant' | 'User', ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  coordinates?: Resolver<Maybe<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuResolvers<ContextType = any, ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  category?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuParent']>>>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItem'] = ResolversParentTypes['MenuItem']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  availability?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  itemsType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subCat?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuParentResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuParent'] = ResolversParentTypes['MenuParent']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  collectionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  item?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>;
  itemName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  subCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuSubItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuSubItem'] = ResolversParentTypes['MenuSubItem']> = {
  _id?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  AddAddress?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddAddressArgs, 'address'>>;
  AddCostumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType, RequireFields<MutationAddCostumerArgs, 'email' | 'name' | 'table'>>;
  AddCostumerAddress?: Resolver<Maybe<ResolversTypes['CostumerAddress']>, ParentType, ContextType, Partial<MutationAddCostumerAddressArgs>>;
  AddMenu?: Resolver<Maybe<ResolversTypes['Menu']>, ParentType, ContextType, RequireFields<MutationAddMenuArgs, 'restaurant'>>;
  AddMenuCategory?: Resolver<Maybe<ResolversTypes['MenuParent']>, ParentType, ContextType, RequireFields<MutationAddMenuCategoryArgs, 'image' | 'name' | 'parent' | 'restaurant'>>;
  AddMenuItem?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType, RequireFields<MutationAddMenuItemArgs, 'category' | 'restaurant'>>;
  AddOrder?: Resolver<Array<Maybe<ResolversTypes['AdminOrder']>>, ParentType, ContextType, RequireFields<MutationAddOrderArgs, 'productId'>>;
  AddRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationAddRestaurantArgs, 'description' | 'id' | 'location' | 'name' | 'numReviews' | 'owner' | 'rating' | 'type'>>;
  AddSellInfo?: Resolver<ResolversTypes['SellInfo'], ParentType, ContextType, RequireFields<MutationAddSellInfoArgs, 'items' | 'price' | 'restaurant'>>;
  CostumerExpiry?: Resolver<Maybe<ResolversTypes['CookieSuccess']>, ParentType, ContextType>;
  CreateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>>;
  DeleteCostumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType, Partial<MutationDeleteCostumerArgs>>;
  DeleteMenuCategory?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteMenuCategoryArgs, 'categoryId' | 'restaurant'>>;
  EditRestaurantInfoItem?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType, RequireFields<MutationEditRestaurantInfoItemArgs, 'name' | 'value'>>;
  EditUserInfoItem?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationEditUserInfoItemArgs, 'name' | 'value'>>;
  EmitSocket?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  FetchRestaurantsByQuery?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType, Partial<MutationFetchRestaurantsByQueryArgs>>;
  GetAnalistics?: Resolver<Maybe<Array<Maybe<ResolversTypes['Analistic']>>>, ParentType, ContextType, Partial<MutationGetAnalisticsArgs>>;
  GetBillInfo?: Resolver<ResolversTypes['OrderHistory'], ParentType, ContextType, RequireFields<MutationGetBillInfoArgs, 'recieptId' | 'restaurant'>>;
  GetCostumerOrders?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, RequireFields<MutationGetCostumerOrdersArgs, 'restaurant'>>;
  GetOrderItem?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType, RequireFields<MutationGetOrderItemArgs, 'productId' | 'restaurant'>>;
  GetRapport?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryParent']>>>, ParentType, ContextType, Partial<MutationGetRapportArgs>>;
  Pay?: Resolver<ResolversTypes['SellInfo'], ParentType, ContextType, RequireFields<MutationPayArgs, 'price' | 'restaurant'>>;
  PostMessage?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationPostMessageArgs, 'content' | 'user'>>;
  RemoveOrder?: Resolver<Array<Maybe<ResolversTypes['AdminOrder']>>, ParentType, ContextType, RequireFields<MutationRemoveOrderArgs, 'productId'>>;
  SendResetPassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSendResetPasswordArgs, 'email'>>;
  SignIn?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  SignInWithGoogle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SignOut?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SignOutCostumer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SignUpWithGoogle?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationSignUpWithGoogleArgs>>;
  UpdateCategory?: Resolver<ResolversTypes['MenuParent'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'categoryId'>>;
  UpdateMenuItems?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MutationUpdateMenuItemsArgs, 'category' | 'productId' | 'restaurant'>>;
  UpdatePassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'newPass' | 'token' | 'userId'>>;
  UpdateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'email' | 'id'>>;
};

export type OrderHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderHistory'] = ResolversParentTypes['OrderHistory']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  costumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  costumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  orderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayedItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayedItem'] = ResolversParentTypes['PayedItem']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  costumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  orderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Address?: Resolver<Maybe<ResolversTypes['CostumerAddress']>, ParentType, ContextType>;
  AdminOrders?: Resolver<Array<Maybe<ResolversTypes['AdminOrder']>>, ParentType, ContextType>;
  Costumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType>;
  CostumerOrders?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, RequireFields<QueryCostumerOrdersArgs, 'restaurant'>>;
  CurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  Menu?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuParent']>>>, ParentType, ContextType, RequireFields<QueryMenuArgs, 'restaurant'>>;
  MenuByCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuParent']>>>, ParentType, ContextType, RequireFields<QueryMenuByCategoryArgs, 'restaurant'>>;
  MenuBySubCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuParent']>>>, ParentType, ContextType, RequireFields<QueryMenuBySubCategoryArgs, 'restaurant'>>;
  MenuItemByCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['CostumerMenuChoises']>>>, ParentType, ContextType, RequireFields<QueryMenuItemByCategoryArgs, 'category' | 'restaurant'>>;
  MenuItemCount?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType, RequireFields<QueryMenuItemCountArgs, 'category' | 'restaurant'>>;
  OrderItems?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  Orders?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, RequireFields<QueryOrdersArgs, 'restaurant'>>;
  PayedOrders?: Resolver<Array<Maybe<ResolversTypes['OrderHistory']>>, ParentType, ContextType, RequireFields<QueryPayedOrdersArgs, 'restaurant'>>;
  Restaurants?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  foodTypes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numReviews?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  openTimes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveCookieResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaveCookie'] = ResolversParentTypes['SaveCookie']> = {
  __resolveType: TypeResolveFn<'CookieError' | 'CookieSuccess', ParentType, ContextType>;
};

export type SellInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SellInfo'] = ResolversParentTypes['SellInfo']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  costumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadedFileResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadedFileResponse'] = ResolversParentTypes['UploadedFileResponse']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  restaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MyArrayResolvers<ContextType = any, ParentType extends ResolversParentTypes['myArray'] = ResolversParentTypes['myArray']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  AdminOrder?: AdminOrderResolvers<ContextType>;
  Analistic?: AnalisticResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryParent?: CategoryParentResolvers<ContextType>;
  CookieError?: CookieErrorResolvers<ContextType>;
  CookieSuccess?: CookieSuccessResolvers<ContextType>;
  Costumer?: CostumerResolvers<ContextType>;
  CostumerAddress?: CostumerAddressResolvers<ContextType>;
  CostumerMenuChoises?: CostumerMenuChoisesResolvers<ContextType>;
  Date?: GraphQLScalarType;
  InfoItem?: InfoItemResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Menu?: MenuResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  MenuParent?: MenuParentResolvers<ContextType>;
  MenuSubItem?: MenuSubItemResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OrderHistory?: OrderHistoryResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  PayedItem?: PayedItemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  SaveCookie?: SaveCookieResolvers<ContextType>;
  SellInfo?: SellInfoResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  UploadedFileResponse?: UploadedFileResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  myArray?: MyArrayResolvers<ContextType>;
};

