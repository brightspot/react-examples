import { ImageSize, useGetImagesQuery } from '../generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const ImagesComponent = () => {
  const { data, loading, error } = useGetImagesQuery()

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  const images = data?.Images?.items
  const firstImage = images && images?.length > 0 ? images[0] : null

  return (
    <div className={styles.imagesComponentContainer}>
      <Link href={'/'} className={styles.link}>
        {' '}
        Return to Home Page
      </Link>
      <h1>Client Side Rendered Images</h1>
      {firstImage?.imageFile?.sizes?.map(
        (item: Partial<ImageSize>, i: number) => {
          const breakpointArray = item?.src?.split('resize/')
          const widthHeight = breakpointArray?.[1].split('x')
          const width = parseInt(widthHeight?.[0] || '0')
          const height = parseInt(widthHeight?.[1]?.split('/')?.[0] || '0')
          return (
            <div className={styles.pictureContainer} key={i}>
              <Image
                className={styles.csrImage}
                src={`http:${item.src}`}
                alt={item.name || ''}
                priority
                height={height}
                width={width}
              />
            </div>
          )
        }
      )}
    </div>
  )
}

export default ImagesComponent
