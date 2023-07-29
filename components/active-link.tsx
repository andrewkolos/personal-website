import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { Children, PropsWithChildren } from 'react'

export interface ActiveLinkProps extends LinkProps, PropsWithChildren {
  activeClassName: string
}

const ActiveLink: React.FC<PropsWithChildren<ActiveLinkProps>> = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children) as React.ReactElement

  const childClassName = (child.props.className as String) || ''

  const className =
    asPath === props.href || asPath === props.as ? `${childClassName} ${activeClassName}`.trim() : childClassName

  return (
    <Link legacyBehavior {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
