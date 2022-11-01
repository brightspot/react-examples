import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Image = {
  __typename?: 'Image'
  imageFile?: Maybe<ImageAttributes>
  title?: Maybe<Scalars['String']>
}

export type ImageImageFileArgs = {
  size?: InputMaybe<Scalars['String']>
}

export type ImageAltFormat = {
  __typename?: 'ImageAltFormat'
  name?: Maybe<Scalars['String']>
  src?: Maybe<Scalars['String']>
  srcSets: Array<ImageSrcSet>
  srcSetsRaw?: Maybe<Scalars['String']>
}

export type ImageAttributes = {
  __typename?: 'ImageAttributes'
  /** @deprecated Use 'size -> altFormats' or 'sizes -> altFormats' */
  altFormats: Array<ImageAltFormat>
  contentType?: Maybe<Scalars['String']>
  crops: Array<ImageCrop>
  editorSettings?: Maybe<ImageEditorSettings>
  edits?: Maybe<ImageEdits>
  filename?: Maybe<Scalars['String']>
  focus?: Maybe<ImageFocus>
  height?: Maybe<Scalars['Int']>
  publicUrl?: Maybe<Scalars['String']>
  size?: Maybe<ImageSize>
  sizes: Array<ImageSize>
  /** @deprecated Use 'size -> src' or 'sizes -> src' */
  src?: Maybe<Scalars['String']>
  /** @deprecated Use 'size -> srcSets' or 'sizes -> srcSets' */
  srcSets: Array<ImageSrcSet>
  /** @deprecated Use 'size -> srcSetsRaw' or 'sizes -> srcSetsRaw' */
  srcSetsRaw?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
}

export type ImageAttributesSizeArgs = {
  name?: InputMaybe<Scalars['String']>
}

export type ImageAttributesSizesArgs = {
  names?: InputMaybe<Array<Scalars['String']>>
}

export type ImageCrop = {
  __typename?: 'ImageCrop'
  height?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Float']>
  x?: Maybe<Scalars['Float']>
  y?: Maybe<Scalars['Float']>
}

export type ImageEditorSettings = {
  __typename?: 'ImageEditorSettings'
  baseUrl?: Maybe<Scalars['String']>
  sharedSecret?: Maybe<Scalars['String']>
}

export type ImageEdits = {
  __typename?: 'ImageEdits'
  brightness?: Maybe<Scalars['Float']>
  contrast?: Maybe<Scalars['Float']>
  flipH?: Maybe<Scalars['Boolean']>
  flipV?: Maybe<Scalars['Boolean']>
  grayscale?: Maybe<Scalars['Boolean']>
  invert?: Maybe<Scalars['Boolean']>
  rotate?: Maybe<Scalars['Int']>
  sepia?: Maybe<Scalars['Boolean']>
  sharpen?: Maybe<Scalars['Int']>
}

export type ImageFocus = {
  __typename?: 'ImageFocus'
  x?: Maybe<Scalars['Float']>
  y?: Maybe<Scalars['Float']>
}

export type ImageSize = {
  __typename?: 'ImageSize'
  altFormats: Array<ImageAltFormat>
  height?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  src?: Maybe<Scalars['String']>
  srcSets: Array<ImageSrcSet>
  srcSetsRaw?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
}

export type ImageSrcSet = {
  __typename?: 'ImageSrcSet'
  size?: Maybe<Scalars['String']>
  src?: Maybe<Scalars['String']>
}

export type Images = {
  __typename?: 'Images'
  items?: Maybe<Array<Maybe<Image>>>
  nextPage?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  Images?: Maybe<Images>
}

export type QueryImagesArgs = {
  page?: InputMaybe<Scalars['Int']>
}

export type GetImageBySizeNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>
}>

export type GetImageBySizeNameQuery = {
  __typename?: 'Query'
  Images?: {
    __typename?: 'Images'
    items?: Array<{
      __typename?: 'Image'
      title?: string | null
      imageFile?: {
        __typename?: 'ImageAttributes'
        contentType?: string | null
        filename?: string | null
        publicUrl?: string | null
        width?: number | null
        height?: number | null
        editorSettings?: {
          __typename?: 'ImageEditorSettings'
          baseUrl?: string | null
          sharedSecret?: string | null
        } | null
        size?: {
          __typename?: 'ImageSize'
          height?: number | null
          width?: number | null
          name?: string | null
        } | null
        crops: Array<{
          __typename?: 'ImageCrop'
          height?: number | null
          name?: string | null
          width?: number | null
          x?: number | null
          y?: number | null
        }>
        focus?: {
          __typename?: 'ImageFocus'
          x?: number | null
          y?: number | null
        } | null
        sizes: Array<{
          __typename?: 'ImageSize'
          name?: string | null
          width?: number | null
          height?: number | null
        }>
      } | null
    } | null> | null
  } | null
}

export type GetImageUrlBySizeNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>
}>

export type GetImageUrlBySizeNameQuery = {
  __typename?: 'Query'
  Images?: {
    __typename?: 'Images'
    items?: Array<{
      __typename?: 'Image'
      title?: string | null
      imageFile?: {
        __typename?: 'ImageAttributes'
        contentType?: string | null
        filename?: string | null
        size?: {
          __typename?: 'ImageSize'
          height?: number | null
          width?: number | null
          name?: string | null
          src?: string | null
        } | null
      } | null
    } | null> | null
  } | null
}

export type GetImagesQueryVariables = Exact<{ [key: string]: never }>

export type GetImagesQuery = {
  __typename?: 'Query'
  Images?: {
    __typename?: 'Images'
    items?: Array<{
      __typename?: 'Image'
      imageFile?: {
        __typename?: 'ImageAttributes'
        filename?: string | null
        sizes: Array<{
          __typename?: 'ImageSize'
          name?: string | null
          src?: string | null
          width?: number | null
          height?: number | null
        }>
      } | null
    } | null> | null
  } | null
}

export const GetImageBySizeNameDocument = gql`
  query GetImageBySizeName($name: String) {
    Images {
      items {
        title
        imageFile {
          editorSettings {
            baseUrl
            sharedSecret
          }
          size(name: $name) {
            height
            width
            name
          }
          crops {
            height
            name
            width
            x
            y
          }
          focus {
            x
            y
          }
          contentType
          filename
          publicUrl
          width
          height
          sizes {
            name
            width
            height
          }
        }
      }
    }
  }
`

/**
 * __useGetImageBySizeNameQuery__
 *
 * To run a query within a React component, call `useGetImageBySizeNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageBySizeNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageBySizeNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetImageBySizeNameQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetImageBySizeNameQuery,
    GetImageBySizeNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetImageBySizeNameQuery,
    GetImageBySizeNameQueryVariables
  >(GetImageBySizeNameDocument, options)
}
export function useGetImageBySizeNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetImageBySizeNameQuery,
    GetImageBySizeNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetImageBySizeNameQuery,
    GetImageBySizeNameQueryVariables
  >(GetImageBySizeNameDocument, options)
}
export type GetImageBySizeNameQueryHookResult = ReturnType<
  typeof useGetImageBySizeNameQuery
>
export type GetImageBySizeNameLazyQueryHookResult = ReturnType<
  typeof useGetImageBySizeNameLazyQuery
>
export type GetImageBySizeNameQueryResult = Apollo.QueryResult<
  GetImageBySizeNameQuery,
  GetImageBySizeNameQueryVariables
>
export const GetImageUrlBySizeNameDocument = gql`
  query GetImageUrlBySizeName($name: String) {
    Images {
      items {
        title
        imageFile {
          size(name: $name) {
            height
            width
            name
            src
          }
          contentType
          filename
        }
      }
    }
  }
`

/**
 * __useGetImageUrlBySizeNameQuery__
 *
 * To run a query within a React component, call `useGetImageUrlBySizeNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageUrlBySizeNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageUrlBySizeNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetImageUrlBySizeNameQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetImageUrlBySizeNameQuery,
    GetImageUrlBySizeNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetImageUrlBySizeNameQuery,
    GetImageUrlBySizeNameQueryVariables
  >(GetImageUrlBySizeNameDocument, options)
}
export function useGetImageUrlBySizeNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetImageUrlBySizeNameQuery,
    GetImageUrlBySizeNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetImageUrlBySizeNameQuery,
    GetImageUrlBySizeNameQueryVariables
  >(GetImageUrlBySizeNameDocument, options)
}
export type GetImageUrlBySizeNameQueryHookResult = ReturnType<
  typeof useGetImageUrlBySizeNameQuery
>
export type GetImageUrlBySizeNameLazyQueryHookResult = ReturnType<
  typeof useGetImageUrlBySizeNameLazyQuery
>
export type GetImageUrlBySizeNameQueryResult = Apollo.QueryResult<
  GetImageUrlBySizeNameQuery,
  GetImageUrlBySizeNameQueryVariables
>
export const GetImagesDocument = gql`
  query GetImages {
    Images {
      items {
        imageFile {
          filename
          sizes {
            name
            src
            width
            height
          }
        }
      }
    }
  }
`

/**
 * __useGetImagesQuery__
 *
 * To run a query within a React component, call `useGetImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetImagesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetImagesQuery, GetImagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetImagesQuery, GetImagesQueryVariables>(
    GetImagesDocument,
    options
  )
}
export function useGetImagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetImagesQuery,
    GetImagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetImagesQuery, GetImagesQueryVariables>(
    GetImagesDocument,
    options
  )
}
export type GetImagesQueryHookResult = ReturnType<typeof useGetImagesQuery>
export type GetImagesLazyQueryHookResult = ReturnType<
  typeof useGetImagesLazyQuery
>
export type GetImagesQueryResult = Apollo.QueryResult<
  GetImagesQuery,
  GetImagesQueryVariables
>
