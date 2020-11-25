import React from 'react';
import { Link } from 'gatsby';

export const ListLink: React.FunctionComponent<any> = (props: {to: string, children: React.ReactNode}) => (
  <li style={{ display: 'inline-block', marginRight: `0.6rem`}}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);
