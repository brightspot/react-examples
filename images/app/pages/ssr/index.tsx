import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { client } from '../../lib/client'
import { GetImagesDetailedDocument } from '../../generated/graphql'
import Image from 'next/image'
import Link from 'next/link'

import CustomUrlImage from '../../lib/imageUrl'
import {CustomImageInterface, CustomImageSizeInterface} from '../../lib/imageUrl'
interface Props {
  imageUrlArray: Object[]
  size: {
    width: number
    height: number
    internalName: string
  }
  errors: any
}

const ServerSide = ({ imageUrlArray, errors }: Props) => {
  console.log({ imageUrlArray })
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Link href={'/'}> Return to Home Page</Link>
          <h1>Server Side Rendered Images</h1>
          {imageUrlArray?.map((item: any, i: number) => {
            return (
              <Link
                href={{
                  pathname: `/ssr/${item?.size?.name}`,
                  query: {
                    url: item.resizedUrl,
                    height: item.size.height,
                    width: item.size.width,
                  },
                }}
                key={i}
              >
                <Image
                  src={item.resizedUrl}
                  alt={item.size?.name}
                  width={item.size?.width}
                  height={item.size?.height}
                />
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const imageUrlArray: Object[] = []
  try {
    const { data } = await client.query({
      query: GetImagesDetailedDocument,
    })

    if (data) {
      const firstImage = data.Images.items[0]
      const ExampleConfig:CustomImageInterface = {
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
          metadata: undefined,

          focus: {
            x: firstImage?.imageFile?.focus?.x,
            y: firstImage?.imageFile?.focus?.y,

          },
          crops: [
            {
              height:  0.18432103915629056,
              name: "example-small",
              width: 0.23021697790620688,
              x: 0.6348151482620175,
              y: 0.7454132581838897,
            },
            {
              height: 0.19189765726077332,
              name: "thumbnail",
              width:  0.23868069982832404,
              x: 0.4262629709426005,
              y:  0.7771334783651267,
            },
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
            rotate:  firstImage?.imageFile?.edits?.rotate,
            sepia: firstImage?.imageFile?.edits?.sepia,
            sharpen: firstImage?.imageFile?.edits?.sharpen,
          }
        },
      }

      const ExampleSize: CustomImageSizeInterface = {
          name: firstImage?.imageFile?.filename,
          width: firstImage?.imageFile?.size?.width,
          height: firstImage?.imageFile?.size?.height,
          // maximumWidth: TODO: confirm if still needed since not in GraphQL Schema,
          // maximumHeight: TODO: confirm if still needed since not in GraphQL Schema,
          quality: 90,
          format: "webp"
      }

      // const ExampleSizes: CustomImageSizeInterface[] = firstImage?.imageFile?.sizes
     
      const imageUrl = new CustomUrlImage(ExampleConfig.settings, ExampleConfig.image)
      const resizedUrl = imageUrl.generateUrl(ExampleSize)
      imageUrlArray.push({ resizedUrl, ExampleSize })
      // ExampleSizes.forEach((size: CustomImageSizeInterface, i: number) => {
      //   const resizedUrl = imageUrl.generateUrl(size)// this is right
      //   imageUrlArray.push({ resizedUrl, size })
      // })
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
