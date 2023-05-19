import React, { ReactNode } from 'react'
import { HtmlRichTextElement, HtmlAttribute } from '../../types'

const HtmlRichTextComponent = ({
  markData,
  children,
}: {
  markData: HtmlRichTextElement
  children: ReactNode[]
}) => {
  if (markData.name === 'script') return <></> // do nothing with script

  // Check if the element is a void element
  const isVoidElement = voidElements.includes(markData.name)

  let key = 0

  /**
   * Parses the {@link HtmlAttribute} array to work well with react
   * Uses the {@link attrKey} function to convert strings to React convention
   */
  const attrs = attrHandler(markData.attributes)

  return React.createElement(
    markData.name,
    { ...attrs, key: `k-${key++}` },
    isVoidElement ? null : children
  )
}

/**
 * Function used to convert regular html strings to React convention
 * @param k The key used in the {@link HtmlRichTextElement } attributes array
 * @returns {string} The React camelCased key
 */
const attrKey = (k: string) => {
  switch (k) {
    case 'class':
      return 'className'
    case 'colspan':
      return 'colSpan'
    case 'rowspan':
      return 'rowSpan'
    case 'charset':
      return 'charSet'
    case 'frameborder':
      return 'frameBorder'
    case 'allowfullscreen':
      return 'allowFullScreen'
    default:
      return k
  }
}

/**
 * Function to take the attributes {@link HtmlAttribute} array and return an object for the React Element Props.
 * @param element {@link HtmlRichTextElement}
 * @returns Object with key value pairs, with key being the HTML element attribute e.g. href, src and value being the string.
 */
const attrHandler = (attributes: HtmlAttribute[]) => {
  return attributes.reduce((a, b) => {
    const attr: string = attrKey(b.name)
    const attrVal = b.value
    if (attr === 'style') {
      // Style is unique as the key will be style and one long string as the value, it needs to be broken into another object of key value pairs.
      // The style attribute returns as an object with key being style and value being an object of key value pairs.
      let regex = /([\w-]*)\s*:\s*([^;]*)/g
      let match,
        properties: styleProperties = {}
      match = regex.exec(attrVal)
      while ((match = regex.exec(attrVal)))
        properties[match[1]] = match[2].trim()
      return { ...a, [attr]: properties }
    }
    return { ...a, [attr]: attrVal }
  }, {})
}
interface styleProperties {
  [k: string]: string
}

/**
 * Array list of Void Elements
 */
const voidElements = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]

export default HtmlRichTextComponent
