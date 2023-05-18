import React, { Fragment, ReactNode } from 'react'
import { markedTextTraversal } from '@brightspot/marked-text'
import { MarkedText } from '@brightspot/marked-text'
import {
  RteHtmlElement,
  ImageRichTextElement,
  LinkRichTextElement,
} from '../../types'
import HtmlRichTextComponent from './HtmlRichTextComponent'
import ImageRichTextComponent from './ImageRichTextComponent'
import LinkRichTextComponent from './LinkRichTextComponent'

const MarkedTextComponent = ({
  markedText,
}: {
  markedText: MarkedText | undefined
}) => {
  let key = 0

  return (
    <>
      {markedTextTraversal(markedText, {
        visitText: (text) => <Fragment key={key++}>{text}</Fragment>,
        visitMark: (mark, children: ReactNode[]) => {
          switch (mark.data.__typename) {
            case 'RteHtmlElement':
              return (
                <HtmlRichTextComponent
                  key={key++}
                  element={mark.data as RteHtmlElement}
                  children={children}
                />
              )
            case 'ImageRichTextElement':
              return (
                <ImageRichTextComponent
                  key={key++}
                  markData={mark.data as ImageRichTextElement}
                />
              )
            case 'LinkRichTextElement':
              return (
                <LinkRichTextComponent
                  key={key++}
                  markData={mark.data as LinkRichTextElement}
                  children={children}
                />
              )
            default:
              return <Fragment key={key++}></Fragment>
          }
        },
      })}
    </>
  )
}

export default MarkedTextComponent
