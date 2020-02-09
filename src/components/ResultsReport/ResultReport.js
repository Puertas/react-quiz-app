import React from 'react';

import classes from './ResultReport.module.css';


const ResultsReport = ({score, closeHandler}) => (
  <div className={classes.ResultsReport}>
    <h1>Results:</h1>
    <h3 className={score < 50 ? classes.Fail : classes.Success}>{score}%</h3>
    <button className="btn" onClick={closeHandler}>
      Close
    </button>
  </div>
);


export default ResultsReport;
