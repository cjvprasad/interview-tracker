import React, { useState } from "react";
import SyntaxHighLighter from "../common/SyntaxHighLighter";

const sections = {
  whyRedux: {
    title: "📘 Why Redux?",
    description: `
Redux is a predictable state management library for React.
It helps manage shared state across deeply nested components.

✅ Why use Redux?
- Centralized store (single source of truth)
- Predictable state transitions
- Powerful DevTools for debugging
- Makes async data fetching easier to manage
- Avoids prop drilling when multiple components need the same state
    `,
    codeString: `Component Hierarchy Problem Example:
App
 ├── Navbar (needs username)
 ├── Profile (needs username)
 └── Dashboard (updates username)

Without Redux → props drilling
With Redux → store holds username, any component can read or update it`,
  },

  reduxClassic: {
    title: "⚙️ Redux Setup (Legacy createStore)",
    description: `
The traditional Redux setup uses createStore, reducers, and actions.
This approach is verbose but teaches core Redux concepts.`,
    codeString: `
📁 src/
 ├── store/
 │    ├── actions.js
 │    ├── reducer.js
 │    └── store.js
 ├── components/
 │    ├── Counter.js
 │    └── Users.js
 ├── App.js
 └── index.js

// store.js
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";
export const store = createStore(reducer);

// reducer.js
const initialState = { count: 0, users: [] };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT": return { ...state, count: state.count + 1 };
    case "DECREMENT": return { ...state, count: state.count - 1 };
    case "SET_USERS": return { ...state, users: action.payload };
    default: return state;
  }
}

// actions.js
export const increment = () => ({ type: "INCREMENT" });
export const decrement = () => ({ type: "DECREMENT" });
export const setUsers = (users) => ({ type: "SET_USERS", payload: users });

// index.js
import { Provider } from "react-redux";
import { store } from "./store/store";
<Provider store={store}><App /></Provider>;`,
  },

  reduxToolkit: {
    title: "⚡ Redux Toolkit Setup (Modern Way)",
    description: `
Redux Toolkit simplifies Redux setup with configureStore and createSlice.
It automatically enables DevTools, thunk, and immutability checks.`,
    codeString: `
📁 src/
 ├── app/
 │    └── store.js
 ├── features/
 │    ├── counterSlice.js
 │    └── usersSlice.js
 ├── components/
 │    ├── CounterRTK.js
 │    └── UsersRTK.js
 ├── App.js
 └── index.js

// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import usersReducer from "../features/usersSlice";
export const store = configureStore({
  reducer: { counter: counterReducer, users: usersReducer },
});

// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
});
const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});
export default usersSlice.reducer;

// index.js
import { Provider } from "react-redux";
import { store } from "./app/store";
<Provider store={store}><App /></Provider>;`,
  },
};

export default function ReduxExplorer() {
  const [selected, setSelected] = useState("whyRedux");
  const { title, description, codeString } = sections[selected];

  return (
    <div style={styles.container}>
      <h2>🧭 Redux Explorer</h2>

      <label style={styles.label}>
        Select Concept:
        <select
          style={styles.select}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="whyRedux">Why Redux?</option>
          <option value="reduxClassic">Redux (createStore)</option>
          <option value="reduxToolkit">Redux Toolkit (configureStore)</option>
        </select>
      </label>

      <div style={styles.section}>
        <h3>{title}</h3>
        <p style={styles.description}>{description}</p>
        <SyntaxHighLighter codeString={codeString} language="javascript" />
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20, fontFamily: "Segoe UI, sans-serif" },
  label: { display: "block", marginBottom: 10, fontWeight: "bold" },
  select: { padding: 6, marginLeft: 10 },
  section: {
    border: "1px solid #ccc",
    padding: 20,
    borderRadius: 10,
    background: "#fafafa",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  description: { whiteSpace: "pre-line", marginBottom: 10 },
};
