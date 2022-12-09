import { HtmlElement } from '@brightspot/marked-text'

const imgEntriesHandler = (
  entries: { key: string; value: string }[],
  alt: string | undefined
) => {
  entries.push({ key: 'alt', value: alt ? alt : '' })

  return entries.reduce((a, b) => {
    return { ...a, [b.key]: b.value }
  }, {})
}

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

export { attrHandler, imgEntriesHandler }
