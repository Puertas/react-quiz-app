import React from 'react';

import avallainLogo from '../../../assets/images/avallain-logo.png';
import classes from './Logo.module.css';


const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={avallainLogo} alt="Avallain Logo" />
  </div>
);


export default Logo;
