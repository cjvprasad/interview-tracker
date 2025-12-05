import React from "react";
import Counter from "./Components/Counter";
import UserList from "./Components/UserList";
import { Provider } from "react-redux";
import { store } from "./app/Store";
const ReduxToolKit = () => {
  return (
    <div>
      <Provider store={store}>
        <Counter />
        <UserList />
      </Provider>
    </div>
  );
};

export default ReduxToolKit;
