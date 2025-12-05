import { INCREMENT, DECREMENT, SET_USERS } from "./actionType";
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});
