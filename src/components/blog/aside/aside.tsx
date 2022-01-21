import React from 'react';
import * as Styles from './aside.module.scss';

export const Aside: React.FC<any> = props => {
  return <div className={Styles.aside}>{props.children}</div>;
};
