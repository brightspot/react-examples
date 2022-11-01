import { useGetImagesQuery } from '../generated/graphql'
import Image from 'next/image'
import Link from 'next/link'

const ImagesComponent = () => {
  const { data, loading, error } = useGetImagesQuery()

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  const images = data?.Images?.items
  const firstImage = images && images?.length > 0 ? images[0] : null

  return (
    <div>
      <h1>Client Side Rendered Images</h1>
      {firstImage?.imageFile?.sizes?.map((item: any, i: number) => {
        console.log('width: ', item.width, 'height: ', item.height)
        return (
          <Link href={`/csr/${item?.name}`} key={i}>
            <Image
              src={`http:${item?.src}`}
              alt={item?.name}
              width={item?.width}
              height={item?.height}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default ImagesComponent
