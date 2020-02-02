import React from 'react';

const showHighLight = (targetText, searchForText) => {
  const regex = new RegExp(`(${searchForText})`, 'gi');
  const parts = targetText.split(regex);
  return (
    <span>
      {parts
        .map((part) => part)
        .map((part, i) => (regex.test(part) ? (
          <span
            className="search-highlight"
            key={i}
          >
            {part}
          </span>
        ) : (
          part
        )))}
    </span>
  );
};

const UserInformation = ({ foundUsers, todoUserInput }) => (
  <div className="userInfo">
    {foundUsers.length > 1 && (
    <div className="tooManyUsers">
                Found
      {' '}
      {foundUsers.length}
      {' '}
users, please be more specific
    </div>
    )}
    <ul>
      {foundUsers.map((user) => (
        <li key={user.id}>
          <div className="username">
                        User name:
            {' '}
            {showHighLight(user.username, todoUserInput)}
          </div>
          <div>
Email :
            {user.email}
          </div>
          <div>
Web site :
            {user.website}
          </div>
        </li>
      ))}
    </ul>
    {foundUsers.length === 0 && todoUserInput.length > 0 && (
    <div>
                Could not find
      {' '}
      <b>{todoUserInput}</b>
    </div>
    )}
  </div>
);

export default UserInformation;
