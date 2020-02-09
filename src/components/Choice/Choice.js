import React from 'react';

import classes from './Choice.module.css';


const Choice = ({id, text, response, disabled, inline, onAnswerQuestion}) => (
  <div className={[classes.Radio, inline ? classes.Inline : ''].join(' ')}>
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
