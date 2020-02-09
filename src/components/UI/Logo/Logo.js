import React from 'react';

import reactLogo from '../../../assets/images/react-logo.png';
import classes from './Logo.module.css';


const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={reactLogo} alt="React Logo" />
  </div>
);


export default Logo;
