import React from 'react';
import './hamburger.css';

export default ({ active, toggle }) => {
  let classes = 'hamburger hamburger--slider';
  if (active) {
    classes = classes.concat(' is-active');
  }
  return (
    <div className={classes} onClick={toggle}>
      <div className="hamburger-box">
        <div className="hamburger-inner" />
      </div>
    </div>
  );
};
