/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  contact: string;
  hasWallet: boolean;
  income: number | null;
  avatar: string;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
}
