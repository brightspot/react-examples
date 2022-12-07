import React, { Fragment, ReactNode } from 'react'
import { markedTextTraversal } from '../brightspot-marked-text'
import { HtmlElement, MarkedText } from '../brightspot-marked-text/types'

interface MarkedTextProps {
  markedText: MarkedText
}

export const MarkedTextComponent = ({ markedText }: MarkedTextProps) => {
  let key = 0

  const attrSwitch = (attr: string) => {
    switch (attr) {
      case 'class':
        return 'className'
      case 'colspan':
        return 'colSpan'
      case 'rowspan':
        return 'rowSpan'
      default:
        return attr
    }
  }

  return (
    <>
      {markedTextTraversal(markedText, {
        visitText: (text) => <Fragment key={key++}>{text}</Fragment>,
        visitMark: (mark, children: ReactNode[]) => {
          const element = mark.data as HtmlElement
          const attrs = element.attributes.reduce((a, b) => {
            const n: string = attrSwitch(b.name)
            return { ...a, [n]: b.value }
          }, {})

          return React.createElement(
            element.name,
            { ...attrs, key: `k-${key++}` },
            children
          )
        },
      })}
    </>
  )
}
