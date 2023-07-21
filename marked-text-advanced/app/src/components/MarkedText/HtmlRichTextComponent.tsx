import React, { ReactNode } from 'react'
import { RteHtmlElement, RteHtmlAttribute } from '../../generated'

const HtmlRichTextComponent = ({
  markData,
  children,
}: {
  markData: RteHtmlElement
  children: ReactNode[]
}) => {
  if (markData.name === 'script') return <></> // do nothing with script

  // Check if the element is a void element
  const isVoidElement = markData.name
    ? voidElements.includes(markData.name)
    : false

  let key = 0

  /**
   * Parses the {@link RteHtmlAttribute} array to work well with react
   * Uses the {@link attrKey} function to convert strings to React convention
   */
  const attrs =
    markData?.attributes && markData?.attributes.length > 0
      ? attrHandler(markData.attributes as RteHtmlAttribute[])
      : []

  return React.createElement(
    markData.name as string,
    { ...attrs, key: `k-${key++}` },
    isVoidElement ? null : children
  )
}

/**
 * Function used to convert regular html strings to React convention
 * @param k The key used in the {@link RteHtmlElement } attributes array
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
 * Function to take the attributes {@link RteHtmlAttribute} array and return an object for the React Element Props.
 * @param element {@link RteHtmlElement}
 * @returns Object with key value pairs, with key being the HTML element attribute e.g. href, src and value being the string.
 */
const attrHandler = (attributes: RteHtmlAttribute[]) => {
  return attributes.reduce((a, b) => {
    const attr: string = attrKey(b.name as string)
    const attrVal = b.value
    if (attr === 'style') {
      // Style is unique as the key will be style and one long string as the value, it needs to be broken into another object of key value pairs.
      // The style attribute returns as an object with key being style and value being an object of key value pairs.
      let regex = /([\w-]*)\s*:\s*([^;]*)/g
      let match,
        properties: styleProperties = {}
      match = regex.exec(attrVal as string)
      while ((match = regex.exec(attrVal as string)))
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
