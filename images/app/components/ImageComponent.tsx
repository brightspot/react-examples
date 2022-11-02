import { useGetImageUrlBySizeNameQuery } from '../generated/graphql'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

const ImageComponent = () => {
  const router = useRouter()
  const { data, loading, error } = useGetImageUrlBySizeNameQuery({
    variables: {
      name: (router.query.name as string) || '',
      id: (router.query.id as string) || '',
    },
  })

  if (loading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <Link href={'/csr'}> Return to all CSR Images</Link>
      <h1>Client Side Rendered Image</h1>
      <h3>Size: {data?.Image?.imageFile?.size?.name}</h3>
      <h4>
        Height: {data?.Image?.imageFile?.size?.height}px || Width:{' '}
        {data?.Image?.imageFile?.size?.width}px
      </h4>
      <Image
        src={`http:${data?.Image?.imageFile?.size?.src}`}
        alt={data?.Image?.title || 'example image'}
        width={data?.Image?.imageFile?.size?.width || 400}
        height={data?.Image?.imageFile?.size?.height || 400}
      />
    </div>
  )
}

export default ImageComponent
