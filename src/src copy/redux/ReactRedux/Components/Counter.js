import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, setUsers, decrement } from "../actions/action";

export default function Counter() {
  const count = useSelector((state) => state.count);
  const users = useSelector((state) => state.users);
  console.log(users, "users");

  const dispatch = useDispatch();
  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUsers(data)); // ✅ Dispatch after data is ready
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  };

  return (
    <div>
      <h2>🧠 Redux Counter Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+ Increment</button>
      <button onClick={() => dispatch(decrement())}>- Decrement</button>
      <button onClick={fetchUsers}>Fetch Users</button>
    </div>
  );
}
