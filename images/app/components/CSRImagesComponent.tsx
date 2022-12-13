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
                const imageUrlSrcSet = {
                  '400w': item?.srcSets?.[1]?.src || '',
                  '500w': item?.srcSets?.[2]?.src || '',
                  '600w': item?.srcSets?.[3]?.src || '',
                  '700w': item?.srcSets?.[4]?.src || '',
                  '800w': item?.srcSets?.[5]?.src || '',
                  '900w': item?.srcSets?.[6]?.src || '',
                  '1000w': item?.srcSets?.[7]?.src || ''
                }
                return (
                  <Picture imageUrl={item?.src || ''} imageName={item?.name || ''} 
                  imageUrlSrcSet={imageUrlSrcSet} key={k}
                  height={1000}
                  width={1000}
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
