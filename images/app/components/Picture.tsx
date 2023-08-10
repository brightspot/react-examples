import styles from '../styles/Home.module.css'

interface Props {
  imageUrl: string
  imageName: string
  imageUrlSrcSet: { width: number; srcSet: string }[]
  height: number
  width: number
}

const Picture = ({
  imageUrl,
  imageName,
  imageUrlSrcSet,
  width,
  height,
}: Props) => {
  return (
    <picture>
      {imageUrlSrcSet.map((item, i: number) => {
        return (
          <source
            srcSet={item.srcSet}
            media={`(max-width: ${item.width}px)`}
            key={i}
          />
        )
      })}
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
