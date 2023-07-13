/* eslint-disable @typescript-eslint/no-shadow */

import { Highlight, themes } from 'prism-react-renderer'
import React, { PropsWithChildren } from 'react'

export interface CodeBlockProps {
  children: any
}

export const CodeBlock: React.FC<PropsWithChildren<CodeBlockProps>> = ({ children }) => {
  const className = children.props.className || ''
  const matches = className.match(/language-(?<lang>.*)/)
  return (
    <Highlight
      code={children.props.children.trim()}
      language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''}
      theme={themes.nightOwlLight}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
