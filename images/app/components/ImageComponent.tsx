import { useGetImagesQuery } from '../generated/graphql'
import Image from 'next/image'

const ImageComponent = () => {
  const { data, loading, error } = useGetImagesQuery()

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  const images = data?.Images?.items
  const firstImage = images && images?.length > 0 ? images[0] : null

  return (
    <div>
      <h1>Client Side Rendered Image</h1>
      {firstImage?.imageFile?.sizes?.map((item: any, i: number) => {
        return (
          <p key={i}>
            <Image
              src={`http:${item?.src}`}
              alt={item?.name}
              width={item?.width}
              height={item?.height}
            />
          </p>
        )
      })}
    </div>
  )
}

export default ImageComponent
