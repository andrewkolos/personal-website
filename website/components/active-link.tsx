import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link, { LinkProps } from 'next/link'
import React, { Children } from 'react'

export interface ActiveLinkProps extends LinkProps {
  activeClassName: string
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children) as React.ReactElement

  const childClassName = child.props.className || ''

  const className =
    asPath === props.href || asPath === props.as ? `${childClassName} ${activeClassName}`.trim() : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
}

export default ActiveLink
