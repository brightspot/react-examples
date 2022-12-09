import React from 'react'
import { ImageRichTextElement } from '../../types'
import { imgEntriesHandler } from '../../utils'

const ImageRichTextComponent = ({
  markData,
}: {
  markData: ImageRichTextElement
}) => {
  const { caption, credit, alt } = markData

  let key = 0

  const attrs = imgEntriesHandler(markData?.image?.entries, alt)

  return (
    <span className="image-rte-container">
      {React.createElement('img', { ...attrs, key: `k-${key++}` })}
      <span className="caption">{caption}</span>
      <span className="credit">{credit}</span>
    </span>
  )
}

export default ImageRichTextComponent
