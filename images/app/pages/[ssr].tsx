import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { client } from '../lib/client'
import styles from '../styles/Home.module.css'
import { GetImagesDetailedDocument } from '../generated/graphql'
import Picture from '../components/Picture'
import ImageUrlCreator from '../lib/ImageUrlCreator'
import { CustomImage, CustomImageSize, Settings } from '../lib/types'
import Error from 'next/error'
import Header from '../components/Header'

interface ImageUrlArray {
  imageUrl: string | undefined
  imageName: string | undefined
  imageUrlSrcSet: { [key: string]: string } | undefined
  height: number
  width: number
}

interface Props {
  imageUrlArray?: ImageUrlArray[]
  errorMessage?: string
}

const ServerSide = ({ imageUrlArray, errorMessage }: Props) => {
  if (errorMessage) return <Error statusCode={500} title={errorMessage} />

  return (
    <div className={styles.container}>
      <Head>
        <title>SSR Images</title>
        <meta name="description" content="SSR Images powered by Brightspot" />
        <link rel="icon" href="https://www.brightspot.com/favicon-32x32.png" />
      </Head>
      <Header />
      {imageUrlArray && imageUrlArray.length <= 0 ? (
        <div className={styles.homePageContainer}>
          <h1 className={styles.topText}>🤔</h1>
          <div className={styles.bottomTextContainer}>
            <h2 className={styles.bottomText}>No Images</h2>
          </div>
        </div>
      ) : (
        <div className={styles.imagesContainer}>
          {imageUrlArray &&
            imageUrlArray.map((url: ImageUrlArray, i: number) => {
              const srcSetArray = []
              for (const key in url.imageUrlSrcSet) {
                srcSetArray.push({
                  width: parseInt(key.slice(0, -1)),
                  srcSet: url.imageUrlSrcSet[key],
                })
              }
              return (
                <Picture
                  imageUrl={url.imageUrl || ''}
                  imageName={url.imageName || ''}
                  imageUrlSrcSet={srcSetArray}
                  key={i}
                  height={url.height}
                  width={url.width}
                />
              )
            })}
        </div>
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [{ params: { ssr: 'ssr' } }], fallback: false }
}

export const getStaticProps: GetStaticProps = async () => {
  let imageUrlArray: {
    imageUrl: string
    imageName: string
    imageUrlSrcSet: { [key: string]: string } | undefined
    height: number
    width: number
  }[] = []
  try {
    const { data } = await client.query({
      query: GetImagesDetailedDocument,
    })

    if (data) {
      const settings: Settings = {
        baseUrl: `http:${process.env.BASE_URL}/`,
        sharedSecret: process.env.SECRET!,
      }
      const images = data.Images.items
      for (let i: number = 0; i < images.length; i++) {
        const image: CustomImage = {
          originalUrl: images[i]?.imageFile?.publicUrl,
          publicUrl: images[i]?.imageFile?.publicUrl,
          contentType: images[i]?.imageFile?.contentType,
          filename: images[i]?.imageFile?.filename,
          width: images[i]?.imageFile?.width,
          height: images[i]?.imageFile?.height,
          exif: null,

          focus: {
            x: images[i].imageFile?.focus?.x,
            y: images[i]?.imageFile?.focus?.y,
          },
          crops: [],
          cmsEdits: {
            brightness: images[i]?.imageFile?.edits?.brightness,
            contrast: images[i]?.imageFile?.edits?.contrast,
            flipH: images[i]?.imageFile?.edits?.flipH,
            flipV: images[i]?.imageFile?.edits?.flipV,
            grayscale: images[i]?.imageFile?.edits?.grayscale,
            invert: images[i]?.imageFile?.edits?.invert,
            rotate: images[i]?.imageFile?.edits?.rotate,
            sepia: images[i]?.imageFile?.edits?.sepia,
            sharpen: images[i]?.imageFile?.edits?.sharpen,
          },
        }

        const rectangle: CustomImageSize = {
          name: 'rectangle',
          width: 600,
          height: 400,
          quality: 90,
          format: 'webp',
          descriptors: ['200w', '300w', '400w', '500w'],
        }

        const tall: CustomImageSize = {
          name: 'tall',
          width: 600,
          height: 800,
          quality: 90,
          format: 'webp',
          descriptors: ['200w', '300w', '400w', '500w'],
        }

        const square: CustomImageSize = {
          name: 'square',
          width: 600,
          height: 600,
          quality: 90,
          format: 'webp',
          descriptors: ['200w', '300w', '400w', '500w'],
        }
        const sizes: CustomImageSize[] = [square, rectangle, tall]

        sizes.forEach((size) => {
          const imageUrlCreator = new ImageUrlCreator(settings, image, size)
          const imageUrl = imageUrlCreator.generateUrl()
          const imageUrlSrcSet = imageUrlCreator.toSrcset()?.srcsetUrlsHashMap
          imageUrlArray.push({
            imageUrl: imageUrl,
            imageName: size?.name || '',
            imageUrlSrcSet: imageUrlSrcSet,
            height: size.height || 100,
            width: size.width || 100,
          })
        })
      }
    }

    return {
      props: {
        imageUrlArray,
      },
    }
  } catch (error: any) {
    const errorMessage =
      error?.message || 'an error occurred processing the fetch request'
    return {
      props: {
        errorMessage,
      },
    }
  }
}

export default ServerSide
