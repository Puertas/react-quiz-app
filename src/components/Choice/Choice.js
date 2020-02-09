import React from 'react';

import classes from './Choice.module.css';


const Choice = ({id, text, response, disabled, onAnswerQuestion}) => (
  <div className={classes.Radio}>
    <input
      type='radio'
      id={id}
      name={id}
      value={id}
      disabled={disabled}
      checked={id === response}
      onChange={onAnswerQuestion}/>
    <label htmlFor={id}>
      {text}
    </label>
  </div>
);


export default Choice;
