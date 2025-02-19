import React, { useEffect, useState } from 'react';
import { fetchTodos } from './TodoService';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then(setTodos).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.isComplete ? 'Complete' : 'Incomplete'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
