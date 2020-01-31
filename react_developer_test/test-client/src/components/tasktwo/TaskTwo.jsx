import React, {useState, useEffect} from 'react';

const TaskTwo = () => {
  const [todoUserInput, setTodoUser] = useState("");
  const [allTheToDos, setAllTheToDos] = useState([]);
  const [allTheUsers, setAllTheUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [foundUserToDos, setFoundUserToDos] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  const execUserSearch = (todoUserInput) => {
    if(todoUserInput.length>0) {
      setFoundUsers(allTheUsers.filter(user => user.username.toLowerCase().includes(todoUserInput.toLowerCase())));
    }
    else {
      setFoundUsers([]);
    }
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(result=>result.json()).then(result=>setAllTheUsers(result));
    fetch('https://jsonplaceholder.typicode.com/todos').then(result=>result.json()).then(result=>setAllTheToDos(result));
  }, []);

  useEffect(()=>{
    if(foundUsers.length === 1) {
      setFoundUserToDos(allTheToDos.filter(todo=>todo.userId===foundUsers[0].id ))
    }
    else {
      setFoundUserToDos([]);
    }

  }, [foundUsers]);

  useEffect(() => {
     execUserSearch(todoUserInput)
  }, [todoUserInput]);

  const todoUserInputChangeHandler = (e) => {
    setTodoUser(e.target.value);
  };

  const handleDarkThemeChange = (e) => {
    setDarkTheme(e.target.checked);
  };

  const showHighLight = (text) => {
    const regex = new RegExp(`(${todoUserInput})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
          {parts.map(part => part).map((part, i) => (
              regex.test(part) ? <span className={'search-highlight'} key={i}>{part}</span> : part
          ))}
      </span>
    )
  };

  return (
    <div className={`task ${darkTheme ? 'darkTheme': '' }`}  >
    <h1>Task Two</h1>
    <div className="content" style={{display: 'none'}}>
      <h4>Complete the following task:</h4><p>
          The task is to create components to fetch public API data, combine it, apply
          filtering and visualise that data.
        </p>
        <p>Include unit tests. Jest is already configured for you in the skeleton project.</p>
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
          <li>
            The user interface must accept a username as input.
          </li>
          <li>
            The user interface must handle the case where an error occurs and the case where the
            requested user is not found.
          </li>
          <li>
            Display the username, email and website of the user.
          </li>
          <li>
            Display a list of Todos for user.
          </li>
          <li>
            Visualise the Todos in such a way that it is easy to distinguish between the
            complete and incomplete Todos.
          </li>
          <li>
            Give the user the option of a dark theme for the Todos user interface.
          </li>
        </ol>
        <strong>Feel free to use this component for your implementation.</strong>
    </div>

      <form onSubmit={e=>e.preventDefault}>
        <div className="themeSelector"><span>Dark theme?</span>
        <input name="darkTheme" checked={darkTheme} onChange={handleDarkThemeChange} type="checkbox"/>
        </div>
        <input placeholder="Search for a To do user" onChange={todoUserInputChangeHandler} value={todoUserInput} />
      </form>

      <div className="userInfo">
        {foundUsers.length > 1 && (<div className="tooManyUsers">Found {foundUsers.length} users, please be more specific</div>)}
        <ul>
        {foundUsers.map(user=> {
              return <li>
                <div className={"username"}>User name: {showHighLight(user.username)}</div>
                <div>Email : {user.email}</div>
                <div>Web site : {user.website}</div>
              </li>;
            }
        )}
        </ul>
        {foundUsers.length === 0  && todoUserInput.length > 0 && (<div>Could not find <b>{todoUserInput}</b></div>)}

      </div>
      <div className="usersToDos">
        <ul>
        {foundUserToDos.length > 0 &&
            foundUserToDos.map(todo=> <li className={todo.completed ? "todo-complete" : "todo-pending"}>{todo.title}</li>)
        }
        </ul>
      </div>
    </div>
  )
};

export default TaskTwo;