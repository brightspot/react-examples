import React from 'react'
import { ImageRichTextElement, MapEntry } from '../../generated'

const ImageRichTextComponent = ({
  markData,
}: {
  markData: ImageRichTextElement
}) => {
  const { caption, credit, alt, image } = markData

  let key = 0

  /**
   * Function takes in an array of {@link Entry} and a string for the image's alt attribute.
   * Adds the alt to the the array and then uses a reducer to return one object with key value pairs.
   */
  const attrs = imgAttrHandler(image?.entries as MapEntry[], alt as string)

  return (
    <span className="image-rte-container">
      {React.createElement('img', {
        className: 'image-rte',
        ...attrs,
        key: `k-${key++}`,
      })}
      <span className="caption">{caption}</span>
      <span className="credit">{credit}</span>
    </span>
  )
}

/**
 * Function takes in an array of {@link MapEntriesArgs} and a string for the image's alt attribute.
 * Adds the alt to the the array and then uses a reducer to return one object with key value pairs.
 * @param MapEntriesArgs Array of Objects with key value pairs
 * @param alt Alt string from {@link ImageRichTextElement}
 * @returns Object with key value pairs
 */
const imgAttrHandler = (entries: MapEntry[], alt: string | undefined) => {
  entries.push({ key: 'alt', value: alt ? alt : '' })

  return entries.reduce((a, b) => {
    return { ...a, [b.key]: b.value }
  }, {})
}

export default ImageRichTextComponent
