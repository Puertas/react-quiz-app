import React from 'react';

import Octicon, {Check, X} from '@primer/octicons-react'

import classes from './Question.module.css';


const Question = ({text, validated, correctResponse, answer}) =>{
  let validation;
  let questionClasses = [classes.Question];

  if (validated) {
    validation = <Octicon icon={answer === correctResponse ? Check : X} />;
    questionClasses = [
      ...questionClasses,
      answer === correctResponse ? classes.QuestionCorrect : classes.QuestionIncorrect
    ];
  }

  return (
    <div className={questionClasses.join(' ')}>
      <span>{text}</span>
      {validation}
    </div>
  )
};


export default Question;
