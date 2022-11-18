import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { client } from '../lib/client'
import {
  GetImagesDetailedDocument,
  ImageSize,
  Image as ImageType,
} from '../generated/graphql'
import Link from 'next/link'
import Image from 'next/image'

import ImageUrlCreator from '../lib/imageUrlClass'
import { CustomImage, CustomImageSize, Settings } from '../lib/types'

interface Props {
  imageUrlArray: string[]
  errors: any
}

const ServerSide = ({ imageUrlArray, errors }: Props) => {
  if (errors) return <div>Error Occured</div>

  if (!imageUrlArray || imageUrlArray.length === 0) {
    return (
      <div>
        <div>404</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SSR Images</title>
        <meta name="description" content="SSR Images powered by Brightspot" />
        <link rel="icon" href="https://www.brightspot.com/favicon-32x32.png" />
      </Head>

      <main className={styles.main}>
        <div>
          <Link className={styles.link} href={'/'}>
            {' '}
            Return to Home Page
          </Link>
          <h1>Server Side Rendered Images</h1>
          {imageUrlArray.map((url: string, i: number) => {
            const breakpointArray = url.split('resize/')
            const widthHeight = breakpointArray[1].split('x')
            const width = parseInt(widthHeight[0])
            const height = parseInt(widthHeight[1].split('/')[0])
            return (
              <div key={i}>
                <Image
                  src={url}
                  alt="example"
                  height={height}
                  width={width}
                  priority
                />
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [{ params: { ssr: 'ssr' } }], fallback: false }
}

export const getStaticProps: GetStaticProps = async () => {
  let imageUrlArray: string[] = []
  try {
    const { data } = await client.query({
      query: GetImagesDetailedDocument,
    })

    if (data) {
      const firstImage: ImageType = data.Images.items[0]

      const settings: Settings = {
        baseUrl: `http:${process.env.BASE_URL}/`,
        sharedSecret: process.env.SECRET!,
      }

      const image: CustomImage = {
        originalUrl: firstImage?.imageFile?.publicUrl,
        publicUrl: firstImage?.imageFile?.publicUrl,
        contentType: firstImage?.imageFile?.contentType,
        filename: firstImage?.imageFile?.filename,
        width: firstImage?.imageFile?.width,
        height: firstImage?.imageFile?.height,
        exif: null,

        focus: {
          x: firstImage.imageFile?.focus?.x,
          y: firstImage?.imageFile?.focus?.y,
        },
        crops: [],
        cmsEdits: {
          brightness: firstImage?.imageFile?.edits?.brightness,
          contrast: firstImage?.imageFile?.edits?.contrast,
          flipH: firstImage?.imageFile?.edits?.flipH,
          flipV: firstImage?.imageFile?.edits?.flipV,
          grayscale: firstImage?.imageFile?.edits?.grayscale,
          invert: firstImage?.imageFile?.edits?.invert,
          rotate: firstImage?.imageFile?.edits?.rotate,
          sepia: firstImage?.imageFile?.edits?.sepia,
          sharpen: firstImage?.imageFile?.edits?.sharpen,
        },
      }

      const sizes = firstImage?.imageFile?.sizes
      sizes?.forEach((item: ImageSize) => {
        const size: CustomImageSize = {
          name: item.name,
          width: item.width,
          height: item.height,
          quality: 90,
          format: 'webp',
          descriptors: ['1x', '2x'],
        }
        const imageUrlCreator = new ImageUrlCreator(settings, image, size)
        const imageUrl = imageUrlCreator.generateUrl()
        imageUrlArray.push(imageUrl)
      })
    }

    return {
      props: {
        imageUrlArray,
      },
    }
  } catch (errors: any) {
    const props = { message: 'an error occurred' }
    console.log({ errors })
    return { props }
  }
}

export default ServerSide
