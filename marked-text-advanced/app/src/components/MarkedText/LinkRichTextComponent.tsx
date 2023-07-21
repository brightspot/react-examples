import React, { ReactNode } from 'react'
import { LinkRichTextElement } from '../../generated'

const LinkRichTextComponent = ({
  markData,
  children,
}: {
  markData: LinkRichTextElement
  children: ReactNode[]
}) => {
  const { href, target } = markData

  let key = 0

  return (
    <span className="link-rte-container">
      {React.createElement('a', {
        className: 'link-rte',
        href,
        target,
        key: `k-${key++}`,
        children,
      })}
    </span>
  )
}

export default LinkRichTextComponent
