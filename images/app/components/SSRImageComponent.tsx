import Image from 'next/image'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'

const ImageComponent = () => {
  const router = useRouter()

useEffect(() => {
  if (router.isReady) {
    console.info('router is ready')
  }
}, [router.isReady])

if(!router.isReady) return <div>waiting on the router 😊</div>
  
return (
    <div>
      <Link href={'/ssr'}> Return to all SSR Images</Link>
      <h1>Server Side Rendered Image</h1>
      <h3>Size: {router.query.name}</h3>
      <h4>
        Height: {router.query.height}px || Width: {router.query.width}px
      </h4>
      <Image
        src={router.query.url as string}
        alt={router.query.name as string}
        width={parseInt(router.query.width as string)}
        height={parseInt(router.query.height as string)}
       
      />
    </div>
  )
}

export default ImageComponent
