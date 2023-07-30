import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { Children, PropsWithChildren } from 'react'

export interface ActiveLinkProps extends LinkProps, PropsWithChildren {
  activeClassName: string
  catchAll?: boolean
}

const ActiveLink: React.FC<PropsWithChildren<ActiveLinkProps>> = ({
  children,
  activeClassName,
  catchAll,
  ...props
}) => {
  const { asPath } = useRouter()
  const child = Children.only(children) as React.ReactElement

  const childClassName = (child.props.className as String) || ''

  const matches = (() => {
    if (catchAll !== false) {
      return asPath.includes(props.href.toString())
    }
    return asPath === props.href
  })()
  const className = matches ? `${childClassName} ${activeClassName}`.trim() : childClassName

  return (
    <Link legacyBehavior {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

ActiveLink.defaultProps = {
  catchAll: true,
}

export default ActiveLink
