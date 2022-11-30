import { MarkData } from '../brightspot-marked-text/types'

interface ImageRichTextElement extends MarkData {
  fileUrl?: string
  alt?: string
  image?: Entries
  caption?: string
  credit?: string
  withBorder?: string
  withBackground?: string
  stretched?: string
}

interface Entries {
  entries: Entry[]
}

interface Entry {
  key: string
  value: string
}

const getAttrValue = (
  attribute: string,
  attributes: { key: string; value: string }[] | undefined
) => {
  if (attributes === undefined) return undefined
  const attr = attributes.filter((entry) => entry.key === attribute)

  return attr.length > 0 ? attr[0].value : undefined
}

export const ImageRichTextComponent = ({
  markData,
}: {
  markData: ImageRichTextElement
}) => {
  const { caption, credit, alt, image } = markData
  return (
    <span className="image-rte-container">
      <img
        className="image"
        src={getAttrValue('src', image?.entries)}
        alt={alt}
        width={getAttrValue('width', image?.entries)}
        height={getAttrValue('height', image?.entries)}
      />
      <span className="caption">{caption}</span>
      <span className="credit">{credit}</span>
    </span>
  )
}
