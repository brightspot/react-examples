import type { NextPage, GetServerSideProps } from 'next'
import { client } from '../lib/client'
import { GetImageBySizeNameDocument } from '../generated/graphql'
import Image from 'next/image'

import ImageUrl from '../lib/imageUrl'

import styles from '../styles/Home.module.css'

interface Props {
  imageUrl: string
  size: {
    width: number
    height: number
    internalName: string
  }
  errors: any
}

const Home: NextPage<Props> = ({ imageUrl, size, errors }: Props) => {
  if (errors)
    return (
      <pre>
        <code>{JSON.stringify(errors, null, 4)}</code>
      </pre>
    )

  if (!imageUrl) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>404</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>Images</h1>
      <Image
        src={imageUrl}
        alt={'sample image'}
        width={size?.width}
        height={size?.height}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let imageUrl
  let size
  try {
    const { data } = await client.query({
      query: GetImageBySizeNameDocument,
      variables: {
        name: 'portrait',
      },
    })

    if (data) {
      const firstImage = data.Images.items[0]

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
          width: firstImage?.imageFile?.size?.width,
          height: firstImage?.imageFile?.size?.height,
          focus: {
            x: firstImage?.imageFile?.focus?.x,
            y: firstImage?.imageFile?.focus?.y,
          },
          crops: [
            {
              name: 'portrait',
              // x: firstImage?.imageFile?.focus?.x,
              // y: firstImage?.imageFile?.focus?.y,
              // width: 0.24245472837022133,
              // height: 0.7220543806646526
            },
          ],
        },
        size: {
          width: firstImage?.imageFile?.size?.width,
          height: firstImage?.imageFile?.size?.height,
          internalName: 'portrait',
        },
        //   sizes: [
        //   {
        //       width: 112,
        //       height: 112,
        //       internalName: 'thumbnail'
        //   }
        // ]
      }

      const Config = ExampleConfig.config

      const Image = ExampleConfig.image
      size = ExampleConfig.size
      imageUrl = ImageUrl.generateUrl(Config.imageURL, Image, size)
    }

    return {
      props: {
        imageUrl,
        size,
      },
    }
  } catch (errors: any) {
    const props = {
      errors: {
        graphQLErrors: errors.graphQLErrors,
        networkError:
          {
            name: errors.networkError?.name,
            statusCode: errors.networkError?.statusCode,
            result: errors.networkError?.result,
          } && errors.networkError,
      },
    }

    return { props }
  }
}

export default Home
