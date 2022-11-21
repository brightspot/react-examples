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

  return (
    <>
      <Link href={'/'} className={styles.link}>
        {' '}
        Return to Home Page
      </Link>
      <h1>Client Side Images</h1>
      {!images ? (
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
                return (
                  <picture key={k}>
                    <source
                      srcSet={item?.srcSets?.[1]?.src || ''}
                      media="(max-width: 360px)"
                    />
                    <source
                      srcSet={item?.srcSets?.[2]?.src || ''}
                      media="(max-width: 460px)"
                    />
                    <source
                      srcSet={item?.srcSets?.[3]?.src || ''}
                      media="(max-width: 560px)"
                    />
                    <source
                      srcSet={item?.srcSets?.[4]?.src || ''}
                      media="(max-width: 660px)"
                    />
                    <source
                      srcSet={item?.srcSets?.[5]?.src || ''}
                      media="(max-width: 760px)"
                    />
                    <source
                      srcSet={item?.srcSets?.[6]?.src || ''}
                      media="(max-width: 860px)"
                    />
                    <source
                      srcSet={item?.srcSets?.[7]?.src || ''}
                      media="(max-width: 960px)"
                    />
                    <source
                      srcSet={item?.srcSets?.[9]?.src || ''}
                      media="(min-width: 970px)"
                    />
                    <img
                      src={item?.src || ''}
                      alt={item?.name || ''}
                      className={styles.image}
                      height={1000}
                      width={1000}
                    />
                  </picture>
                )
              }
            )
          )}
        </div>
      )}
    </>
  )
}

export default ImagesComponent
