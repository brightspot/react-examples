import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { client } from '../lib/client'
import { GetImagesDetailedDocument } from '../generated/graphql'
import Link from 'next/link'
import Picture from '../components/Picture'

import ImageUrlCreator from '../lib/ImageUrlCreator'
import { CustomImage, CustomImageSize, Settings } from '../lib/types'
import Error from 'next/error'

interface Props {
  imageUrlArray?: {
    imageUrl: string | undefined
    imageName: string | undefined
    imageUrlSrcSet: { [key: string]: string } | undefined
  }[]
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
      <Link className={styles.link} href={'/'}>
        {' '}
        Return to Home Page
      </Link>
      <h1>Server Side Images</h1>
      {imageUrlArray && imageUrlArray.length <= 0 ? (
        <h2 className={styles.noImage}>
          Add an{' '}
          <a
            target="_blank"
            href="http://localhost/cms/"
            className={styles.noImageLink}
            rel="noreferrer"
          >
            image 😉
          </a>{' '}
        </h2>
      ) : (
        <div className={styles.imagesContainer}>
          {imageUrlArray &&
            imageUrlArray.map(
              (
                url: {
                  imageUrl: string | undefined
                  imageName: string | undefined
                  imageUrlSrcSet: { [key: string]: string } | undefined
                },
                i: number
              ) => {
                return <Picture url={url} key={i} />
              }
            )}
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
    imageUrl: string | undefined
    imageName: string | undefined
    imageUrlSrcSet: { [key: string]: string } | undefined
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
        const size: CustomImageSize = {
          name: 'big-image',
          width: 1080,
          height: 1080,
          quality: 90,
          format: 'webp',
          descriptors: [
            '200w',
            '300w',
            '400w',
            '500w',
            '600w',
            '700w',
            '800w',
            '900w',
            '1000w',
          ],
        }
        const imageUrlCreator = new ImageUrlCreator(settings, image, size)
        const imageUrl = imageUrlCreator.generateUrl()
        const imageUrlSrcSet = imageUrlCreator.toSrcset()?.srcsetUrlsHashMap
        const imageUrlSrcSetString =
          imageUrlCreator.toSrcset()?.srcsetUrlsString
        imageUrlArray.push({
          imageUrl: imageUrl,
          imageName: size?.name || '',
          imageUrlSrcSet: imageUrlSrcSet,
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
