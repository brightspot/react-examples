import React, { ReactNode } from 'react'
import { HtmlElement } from '@brightspot/marked-text'
import { attrHandler, voidElements } from '../../utils'

const HtmlRichTextComponent = ({
  element,
  children,
}: {
  element: HtmlElement
  children: ReactNode[]
}) => {
  if (element.name === 'script') return <></> // do nothing with script

  const isVoidElement = voidElements.includes(element.name)

  let key = 0

  const attrs = attrHandler(element)

  return React.createElement(
    element.name,
    { ...attrs, key: `k-${key++}` },
    isVoidElement ? null : children
  )
}

export default HtmlRichTextComponent
