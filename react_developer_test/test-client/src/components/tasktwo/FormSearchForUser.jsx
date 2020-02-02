import React from 'react';

const FormSearchForUser = ({
  todoUserInput,
  handleTodoUserInputChange,
  darkTheme,
  handleDarkThemeChange
}) => (
  <form onSubmit={(e) => e.preventDefault}>
    <div className="themeSelector">
      <span>Dark theme?</span>
      <input
        name="darkTheme"
        checked={darkTheme}
        onChange={handleDarkThemeChange}
        type="checkbox"
      />
    </div>
    <input
      placeholder="Search for a To do user"
      onChange={handleTodoUserInputChange}
      value={todoUserInput}
    />
  </form>
);

export default FormSearchForUser;
