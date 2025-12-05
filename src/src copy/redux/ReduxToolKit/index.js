import React from "react";
import CounterRTK from "./components/CounterRTK";
import UsersRTK from "./components/UsersRTK";
import { Provider } from "react-redux";
import { store } from "./app/store";
const ReduxToolKit = () => {
  return (
    <div>
      <Provider store={store}>
        <CounterRTK />
        <UsersRTK />
      </Provider>
    </div>
  );
};

export default ReduxToolKit;
