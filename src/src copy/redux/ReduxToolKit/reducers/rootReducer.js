import { combineReducers } from "redux";
import usersReducer from "../features/users/usersSlice";
import counterReducer from "../features/counter/counterSlice";
const rootReducer = combineReducers({
  users: usersReducer,
  counter: counterReducer,
});
export default rootReducer;
