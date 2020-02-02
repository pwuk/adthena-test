import React from 'react';

const UsersTodos = ({ foundUserToDos }) => foundUserToDos.length > 0 && (
<div className="usersToDos">
  <h3>
    {foundUserToDos.length}
    {' '}
    Todo(s)
  </h3>
  <ul>
    {foundUserToDos.map((todo) => (
      <li
        key={todo.id}
        className={todo.completed ? 'todo-complete' : 'todo-pending'}
      >
        {todo.title}
      </li>
    ))}
  </ul>
</div>
);

export default UsersTodos;
