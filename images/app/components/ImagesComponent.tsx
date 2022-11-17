import { useGetImagesQuery } from '../generated/graphql'
import { ImageSizeCSR } from '../lib/types'
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
    <div>
      <Link href={'/'} className={styles.link}>
        {' '}
        Return to Home Page
      </Link>
      <h1>Client Side Rendered Images</h1>
      {firstImage?.imageFile?.sizes?.map((item: ImageSizeCSR, i: number) => {
        return (
          <div key={i}>
            <h2>{item.name}</h2>
            <div className={styles.pictureContainer}>
              <Image
                src={`http:${item?.src}`}
                alt={item?.name || ''}
                width={item?.width!}
                height={item?.height!}
                loading="eager"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ImagesComponent
