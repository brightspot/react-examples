import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { client } from '../lib/client'
import { GetImagesDetailedDocument } from '../generated/graphql'
import Link from 'next/link'

import ImageUrlCreator from '../lib/imageUrlClass'
import { CustomImageConfiguration } from '../lib/types'

interface Props {
  imageUrl: string
  urlSrcSet: string
  errors: any
}

const ServerSide = ({ imageUrl, urlSrcSet, errors }: Props) => {
  if (errors) return <div>Error Occured</div>

  if (!imageUrl) {
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
          <h2>Image using Picture HTML Tag</h2>
          <div className={styles.pictureContainer}>
            <picture className={styles.picture}>
              <source srcSet={urlSrcSet} type="" />
              <img
                className={styles.picture}
                loading="eager"
                src={imageUrl}
                alt="example"
              />
            </picture>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [{ params: { ssr: 'ssr' } }], fallback: false }
}

export const getStaticProps: GetStaticProps = async () => {
  let imageUrl: string | null | undefined
  let urlSrcSet: string | null | undefined
  try {
    const { data } = await client.query({
      query: GetImagesDetailedDocument,
    })

    if (data) {
      const firstImage = data.Images.items[0]

      const ExampleSize = {
        name: 'example-large',
        width: 1000,
        height: 1500,
        quality: 90,
        format: 'webp',
        descriptors: ['350w', '550w', '750w', '1000w'],
        formatMappings: [],
      }

      const ExampleConfig: CustomImageConfiguration = {
        settings: {
          baseUrl: `http:${process.env.BASE_URL}/`,
          sharedSecret: process.env.SECRET!,
        },
        image: {
          originalUrl: firstImage?.imageFile?.publicUrl,
          publicUrl: firstImage?.imageFile?.publicUrl,
          contentType: firstImage?.imageFile?.contentType,
          filename: firstImage?.imageFile?.filename,
          width: firstImage?.imageFile?.width,
          height: firstImage?.imageFile?.height,
          exif: null,

          focus: {
            x: 0.13877872379128706,
            y: 0.9388419016719237,
          },
          crops: [
            {
              name: 'example-large',
              x: 0.002383708953857422,
              y: 6.328991481235626e-4,
              width: 0.7322958792958941,
              height: 0.40705596265338717,
            },
          ],
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
        },
        size: ExampleSize,
      }

      const imageUrlCreator = new ImageUrlCreator(
        ExampleConfig.settings,
        ExampleConfig.image,
        ExampleSize
      )
      imageUrl = imageUrlCreator.generateUrl()
      urlSrcSet = imageUrlCreator.toSrcset()?.srcsetUrlsString
    }
    return {
      props: {
        imageUrl,
        urlSrcSet,
      },
    }
  } catch (errors: any) {
    const props = { message: 'an error occurred' }
    console.log({ errors })
    return { props }
  }
}

export default ServerSide
