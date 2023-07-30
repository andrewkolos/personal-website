import React, { PropsWithChildren } from 'react'
import ActiveLink from '../active-link'

interface NavLinkProps extends PropsWithChildren {
  to: string
  className?: string
  activeclassname: string
  catchAll?: boolean
}

export const NavLink: React.FunctionComponent<NavLinkProps> = ({
  to,
  className,
  activeclassname,
  catchAll,
  children,
}) => (
  <li style={{ display: 'inline-block', marginRight: `0.6rem` }}>
    <ActiveLink catchAll={catchAll} href={to} activeClassName={activeclassname}>
      <a className={className}>{children}</a>
    </ActiveLink>
  </li>
)

NavLink.defaultProps = {
  catchAll: true,
}

NavLink.defaultProps = {
  className: undefined,
}
