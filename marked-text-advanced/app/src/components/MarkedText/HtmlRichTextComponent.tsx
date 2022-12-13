import React, { ReactNode } from 'react'
import { HtmlElement } from '@brightspot/marked-text'

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

/**
 * Function used to convert regular html strings to React convention
 * @param k The key used in the {@link HtmlElement } attributes array
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
 * Function to take the attributes array held within the {@link HtmlElement} and return an object for the React Element Props.
 * Style is unique as the key will be style and one long string as the value, it needs to be broken into another object of key value pairs.
 * @param element {@link HtmlElement}
 * @returns Object with key value pairs, with key being the HTML element attribute e.g. href, src and value being the string.
 * The style attribute returns as an object with key being style and value being an object of key value pairs.
 */
const attrHandler = (element: HtmlElement) => {
  const { attributes } = element
  return attributes.reduce((a, b) => {
    const attr: string = attrKey(b.name)
    const attrVal = b.value
    if (attr === 'style') {
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
