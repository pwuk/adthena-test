import { useState, useEffect } from 'react';

const useFetch = (dataAPIKey) => {
  const [theData, setTheData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${dataAPIKey}`)
      .then((result) => result.json())
      .then((result) => setTheData(result));
  }, [dataAPIKey]);

  return theData;
};

const useFindUser = (todoUserInput, allTheUsers) => {
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    if (todoUserInput.length > 0) {
      const regex = new RegExp(`(${todoUserInput})`, 'gi');
      setFoundUsers(allTheUsers.filter((user) => user.username.match(regex)));
    } else {
      setFoundUsers([]);
    }
  }, [todoUserInput, allTheUsers]);

  return foundUsers;
};

const useFindUserTodos = (foundUsers, allTheToDos) => {
  const [foundUserTodos, setFoundUserToDos] = useState([]);

  useEffect(() => {
    if (foundUsers.length === 1) {
      setFoundUserToDos(
        allTheToDos.filter((todo) => todo.userId === foundUsers[0].id)
      );
    } else {
      setFoundUserToDos([]);
    }
  }, [foundUsers, allTheToDos]);

  return foundUserTodos;
};

export { useFindUser, useFetch, useFindUserTodos };
