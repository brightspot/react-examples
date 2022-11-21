import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { client } from '../lib/client'
import { GetImagesDetailedDocument } from '../generated/graphql'
import Link from 'next/link'

import ImageUrlCreator from '../lib/imageUrlClass'
import { CustomImage, CustomImageSize, Settings } from '../lib/types'

interface Props {
  imageUrlArray: {
    imageUrl: string | undefined
    imageName: string | undefined
    imageUrlSrcSet: { [key: string]: string } | undefined
  }[]
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
      <Link className={styles.link} href={'/'}>
        {' '}
        Return to Home Page
      </Link>
      <h1>Server Side Images</h1>
      {!imageUrlArray ? (
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
          {imageUrlArray.map(
            (
              url: {
                imageUrl: string | undefined
                imageName: string | undefined
                imageUrlSrcSet: { [key: string]: string } | undefined
              },
              i: number
            ) => {
              return (
                <picture key={i}>
                  <source
                    srcSet={url.imageUrlSrcSet?.['400w']}
                    media="(max-width: 360px)"
                  />
                  <source
                    srcSet={url.imageUrlSrcSet?.['500w']}
                    media="(max-width: 460px)"
                  />
                  <source
                    srcSet={url.imageUrlSrcSet?.['600w']}
                    media="(max-width: 560px)"
                  />
                  <source
                    srcSet={url.imageUrlSrcSet?.['600w']}
                    media="(max-width: 660px)"
                  />
                  <source
                    srcSet={url.imageUrlSrcSet?.['700w']}
                    media="(max-width: 760px)"
                  />
                  <source
                    srcSet={url.imageUrlSrcSet?.['800w']}
                    media="(max-width: 860px)"
                  />
                  <source
                    srcSet={url.imageUrlSrcSet?.['900w']}
                    media="(max-width: 960px)"
                  />
                  <source
                    srcSet={url.imageUrlSrcSet?.['1000w']}
                    media="(min-width: 970px)"
                  />
                  <img
                    src={url.imageUrl || ''}
                    alt={url.imageName}
                    className={styles.image}
                    height={1000}
                    width={1000}
                  />
                </picture>
              )
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
  } catch (errors: any) {
    const props = { message: 'an error occurred' }
    console.log({ errors })
    return { props }
  }
}

export default ServerSide
