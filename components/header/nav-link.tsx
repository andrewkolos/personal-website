import React from 'react'
import ActiveLink from '../active-link'

interface NavLinkProps {
  to: string
  className?: string
  activeclassname: string
}

export const NavLink: React.FunctionComponent<NavLinkProps> = ({ to, className, activeclassname, children }) => {
  return (
    <li style={{ display: 'inline-block', marginRight: `0.6rem` }}>
      <ActiveLink href={to} activeClassName={activeclassname}>
        <a className={className}>{children}</a>
      </ActiveLink>
    </li>
  )
}

NavLink.defaultProps = {
  className: undefined,
}
