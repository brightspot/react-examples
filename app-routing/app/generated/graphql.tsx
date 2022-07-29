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
  Date: any;
};

export type App = Content & Record_Interface & {
  __typename?: 'App';
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  page?: Maybe<Page>;
  title?: Maybe<Scalars['String']>;
};

export type Article = Content & Record_Interface & {
  __typename?: 'Article';
  _id?: Maybe<Scalars['ID']>;
  app?: Maybe<App>;
  body?: Maybe<Scalars['String']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  headline?: Maybe<Scalars['String']>;
  page?: Maybe<Page>;
};

/** Represents a generic content. */
export type Content = {
  _id?: Maybe<Scalars['ID']>;
};

export type Content_ObjectModificationCmsContentField = {
  __typename?: 'Content_ObjectModificationCmsContentField';
  publishDate?: Maybe<Scalars['Date']>;
  updateDate?: Maybe<Scalars['Date']>;
};

export type Page = Content & Record_Interface & {
  __typename?: 'Page';
  _id?: Maybe<Scalars['ID']>;
  app?: Maybe<App>;
  article?: Maybe<Article>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  App?: Maybe<App>;
  Article?: Maybe<Article>;
  Page?: Maybe<Page>;
  _Entry?: Maybe<_Entry>;
};


export type QueryAppArgs = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};


export type Query_EntryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};

/** Represents a generic record. */
export type Record = Record_Interface & {
  __typename?: 'Record';
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
};

/** Represents a generic record. */
export type Record_Interface = {
  _id?: Maybe<Scalars['ID']>;
};

export type _Entry = App | Article | Page;

export type GetAppQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetAppQuery = { __typename?: 'Query', App?: { __typename?: 'App', title?: string | null, page?: { __typename?: 'Page', title?: string | null, _id?: string | null, article?: { __typename?: 'Article', body?: string | null, headline?: string | null, _id?: string | null } | null } | null } | null };

export type GetArticleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetArticleQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', headline?: string | null, body?: string | null, _id?: string | null } | null };

export type GetPageQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetPageQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', title?: string | null, _id?: string | null } | null };


export const GetAppDocument = gql`
    query GetApp($path: String = "") {
  App(path: $path) {
    title
    page {
      title
      _id
      article {
        body
        headline
        _id
      }
    }
  }
}
    `;

/**
 * __useGetAppQuery__
 *
 * To run a query within a React component, call `useGetAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetAppQuery(baseOptions?: Apollo.QueryHookOptions<GetAppQuery, GetAppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppQuery, GetAppQueryVariables>(GetAppDocument, options);
      }
export function useGetAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppQuery, GetAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppQuery, GetAppQueryVariables>(GetAppDocument, options);
        }
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>;
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>;
export type GetAppQueryResult = Apollo.QueryResult<GetAppQuery, GetAppQueryVariables>;
export const GetArticleDocument = gql`
    query GetArticle($id: ID = "") {
  Article(id: $id) {
    headline
    body
    _id
  }
}
    `;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArticleQuery(baseOptions?: Apollo.QueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
      }
export function useGetArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
        }
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<typeof useGetArticleLazyQuery>;
export type GetArticleQueryResult = Apollo.QueryResult<GetArticleQuery, GetArticleQueryVariables>;
export const GetPageDocument = gql`
    query GetPage($id: ID = "") {
  Page(id: $id) {
    title
    _id
  }
}
    `;

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPageQuery(baseOptions?: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(GetPageDocument, options);
      }
export function useGetPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(GetPageDocument, options);
        }
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>;
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>;
export type GetPageQueryResult = Apollo.QueryResult<GetPageQuery, GetPageQueryVariables>;