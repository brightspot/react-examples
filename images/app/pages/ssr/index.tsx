import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { client } from '../../lib/client'
import { GetImagesDetailedDocument } from '../../generated/graphql'
import Image from 'next/image'
import Link from 'next/link'

import ImageUrl from '../../lib/imageUrl'

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
  if (errors) return <div>Error Occured</div>

  if (imageUrlArray.length === 0) {
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
                  alt={item.size.name}
                  width={item.size.width}
                  height={item.size.height}
                />
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const imageUrlArray: Object[] = []
  let size
  try {
    const { data } = await client.query({
      query: GetImagesDetailedDocument,
    })

    if (data) {
      console.log('DATA !!: ', data)
      const firstImage = data.Images.items[0]
      console.log('FIRST IMAGE !!: ', firstImage)

      const ExampleConfig = {
        config: {
          imageURL: {
            baseUrl: `http:${firstImage?.imageFile?.editorSettings?.baseUrl}/`,
            sharedSecret: firstImage?.imageFile?.editorSettings?.sharedSecret,
          },
        },
        image: {
          publicUrl: firstImage?.imageFile?.publicUrl,
          contentType: firstImage?.imageFile?.contentType,
          filename: firstImage?.imageFile?.filename,
          width: firstImage?.imageFile?.width,
          height: firstImage?.imageFile?.height,
          focus: {
            x: firstImage?.imageFile?.focus?.x,
            y: firstImage?.imageFile?.focus?.y,
          },
          crops: [
            {
              name: firstImage?.imageFile?.crops[0]?.name,
              x: firstImage?.imageFile?.crops[0]?.x,
              y: firstImage?.imageFile?.crops[0]?.y,
              width: firstImage?.imageFile?.crops[0]?.width,
              height: firstImage?.imageFile?.crops[0]?.height,
            },
          ],
        },
        size: {
          width: firstImage?.imageFile?.size?.width,
          height: firstImage?.imageFile?.size?.height,
          internalName: firstImage?.imageFile?.fileName,
        },
        sizes: firstImage?.imageFile?.sizes,
        //   sizes: [
        //   {
        //       width: 112,
        //       height: 112,
        //       internalName: 'thumbnail'
        //   }
        // ]
      }
      console.log('SIZES', firstImage?.imageFile?.sizes[0])
      const Config = ExampleConfig.config

      const Image = ExampleConfig.image
      const Sizes = ExampleConfig.sizes
      size = ExampleConfig.size

      Sizes.forEach((size: any) => {
        const resizedUrl = ImageUrl.generateUrl(Config.imageURL, Image, size)
        imageUrlArray.push({ resizedUrl, size })
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
