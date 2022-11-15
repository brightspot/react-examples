import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { client } from '../lib/client'
import {
  GetImagesDetailedDocument,
  ImageSize,
  ImageSrcSet,
} from '../generated/graphql'
import Link from 'next/link'

import { generateUrl } from '../lib/imageUrl'
import { CustomImageConfiguration, CustomImageSize } from '../lib/config'

interface Props {
  imageUrlArray: any
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Link className={styles.link} href={'/'}>
            {' '}
            Return to Home Page
          </Link>
          <h1>Server Side Rendered Images</h1>
          {imageUrlArray?.map((item: any, i: number) => {
            if (!item.size?.height || !item?.size?.width) {
              return <div key={i}>No height or width provided for image</div>
            } else if (item?.size?.height && item?.size?.width) {
              return (
                <>
                  <h2>{item.size.name}</h2>
                  <div className={styles.pictureContainer}>
                    <picture>
                      {item.size.name !== 'example-large' && (
                        <source
                          srcSet={
                            item.resizedUrlsObject.srcsetUrls
                              .srcSetUrlsString || ''
                          }
                          type=""
                        />
                      )}
                      {item.size.name === 'example-large' && (
                        <>
                          <source
                            media="(max-width: 775px)"
                            srcSet={
                              item.resizedUrlsObject.srcsetUrls
                                .srcSetUrlsHashMap['350w'] || ''
                            }
                            type=""
                            width={350}
                            height={525}
                          />
                          <source
                            media="(max-width: 1000px)"
                            srcSet={
                              item.resizedUrlsObject.srcsetUrls
                                .srcSetUrlsHashMap['750w'] || ''
                            }
                            type=""
                            width={750}
                            height={1125}
                          />
                          <source
                            media="(min-width: 1000px)"
                            srcSet={
                              item.resizedUrlsObject.srcsetUrls
                                .srcSetUrlsHashMap['1000w'] || ''
                            }
                            type=""
                            width={1000}
                            height={1500}
                          />
                        </>
                      )}

                      <img
                        loading="eager"
                        src={item.resizedUrlsObject.mainUrl}
                        alt={item?.size?.name || ''}
                      />
                    </picture>
                  </div>
                </>
              )
            }
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
  const imageUrlArray: any = []
  try {
    const { data } = await client.query({
      query: GetImagesDetailedDocument,
    })

    if (data) {
      const firstImage = data.Images.items[0]
      const ExampleConfig: CustomImageConfiguration = {
        settings: {
          baseUrl: `http:${firstImage?.imageFile?.editorSettings?.baseUrl}/`,
          sharedSecret: firstImage?.imageFile?.editorSettings?.sharedSecret,
        },
        image: {
          originalUrl: firstImage?.imageFile?.publicUrl,
          publicUrl: firstImage?.imageFile?.publicUrl,
          contentType: firstImage?.imageFile?.contentType,
          filename: firstImage?.imageFile?.filename,
          width: firstImage?.imageFile?.width,
          height: firstImage?.imageFile?.height,
          // exif: undefined,

          focus: {
            x: firstImage?.imageFile?.focus?.x,
            y: firstImage?.imageFile?.focus?.y,
          },
          crops: [
            // {
            //   name: "example-small",
            //   x: 0.3943428866834526,
            //   y: 0.20939311444998746,
            //   width: 0.2335226771343185,
            //   height:0.15568178475621236
            // },
            // {
            //   name: "portrait",
            //   x: 0.33544695175797834,
            //   y:0.6759263117359046,
            //   width: 0.2836468695225539,
            //   height:0.2102359720244745
            // },
            // {
            //   height: 0.19189765726077332,
            //   name: "thumbnail",
            //   width:  0.23868069982832404,
            //   x: 0.4262629709426005,
            //   y:  0.7771334783651267,
            // },
            // {
            //   height: firstImage?.imageFile?.crops[0]?.height,
            //   name: firstImage?.imageFile?.crops[0]?.name,
            //   width: firstImage?.imageFile?.crops[0]?.width,
            //   x: firstImage?.imageFile?.crops[0]?.x,
            //   y: firstImage?.imageFile?.crops[0]?.y,
            // },
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
      }

      const ExampleSizes: CustomImageSize[] = []
      firstImage.imageFile.sizes.forEach((size: ImageSize) => {
        const srcSets = size.srcSets.map((srcSet: ImageSrcSet) => {
          return srcSet.size
        })

        const sizeObj: CustomImageSize = {
          name: size?.name,
          width: size?.width,
          height: size?.height,
          quality: 90,
          format: 'webp',
          descriptors: srcSets || [],
          formatMappings: [],
        }
        ExampleSizes.push(sizeObj)
      })

      ExampleSizes.forEach((size: CustomImageSize, i: number) => {
        const resizedUrlsObject: any = generateUrl(
          ExampleConfig.settings,
          ExampleConfig.image,
          size
        )
        imageUrlArray.push({ resizedUrlsObject, size })
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
