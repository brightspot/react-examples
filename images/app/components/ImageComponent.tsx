import { useGetImageUrlBySizeNameQuery } from '../generated/graphql'
// import Image from 'next/image'
// import Link from 'next/link'
import { useRouter } from 'next/router'

const ImageComponent = () => {
  const router = useRouter()
  const { data, loading, error } = useGetImageUrlBySizeNameQuery({
    variables: {
      name: (router.query.id as string) || '',
    },
  })
  //TODO: update Endpoint in Brightspot to receive an id argument to search for image by id
  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  console.log({ data })

  return (
    <div>
      <h1>Client Side Rendered Image</h1>
      {/*          
            <Image
              src={`http:${item?.src}`}
              alt={item?.name}
              width={item?.width}
              height={item?.height}
            /> */}
    </div>
  )
}

export default ImageComponent
