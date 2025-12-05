import { INCREMENT, DECREMENT, SET_USERS } from "../actions/actionType";

const initialState = {
  count: 0,
  user: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count === 0 ? 0 : state.count - 1 };
    case SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
export default Reducer;
