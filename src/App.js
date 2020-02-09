import React from 'react';

import classes from './App.module.css';
import Quiz from './containers/Quiz/Quiz';
import Logo from './components/UI/Logo/Logo';


function App() {
  return (
    <div className={classes.App}>
      <header className={classes.Header}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <h1>
          Avallain Quiz
        </h1>
      </header>
      <Quiz />
    </div>
  );
}


export default App;
