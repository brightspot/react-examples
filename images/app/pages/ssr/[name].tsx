import { GetServerSideProps } from 'next'

import { client } from '../../lib/client'
import { GetImageBySizeNameDocument } from '../../generated/graphql'
import Image from 'next/image'

import ImageUrl from '../../lib/imageUrl'

interface Props {
  imageUrl: string
  size: {
    width: number
    height: number
    internalName: string
  }
  errors: any
}

const ServerSideImage = ({ imageUrl, size, errors }: Props) => {
  if (errors)
    return (
      <pre>
        <code>{JSON.stringify(errors, null, 4)}</code>
      </pre>
    )

  if (!imageUrl) {
    return (
      <div>
        <div>404</div>
      </div>
    )
  }

  return (
    <div>
      <h1>Server Side Rendered Image</h1>
      <Image
        src={imageUrl}
        alt={'sample image'}
        width={size?.width}
        height={size?.height}
        priority
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
        name: context.query.name || '',
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
          internalName: 'portrait',
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
      size = ExampleConfig.size

      console.log({ Config, Image, size })
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

export default ServerSideImage
