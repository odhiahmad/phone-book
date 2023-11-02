import { Contact, ContactAction } from "./interface";
import { GET_CONTACT, CREATE_CONTACT, DELETE_CONTACT } from "./types";
export function contactReducer(
  state: Contact[] | null,
  action: ContactAction
): Contact[] | null {
  switch (action.type) {
    case GET_CONTACT:
      return action.payload;
    case CREATE_CONTACT:
      return state ? state.concat(action.payload) : null;
    case DELETE_CONTACT:
      return state ? state.filter((item) => item.id !== action.payload) : null;
    default:
      return state;
  }
}
