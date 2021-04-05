import React from 'react';
import { Link } from 'gatsby';

interface NavLinkProps {
  to: string;
  className: string;
  activeClassName: string;
}

export const NavLink: React.FunctionComponent<NavLinkProps> = (props) => (
  <li style={{ display: 'inline-block', marginRight: `0.6rem`}}>
    <Link to={props.to} className={props.className} activeClassName={props.activeClassName}>{props.children}</Link>
  </li>
);
