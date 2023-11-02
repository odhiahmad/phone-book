import { GET_CONTACT, CREATE_CONTACT, DELETE_CONTACT } from "./types";

type Phones = {
  number: number;
};

export type Contact = {
  number: number;
  first_name: string;
  last_name: string;
  id: number;
  phones: Phones[];
};

export interface IGetContactAction {
  type: typeof GET_CONTACT;
  payload: Contact[];
}

export interface ICreateContactAction {
  type: typeof CREATE_CONTACT;
  payload: Contact[];
}

export interface IDeleteContactAction {
  type: typeof DELETE_CONTACT;
  payload: number;
}

export type ContactAction =
  | IGetContactAction
  | ICreateContactAction
  | IDeleteContactAction;
