import React from 'react';

function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo.label}
      <button onClick={onDelete}>&times;</button>
    </li>
  );
}

export default TodoItem;