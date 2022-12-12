import React, { Fragment, ReactNode } from 'react'
import { markedTextTraversal } from '@brightspot/marked-text'
import { HtmlElement, MarkedText } from '@brightspot/marked-text'
import {
  ImageRichTextElement,
  ExternalContentRichTextElement,
} from '../../types'
import ExternalContentRichTextComponent from './ExternalContentRichTextComponent'
import HtmlRichTextComponent from './HtmlRichTextComponent'
import ImageRichTextComponent from './ImageRichTextComponent'

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
                  element={mark.data as HtmlElement}
                  children={children}
                />
              )
            case 'ExternalContentRichTextElement':
              return (
                <ExternalContentRichTextComponent
                  key={key++}
                  markData={mark.data as ExternalContentRichTextElement}
                />
              )
            case 'ImageRichTextElement':
              return (
                <ImageRichTextComponent
                  key={key++}
                  markData={mark.data as ImageRichTextElement}
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
