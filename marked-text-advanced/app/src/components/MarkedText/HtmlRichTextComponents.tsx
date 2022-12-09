import React, { ReactNode } from 'react'
import { HtmlElement } from '@brightspot/marked-text'
import { attrHandler } from '../../utils'

const HtmlRichTextComponent = ({
  element,
  children,
}: {
  element: HtmlElement
  children: ReactNode[]
}) => {
  let key = 0
  let isImage = element.name === 'img'

  const attrs = attrHandler(element)

  return React.createElement(
    element.name,
    { ...attrs, key: `k-${key++}` },
    isImage ? null : children
  )
}

export default HtmlRichTextComponent
