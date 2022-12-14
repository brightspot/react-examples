import { ImageSize, useGetImagesQuery } from '../generated/graphql'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Error from 'next/error'
import Picture from './Picture'

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

const CSRImagesComponent = () => {
  const { data, loading, error } = useGetImagesQuery()

  if (loading) return <div>Loading</div>
  if (error)
    return <Error statusCode={400} title={error?.message || 'bad request'} />
  const images = data?.Images?.items

  return (
    <>
      <Link href={'/'} className={styles.link}>
        {' '}
        Return to Home Page
      </Link>
      <h1>Client Side Images</h1>
      {!images || images.length <= 0 ? (
        <h2 className={styles.noImage}>
          Add an{' '}
          <a
            target="_blank"
            href="http://localhost/cms/"
            className={styles.noImageLink}
            rel="noreferrer"
          >
            image 😉
          </a>{' '}
        </h2>
      ) : (
        <div className={styles.imagesContainer}>
          {images?.map((image: CSRImage | null) =>
            image?.imageFile?.sizes?.map(
              (item: Partial<ImageSize>, k: number) => {
                let imageUrlSrcSet: any = []
                let counter = 0
                if (item?.width && item?.width > 200) {
                  for (let i: number = item.width - 200; i > 0; i -= 100) {
                    imageUrlSrcSet.push({
                      width: item.width - i,
                      srcSet: item?.srcSets?.[counter]?.src || '',
                    })
                    counter++
                  }
                }
                return (
                  <Picture
                    imageUrl={item?.src || ''}
                    imageName={item?.name || ''}
                    imageUrlSrcSet={imageUrlSrcSet}
                    key={k}
                    height={item?.height || 100}
                    width={item?.width || 100}
                  />
                )
              }
            )
          )}
        </div>
      )}
    </>
  )
}

export default CSRImagesComponent
