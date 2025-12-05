import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, setUsers, decrement } from "../actions/action";

export default function UserList() {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>🧠 Redux Retch Users Example</h2>
      <ul>
        {users?.length > 0 ? (
          users.map((u) => <li key={u.id}>{u.name}</li>)
        ) : (
          <>No user's found</>
        )}
      </ul>
    </div>
  );
}
