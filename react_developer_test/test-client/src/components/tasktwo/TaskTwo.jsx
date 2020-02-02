import React, { useState } from 'react';
import UserInformation from './UserInformation';
import UsersTodos from './UsersTodos';
import FormSearchForUser from './FormSearchForUser';

import { useFetch, useFindUser, useFindUserTodos } from './hooks';

const TaskTwo = () => {
  const [todoUserInput, setTodoUser] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);
  const allTheUsers = useFetch('users');
  const allTheToDos = useFetch('todos');
  const foundUsers = useFindUser(todoUserInput, allTheUsers);
  const foundUserToDos = useFindUserTodos(foundUsers, allTheToDos);

  return (
    <div className={`task ${darkTheme ? 'darkTheme' : ''}`}>
      <h1>Task Two</h1>
      <div
        className="content"
        style={{ display: 'none' }}
      >
        <h4>Complete the following task:</h4>
        <p>
            The task is to create components to fetch public API data, combine it,
            apply filtering and visualise that data.
        </p>
        <p>
            Include unit tests. Jest is already configured for you in the skeleton
            project.
        </p>
          Expected:
        <ol type="1">
          <li>
              Use data from the following API endpoints:
            <ol type="a">
              <li>https://jsonplaceholder.typicode.com/users</li>
              <li>https://jsonplaceholder.typicode.com/todos</li>
            </ol>
          </li>
          <li>
              Data fetching should be done with a re-usable data fetching hook.
          </li>
          <li>The user interface must accept a username as input.</li>
          <li>
              The user interface must handle the case where an error occurs and
              the case where the requested user is not found.
          </li>
          <li>Display the username, email and website of the user.</li>
          <li>Display a list of Todos for user.</li>
          <li>
              Visualise the Todos in such a way that it is easy to distinguish
              between the complete and incomplete Todos.
          </li>
          <li>
              Give the user the option of a dark theme for the Todos user
              interface.
          </li>
        </ol>
        <strong>
            Feel free to use this component for your implementation.
        </strong>
      </div>

      <FormSearchForUser
        todoUserInput={todoUserInput}
        handleTodoUserInputChange={(e) => setTodoUser(e.target.value)}
        darkTheme={darkTheme}
        handleDarkThemeChange={(e) => setDarkTheme(e.target.checked)}
      />
      <UserInformation
        foundUsers={foundUsers}
        todoUserInput={todoUserInput}
      />
      <UsersTodos foundUserToDos={foundUserToDos} />
    </div>
  );
};

export default TaskTwo;
