import styles from '../styles/Home.module.css'
import { SyntheticEvent, useEffect, useState } from 'react'

interface Props {
    imageUrl: string
    imageName: string
    imageUrlSrcSet: { [key: string]: string }
    height: number
    width: number
}

const Picture = ({ imageUrl, imageName, imageUrlSrcSet, width, height }: Props) => {
  return (
    <picture>
      <source
        srcSet={imageUrlSrcSet?.['400w']}
        media="(max-width: 360px)"
      />
      <source
        srcSet={imageUrlSrcSet?.['500w']}
        media="(max-width: 460px)"
      />
      <source
        srcSet={imageUrlSrcSet?.['600w']}
        media="(max-width: 560px)"
      />
      <source
        srcSet={imageUrlSrcSet?.['600w']}
        media="(max-width: 660px)"
      />
      <source
        srcSet={imageUrlSrcSet?.['700w']}
        media="(max-width: 760px)"
      />
      <source
        srcSet={imageUrlSrcSet?.['800w']}
        media="(max-width: 860px)"
      />
      <source
        srcSet={imageUrlSrcSet?.['900w']}
        media="(max-width: 960px)"
      />
      <source
        srcSet={
          imageUrlSrcSet?.['1000w'] ||
          'https://via.placeholder.com/400/0000FF/808080?Text=Digital.com'
        }
        media="(min-width: 970px)"
      />
      <img
        src={imageUrl || ''}
        alt={imageName}
        className={styles.image}
        height={height}
        width={width}
      />
    </picture>
  )
}

export default Picture
