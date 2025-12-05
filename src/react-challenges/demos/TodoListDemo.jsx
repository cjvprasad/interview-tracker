import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

const TodoListDemo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Project", completed: true },
  ]);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 max-w-sm mx-auto">
      <h3 className="text-xs font-bold text-green-500 mb-4 uppercase">Expected Output</h3>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 bg-slate-800 border border-slate-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-500">
          <Plus size={16} />
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-700/50 group"
          >
            <div
              onClick={() => toggleTodo(todo.id)}
              className={`text-sm cursor-pointer select-none ${
                todo.completed ? "line-through text-slate-500" : "text-slate-200"
              }`}
            >
              {todo.text}
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="text-xs text-slate-600 text-center py-2">No tasks yet</li>
        )}
      </ul>
    </div>
  );
};

export default TodoListDemo;