import styles from '../styles/Home.module.css'
import { SyntheticEvent, useEffect, useState } from 'react'

interface Props {
  url: {
    imageUrl: string | undefined
    imageName: string | undefined
    imageUrlSrcSet: { [key: string]: string } | undefined
  }
}

const Picture = ({ url }: Props) => {
  return (
    <picture>
      <source
        srcSet={url.imageUrlSrcSet?.['400w']}
        media="(max-width: 360px)"
      />
      <source
        srcSet={url.imageUrlSrcSet?.['500w']}
        media="(max-width: 460px)"
      />
      <source
        srcSet={url.imageUrlSrcSet?.['600w']}
        media="(max-width: 560px)"
      />
      <source
        srcSet={url.imageUrlSrcSet?.['600w']}
        media="(max-width: 660px)"
      />
      <source
        srcSet={url.imageUrlSrcSet?.['700w']}
        media="(max-width: 760px)"
      />
      <source
        srcSet={url.imageUrlSrcSet?.['800w']}
        media="(max-width: 860px)"
      />
      <source
        srcSet={url.imageUrlSrcSet?.['900w']}
        media="(max-width: 960px)"
      />
      <source
        srcSet={
          url.imageUrlSrcSet?.['1000w'] ||
          'https://via.placeholder.com/400/0000FF/808080?Text=Digital.com'
        }
        media="(min-width: 970px)"
      />
      <img
        src={url.imageUrl || ''}
        alt={url.imageName}
        className={styles.image}
        height={1000}
        width={1000}
      />
    </picture>
  )
}

export default Picture
