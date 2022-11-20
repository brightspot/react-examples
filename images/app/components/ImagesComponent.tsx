import { ImageSize, useGetImagesQuery } from '../generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

interface CSRImage {
  __typename?: 'Image' | undefined
  imageId?: string | null | undefined
  title?: string | null | undefined
  imageFile?:
    | {
        __typename?: 'ImageAttributes' | undefined
        filename?: string | null | undefined
        sizes: Partial<ImageSize>[]
      }
    | null
    | undefined
}

const ImagesComponent = () => {
  const { data, loading, error } = useGetImagesQuery()

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  const images = data?.Images?.items
  if (!images) return <div>No Images</div>

  return (
    <div className={styles.imagesComponentContainer}>
      <Link href={'/'} className={styles.link}>
        {' '}
        Return to Home Page
      </Link>
      <h1>Client Side Rendered Images</h1>
      <div className={styles.imagesContainer}>
        {images?.map((image: CSRImage | null) =>
          image?.imageFile?.sizes?.map(
            (item: Partial<ImageSize>, k: number) => {
              return (
                <div
                  className={styles.csrImageContainer}
                  key={k}
                  data-size={item.name}
                >
                  <Image
                    className={styles.image}
                    src={`http:${item.src}`}
                    alt={item.name || ''}
                    fill
                    priority
                  />
                </div>
              )
            }
          )
        )}
      </div>
    </div>
  )
}

export default ImagesComponent
