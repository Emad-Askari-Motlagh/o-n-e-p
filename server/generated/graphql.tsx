import { GraphQLResolveInfo } from 'graphql';
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
  id?: Maybe<Scalars['ID']>;
  orderQuantity?: Maybe<Scalars['Int']>;
  product?: Maybe<MenuItem>;
  restaurant?: Maybe<Scalars['String']>;
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

export type CostumerMenuChoises = MenuItem | OrderItem;

export type Location = {
  __typename?: 'Location';
  coordinates?: Maybe<Array<Scalars['Int']>>;
  mytype: Scalars['String'];
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
  itemsType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderQuantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  restaurant?: Maybe<Scalars['String']>;
};

export type MenuItemInput = {
  availability?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  itemsType?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type MenuParent = {
  __typename?: 'MenuParent';
  collectionType?: Maybe<Scalars['String']>;
  item?: Maybe<Array<Maybe<MenuItem>>>;
  itemName?: Maybe<Scalars['String']>;
  restaurant?: Maybe<Restaurant>;
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
  AddMenu?: Maybe<Menu>;
  AddMenuCategory?: Maybe<MenuParent>;
  AddMenuItem?: Maybe<MenuItem>;
  AddOrder: Array<Maybe<AdminOrder>>;
  AddRestaurant: Restaurant;
  CostumerExpiry?: Maybe<CookieSuccess>;
  CreateUser: User;
  DeleteCostumer?: Maybe<Costumer>;
  EmitSocket?: Maybe<OrderItem>;
  FetchRestaurantsByQuery?: Maybe<Array<Maybe<Restaurant>>>;
  GetCostumerOrders: Array<Maybe<OrderItem>>;
  GetOrderItem?: Maybe<OrderItem>;
  PostMessage: Scalars['ID'];
  RemoveOrder: Array<Maybe<AdminOrder>>;
  SignIn: Token;
  SignInWithGoogle: Token;
  SignOut?: Maybe<Scalars['String']>;
  SignOutCostumer?: Maybe<Scalars['String']>;
  UpdateMenuItems: MenuItem;
  UpdatePassword?: Maybe<User>;
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


export type MutationAddMenuArgs = {
  category?: InputMaybe<Array<MenuParentInput>>;
  restaurant: Scalars['String'];
};


export type MutationAddMenuCategoryArgs = {
  collectionType: Scalars['String'];
  itemName: Scalars['String'];
  restaurant: Scalars['String'];
};


export type MutationAddMenuItemArgs = {
  availability: Scalars['Boolean'];
  category: Scalars['String'];
  description: Scalars['String'];
  itemsType: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  quantity: Scalars['Int'];
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


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteCostumerArgs = {
  costumerId?: InputMaybe<Scalars['String']>;
};


export type MutationFetchRestaurantsByQueryArgs = {
  searchQuery?: InputMaybe<Scalars['String']>;
};


export type MutationGetCostumerOrdersArgs = {
  restaurant: Scalars['String'];
};


export type MutationGetOrderItemArgs = {
  productId: Scalars['ID'];
  restaurant: Scalars['String'];
};


export type MutationPostMessageArgs = {
  content: Scalars['String'];
  user: Scalars['String'];
};


export type MutationRemoveOrderArgs = {
  productId: Scalars['ID'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInWithGoogleArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateMenuItemsArgs = {
  category: Scalars['String'];
  input?: InputMaybe<MenuItemInput>;
  restaurant: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  id: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  AdminOrders: Array<Maybe<AdminOrder>>;
  Costumer?: Maybe<Costumer>;
  CostumerOrders: Array<Maybe<OrderItem>>;
  CurrentUser?: Maybe<User>;
  Menu?: Maybe<Array<Maybe<MenuParent>>>;
  MenuByCategory?: Maybe<Array<Maybe<MenuParent>>>;
  MenuItemByCategory?: Maybe<Array<Maybe<CostumerMenuChoises>>>;
  MenuItemCount?: Maybe<OrderItem>;
  OrderItems?: Maybe<OrderItem>;
  Orders: Array<Maybe<OrderItem>>;
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

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']>;
  numReviews?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  reviews?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
};

export type SaveCookie = CookieError | CookieSuccess;

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
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

export type SignInWithGoogleMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInWithGoogleMutation = { __typename?: 'Mutation', SignInWithGoogle: { __typename?: 'Token', token: string } };

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
  restaurant: Scalars['String'];
  category: Scalars['String'];
  input?: InputMaybe<MenuItemInput>;
}>;


export type UpdateMenuItemsMutation = { __typename?: 'Mutation', UpdateMenuItems: { __typename?: 'MenuItem', name?: string | null } };

export type UpdatePasswordMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', UpdatePassword?: { __typename?: 'User', email: string } | null };

export type RestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type RestaurantsQuery = { __typename?: 'Query', Restaurants?: Array<{ __typename?: 'Restaurant', name?: string | null, owner?: string | null, description?: string | null, numReviews?: number | null, reviews?: Array<string | null> | null, type?: string | null, images?: Array<string | null> | null, rating?: number | null, _id?: string | null } | null> | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', CurrentUser?: { __typename?: 'User', name: string, email: string, _id: string, restaurant: { __typename?: 'Restaurant', name?: string | null } } | null };

export type CostumerQueryVariables = Exact<{ [key: string]: never; }>;


export type CostumerQuery = { __typename?: 'Query', Costumer?: { __typename?: 'Costumer', name?: string | null, email?: string | null, table?: number | null, _id?: string | null } | null };

export type MenuByCategoryQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type MenuByCategoryQuery = { __typename?: 'Query', MenuByCategory?: Array<{ __typename?: 'MenuParent', itemName?: string | null, collectionType?: string | null } | null> | null };

export type MenuQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type MenuQuery = { __typename?: 'Query', Menu?: Array<{ __typename?: 'MenuParent', itemName?: string | null } | null> | null };

export type MenuItemByCategoryQueryVariables = Exact<{
  category: Scalars['String'];
  restaurant: Scalars['String'];
}>;


export type MenuItemByCategoryQuery = { __typename?: 'Query', MenuItemByCategory?: Array<{ __typename: 'MenuItem', name?: string | null, orderQuantity?: number | null, description?: string | null, price?: number | null, quantity?: number | null, _id?: string | null } | { __typename: 'OrderItem', orderQuantity?: number | null } | null> | null };

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


export type AdminOrdersQuery = { __typename?: 'Query', AdminOrders: Array<{ __typename: 'AdminOrder', _id?: string | null, orderQuantity?: number | null, product?: { __typename: 'MenuItem', name?: string | null, price?: number | null, description?: string | null, _id?: string | null } | null, costumer?: { __typename: 'Costumer', table?: number | null, _id?: string | null } | null } | null> };

export type CostumerOrdersQueryVariables = Exact<{
  restaurant: Scalars['String'];
}>;


export type CostumerOrdersQuery = { __typename?: 'Query', CostumerOrders: Array<{ __typename?: 'OrderItem', orderQuantity?: number | null, _id?: string | null, product?: { __typename?: 'MenuItem', name?: string | null, price?: number | null, description?: string | null, _id?: string | null } | null } | null> };


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
    mutation SignInWithGoogle($email: String!, $password: String!) {
  SignInWithGoogle(email: $email, password: $password) {
    token
  }
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
 *      email: // value for 'email'
 *      password: // value for 'password'
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
    mutation UpdateMenuItems($restaurant: String!, $category: String!, $input: MenuItemInput) {
  UpdateMenuItems(restaurant: $restaurant, category: $category, input: $input) {
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
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($email: String!, $password: String!) {
  UpdatePassword(email: $email, password: $password) {
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
 *      email: // value for 'email'
 *      password: // value for 'password'
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
export const RestaurantsDocument = gql`
    query Restaurants {
  Restaurants {
    name
    owner
    description
    numReviews
    reviews
    type
    images
    rating
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
      _id
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CookieError: ResolverTypeWrapper<CookieError>;
  CookieSuccess: ResolverTypeWrapper<CookieSuccess>;
  Costumer: ResolverTypeWrapper<Costumer>;
  CostumerMenuChoises: ResolversTypes['MenuItem'] | ResolversTypes['OrderItem'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
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
  OrderItem: ResolverTypeWrapper<OrderItem>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  SaveCookie: ResolversTypes['CookieError'] | ResolversTypes['CookieSuccess'];
  String: ResolverTypeWrapper<Scalars['String']>;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
  myArray: ResolverTypeWrapper<MyArray>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AdminOrder: AdminOrder;
  Boolean: Scalars['Boolean'];
  CookieError: CookieError;
  CookieSuccess: CookieSuccess;
  Costumer: Costumer;
  CostumerMenuChoises: ResolversParentTypes['MenuItem'] | ResolversParentTypes['OrderItem'];
  ID: Scalars['ID'];
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
  OrderItem: OrderItem;
  Query: {};
  RegisterInput: RegisterInput;
  Restaurant: Restaurant;
  SaveCookie: ResolversParentTypes['CookieError'] | ResolversParentTypes['CookieSuccess'];
  String: Scalars['String'];
  Token: Token;
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
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  orderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type CostumerMenuChoisesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CostumerMenuChoises'] = ResolversParentTypes['CostumerMenuChoises']> = {
  __resolveType: TypeResolveFn<'MenuItem' | 'OrderItem', ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  coordinates?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  mytype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  itemsType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuParentResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuParent'] = ResolversParentTypes['MenuParent']> = {
  collectionType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  item?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>;
  itemName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
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
  AddMenu?: Resolver<Maybe<ResolversTypes['Menu']>, ParentType, ContextType, RequireFields<MutationAddMenuArgs, 'restaurant'>>;
  AddMenuCategory?: Resolver<Maybe<ResolversTypes['MenuParent']>, ParentType, ContextType, RequireFields<MutationAddMenuCategoryArgs, 'collectionType' | 'itemName' | 'restaurant'>>;
  AddMenuItem?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType, RequireFields<MutationAddMenuItemArgs, 'availability' | 'category' | 'description' | 'itemsType' | 'name' | 'price' | 'quantity' | 'restaurant'>>;
  AddOrder?: Resolver<Array<Maybe<ResolversTypes['AdminOrder']>>, ParentType, ContextType, RequireFields<MutationAddOrderArgs, 'productId'>>;
  AddRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationAddRestaurantArgs, 'description' | 'id' | 'location' | 'name' | 'numReviews' | 'owner' | 'rating' | 'type'>>;
  CostumerExpiry?: Resolver<Maybe<ResolversTypes['CookieSuccess']>, ParentType, ContextType>;
  CreateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>>;
  DeleteCostumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType, Partial<MutationDeleteCostumerArgs>>;
  EmitSocket?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  FetchRestaurantsByQuery?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType, Partial<MutationFetchRestaurantsByQueryArgs>>;
  GetCostumerOrders?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, RequireFields<MutationGetCostumerOrdersArgs, 'restaurant'>>;
  GetOrderItem?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType, RequireFields<MutationGetOrderItemArgs, 'productId' | 'restaurant'>>;
  PostMessage?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationPostMessageArgs, 'content' | 'user'>>;
  RemoveOrder?: Resolver<Array<Maybe<ResolversTypes['AdminOrder']>>, ParentType, ContextType, RequireFields<MutationRemoveOrderArgs, 'productId'>>;
  SignIn?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  SignInWithGoogle?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationSignInWithGoogleArgs, 'email' | 'password'>>;
  SignOut?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SignOutCostumer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  UpdateMenuItems?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MutationUpdateMenuItemsArgs, 'category' | 'restaurant'>>;
  UpdatePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'email' | 'password'>>;
  UpdateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'email' | 'id'>>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  AdminOrders?: Resolver<Array<Maybe<ResolversTypes['AdminOrder']>>, ParentType, ContextType>;
  Costumer?: Resolver<Maybe<ResolversTypes['Costumer']>, ParentType, ContextType>;
  CostumerOrders?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, RequireFields<QueryCostumerOrdersArgs, 'restaurant'>>;
  CurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  Menu?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuParent']>>>, ParentType, ContextType, RequireFields<QueryMenuArgs, 'restaurant'>>;
  MenuByCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuParent']>>>, ParentType, ContextType, RequireFields<QueryMenuByCategoryArgs, 'restaurant'>>;
  MenuItemByCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['CostumerMenuChoises']>>>, ParentType, ContextType, RequireFields<QueryMenuItemByCategoryArgs, 'category' | 'restaurant'>>;
  MenuItemCount?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType, RequireFields<QueryMenuItemCountArgs, 'category' | 'restaurant'>>;
  OrderItems?: Resolver<Maybe<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  Orders?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, RequireFields<QueryOrdersArgs, 'restaurant'>>;
  Restaurants?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numReviews?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaveCookieResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaveCookie'] = ResolversParentTypes['SaveCookie']> = {
  __resolveType: TypeResolveFn<'CookieError' | 'CookieSuccess', ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  CookieError?: CookieErrorResolvers<ContextType>;
  CookieSuccess?: CookieSuccessResolvers<ContextType>;
  Costumer?: CostumerResolvers<ContextType>;
  CostumerMenuChoises?: CostumerMenuChoisesResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Menu?: MenuResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  MenuParent?: MenuParentResolvers<ContextType>;
  MenuSubItem?: MenuSubItemResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  SaveCookie?: SaveCookieResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  myArray?: MyArrayResolvers<ContextType>;
};

