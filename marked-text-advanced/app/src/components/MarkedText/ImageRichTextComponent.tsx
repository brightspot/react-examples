import React from 'react'
import { ImageRichTextElement } from '../../types'

const ImageRichTextComponent = ({
  markData,
}: {
  markData: ImageRichTextElement
}) => {
  const { caption, credit, alt } = markData

  let key = 0

  const attrs = imgAttrHandler(markData?.image?.entries, alt)

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
 * Function takes in an array of {@link entries} and a string for the image's alt attribute.
 * Adds the alt to the the array and then uses a reducer to return one object with key value pairs.
 * @param entries Array of Objects with key value pairs
 * @param alt Alt string from {@link ImageRichTextElement}
 * @returns Object with key value pairs
 */
const imgAttrHandler = (
  entries: { key: string; value: string }[],
  alt: string | undefined
) => {
  entries.push({ key: 'alt', value: alt ? alt : '' })

  return entries.reduce((a, b) => {
    return { ...a, [b.key]: b.value }
  }, {})
}

export default ImageRichTextComponent
