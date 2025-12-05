import React, { useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  error: "",
  isSubmitting: false,
  loggedIn: false,
};

const ActionTypes = {
  FIELD_CHANGE: "FIELD_CHANGE",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
  SUBMIT_ERROR: "SUBMIT_ERROR",
  SUBMIT_START: "SUBMIT_START",
  LOGOUT: "LOGOUT",
};
const { FIELD_CHANGE, SUBMIT_START, SUBMIT_SUCCESS, SUBMIT_ERROR, LOGOUT } =
  ActionTypes || {};
function reducer(state, action) {
  switch (action.type) {
    case FIELD_CHANGE:
      return { ...state, [action.field]: action.value };
    case SUBMIT_START:
      return { ...state, isSubmitting: true, error: "" };
    case SUBMIT_SUCCESS:
      return { ...state, isSubmitting: false, loggedIn: true };
    case SUBMIT_ERROR:
      return { ...state, isSubmitting: false, error: action.error };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SUBMIT_START });

    // Simple validation
    if (!state.username || !state.password) {
      dispatch({ type: SUBMIT_ERROR, error: "❌ Both fields are required." });
      return;
    }

    // Simulate async login API
    setTimeout(() => {
      if (state.username === "admin" && state.password === "1234") {
        dispatch({ type: "SUBMIT_SUCCESS" });
      } else {
        dispatch({
          type: "SUBMIT_ERROR",
          error: "❌ Invalid credentials. Try admin/1234",
        });
      }
    }, 1000);
  };
  if (state.loggedIn) {
    return (
      <div style={styles.card}>
        <h3>Welcome, {state.username} 🎉</h3>
        <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
      </div>
    );
  }
  return (
    <div style={styles.card}>
      <h3>Login Form (useReducer)</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Username"
          value={state.username}
          onChange={(e) =>
            dispatch({
              type: FIELD_CHANGE,
              field: "username",
              value: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({
              type: FIELD_CHANGE,
              field: "password",
              value: e.target.value,
            })
          }
        />

        {state.error && <p style={{ color: "red" }}>{state.error}</p>}

        <button type="submit" disabled={state.isSubmitting}>
          {state.isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default UseReducerDemo;
// ✅ 4️⃣ Styles
const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: "1rem",
    width: 280,
    fontFamily: "sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};
