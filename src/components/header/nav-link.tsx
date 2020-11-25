import React from 'react';
import { Link } from 'gatsby';
import Styles from './header.module.scss';

export const ListLink: React.FunctionComponent<any> = (props: {to: string, children: React.ReactNode}) => (
  <li style={{ display: 'inline-block', marginRight: `0.6rem`}}>
    <Link to={props.to} activeClassName={Styles.navLinkActive}>{props.children}</Link>
  </li>
);
