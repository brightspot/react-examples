import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Error from 'next/error'
import Picture from '../components/Picture'
import { ImageSize, useGetImagesQuery } from '../generated/graphql'

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

export default function ClientSide() {
  const { data, loading, error } = useGetImagesQuery()

  if (loading) return <div>Loading</div>
  if (error)
    return <Error statusCode={400} title={error?.message || 'bad request'} />
  const images = data?.Images?.items
  return (
    <div className={styles.container}>
      <Head>
        <title>CSR Images</title>
      </Head>
      {!images || images.length <= 0 ? (
        <div className={styles.homePageContainer}>
          <h1 className={styles.topText}>🤔</h1>
          <div className={styles.bottomTextContainer}>
            <h2 className={styles.bottomText}>No Images</h2>
          </div>
        </div>
      ) : (
        <div className={styles.imagesContainer}>
          {images?.map((image: CSRImage | null) =>
            image?.imageFile?.sizes?.map(
              (item: Partial<ImageSize>, k: number) => {
                let imageUrlSrcSet: any = []
                let counter = 0
                if (item?.width && item?.width > 200) {
                  for (let i: number = item.width - 200; i > 0; i -= 100) {
                    if (
                      item?.srcSets?.[counter]?.size?.length &&
                      item?.srcSets?.[counter]?.size?.charAt(
                        item?.srcSets?.[counter]?.size?.length! - 1
                      ) === 'w'
                    )
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
    </div>
  )
}
