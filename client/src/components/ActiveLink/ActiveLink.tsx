import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { Children, FC, isValidElement } from 'react'

interface Props extends LinkProps {
  activeClassName: string
}

const ActiveLink: FC<Props> = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  let childElement = null
  let childClassName = ''

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      childElement = child
      childClassName = child.props.className || ''
    }
  })

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(childElement, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
