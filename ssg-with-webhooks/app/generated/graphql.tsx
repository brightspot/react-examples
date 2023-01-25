import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: any;
};

export type AllArticles = {
  __typename?: 'AllArticles';
  articles?: Maybe<Array<Maybe<Article>>>;
};

export type AllSections = {
  __typename?: 'AllSections';
  sections?: Maybe<Array<Maybe<Section>>>;
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<Author>;
  body?: Maybe<Scalars['String']>;
  directoryData?: Maybe<DirectoryData>;
  headline?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  publishDate?: Maybe<Scalars['Float']>;
  section?: Maybe<Section>;
};

export type ArticleModelInput = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};

export type Author = {
  __typename?: 'Author';
  name?: Maybe<Scalars['String']>;
};

export type Directory = {
  __typename?: 'Directory';
  path?: Maybe<Scalars['String']>;
};

export type DirectoryData = {
  __typename?: 'DirectoryData';
  paths?: Maybe<Array<Maybe<DirectoryPath>>>;
};

export type DirectoryModelInput = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};

export type DirectoryPath = {
  __typename?: 'DirectoryPath';
  isRedirect?: Maybe<Scalars['Boolean']>;
  path?: Maybe<Scalars['String']>;
};

export type PreviewInput = {
  /** A number value representing the milliseconds since the standard base time known as "the epoch", namely January 1, 1970, 00:00:00 GMT */
  date?: InputMaybe<Scalars['Long']>;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  AllArticles?: Maybe<AllArticles>;
  AllSections?: Maybe<AllSections>;
  Article?: Maybe<Article>;
  Directory?: Maybe<Directory>;
  Section?: Maybe<Section>;
};


export type QueryArticleArgs = {
  model?: InputMaybe<ArticleModelInput>;
  preview?: InputMaybe<PreviewInput>;
};


export type QueryDirectoryArgs = {
  model?: InputMaybe<DirectoryModelInput>;
  preview?: InputMaybe<PreviewInput>;
};


export type QuerySectionArgs = {
  model?: InputMaybe<SectionModelInput>;
  preview?: InputMaybe<PreviewInput>;
};

export type Section = {
  __typename?: 'Section';
  articles?: Maybe<Array<Maybe<Article>>>;
  directoryData?: Maybe<DirectoryData>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type SectionModelInput = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};

export type GetAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllArticlesQuery = { __typename?: 'Query', AllArticles?: { __typename?: 'AllArticles', articles?: Array<{ __typename?: 'Article', path?: string | null, headline?: string | null, body?: string | null, publishDate?: number | null, section?: { __typename?: 'Section', path?: string | null, name?: string | null } | null, directoryData?: { __typename?: 'DirectoryData', paths?: Array<{ __typename?: 'DirectoryPath', path?: string | null, isRedirect?: boolean | null } | null> | null } | null } | null> | null } | null };

export type GetAllPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPathsQuery = { __typename?: 'Query', AllSections?: { __typename?: 'AllSections', sections?: Array<{ __typename?: 'Section', path?: string | null, directoryData?: { __typename?: 'DirectoryData', paths?: Array<{ __typename?: 'DirectoryPath', path?: string | null } | null> | null } | null } | null> | null } | null, AllArticles?: { __typename?: 'AllArticles', articles?: Array<{ __typename?: 'Article', path?: string | null, directoryData?: { __typename?: 'DirectoryData', paths?: Array<{ __typename?: 'DirectoryPath', path?: string | null } | null> | null } | null } | null> | null } | null };

export type GetAllSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSectionsQuery = { __typename?: 'Query', AllSections?: { __typename?: 'AllSections', sections?: Array<{ __typename?: 'Section', path?: string | null, name?: string | null, directoryData?: { __typename?: 'DirectoryData', paths?: Array<{ __typename?: 'DirectoryPath', path?: string | null, isRedirect?: boolean | null } | null> | null } | null } | null> | null } | null };

export type GetContentQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetContentQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', path?: string | null, headline?: string | null, body?: string | null, publishDate?: number | null, section?: { __typename?: 'Section', path?: string | null, name?: string | null } | null, directoryData?: { __typename?: 'DirectoryData', paths?: Array<{ __typename?: 'DirectoryPath', path?: string | null, isRedirect?: boolean | null } | null> | null } | null } | null, Section?: { __typename?: 'Section', path?: string | null, name?: string | null, directoryData?: { __typename?: 'DirectoryData', paths?: Array<{ __typename?: 'DirectoryPath', path?: string | null, isRedirect?: boolean | null } | null> | null } | null, articles?: Array<{ __typename?: 'Article', path?: string | null, headline?: string | null, body?: string | null, publishDate?: number | null, directoryData?: { __typename?: 'DirectoryData', paths?: Array<{ __typename?: 'DirectoryPath', path?: string | null, isRedirect?: boolean | null } | null> | null } | null } | null> | null } | null };


export const GetAllArticlesDocument = gql`
    query GetAllArticles {
  AllArticles {
    articles {
      path
      headline
      body
      publishDate
      section {
        path
        name
      }
      directoryData {
        paths {
          path
          isRedirect
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllArticlesQuery__
 *
 * To run a query within a React component, call `useGetAllArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, options);
      }
export function useGetAllArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, options);
        }
export type GetAllArticlesQueryHookResult = ReturnType<typeof useGetAllArticlesQuery>;
export type GetAllArticlesLazyQueryHookResult = ReturnType<typeof useGetAllArticlesLazyQuery>;
export type GetAllArticlesQueryResult = Apollo.QueryResult<GetAllArticlesQuery, GetAllArticlesQueryVariables>;
export const GetAllPathsDocument = gql`
    query GetAllPaths {
  AllSections {
    sections {
      directoryData {
        paths {
          path
        }
      }
      path
    }
  }
  AllArticles {
    articles {
      directoryData {
        paths {
          path
        }
      }
      path
    }
  }
}
    `;

/**
 * __useGetAllPathsQuery__
 *
 * To run a query within a React component, call `useGetAllPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPathsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPathsQuery, GetAllPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPathsQuery, GetAllPathsQueryVariables>(GetAllPathsDocument, options);
      }
export function useGetAllPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPathsQuery, GetAllPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPathsQuery, GetAllPathsQueryVariables>(GetAllPathsDocument, options);
        }
export type GetAllPathsQueryHookResult = ReturnType<typeof useGetAllPathsQuery>;
export type GetAllPathsLazyQueryHookResult = ReturnType<typeof useGetAllPathsLazyQuery>;
export type GetAllPathsQueryResult = Apollo.QueryResult<GetAllPathsQuery, GetAllPathsQueryVariables>;
export const GetAllSectionsDocument = gql`
    query GetAllSections {
  AllSections {
    sections {
      path
      name
      directoryData {
        paths {
          path
          isRedirect
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllSectionsQuery__
 *
 * To run a query within a React component, call `useGetAllSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSectionsQuery, GetAllSectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSectionsQuery, GetAllSectionsQueryVariables>(GetAllSectionsDocument, options);
      }
export function useGetAllSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSectionsQuery, GetAllSectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSectionsQuery, GetAllSectionsQueryVariables>(GetAllSectionsDocument, options);
        }
export type GetAllSectionsQueryHookResult = ReturnType<typeof useGetAllSectionsQuery>;
export type GetAllSectionsLazyQueryHookResult = ReturnType<typeof useGetAllSectionsLazyQuery>;
export type GetAllSectionsQueryResult = Apollo.QueryResult<GetAllSectionsQuery, GetAllSectionsQueryVariables>;
export const GetContentDocument = gql`
    query GetContent($path: String) {
  Article(model: {path: $path}) {
    path
    headline
    body
    publishDate
    section {
      path
      name
    }
    directoryData {
      paths {
        path
        isRedirect
      }
    }
  }
  Section(model: {path: $path}) {
    path
    name
    directoryData {
      paths {
        path
        isRedirect
      }
    }
    articles {
      path
      headline
      body
      publishDate
      directoryData {
        paths {
          path
          isRedirect
        }
      }
    }
  }
}
    `;

/**
 * __useGetContentQuery__
 *
 * To run a query within a React component, call `useGetContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetContentQuery(baseOptions?: Apollo.QueryHookOptions<GetContentQuery, GetContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContentQuery, GetContentQueryVariables>(GetContentDocument, options);
      }
export function useGetContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContentQuery, GetContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContentQuery, GetContentQueryVariables>(GetContentDocument, options);
        }
export type GetContentQueryHookResult = ReturnType<typeof useGetContentQuery>;
export type GetContentLazyQueryHookResult = ReturnType<typeof useGetContentLazyQuery>;
export type GetContentQueryResult = Apollo.QueryResult<GetContentQuery, GetContentQueryVariables>;