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
};

export type App = {
  __typename?: 'App';
  allArticles?: Maybe<Array<Maybe<Article>>>;
  allPages?: Maybe<Array<Maybe<Page>>>;
  title?: Maybe<Scalars['String']>;
};

export type AppModelInput = {
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Article = {
  __typename?: 'Article';
  body?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  page?: Maybe<Page>;
  publishDate?: Maybe<Scalars['String']>;
};

export type ArticleModelInput = {
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Page = {
  __typename?: 'Page';
  app?: Maybe<App>;
  articles?: Maybe<Array<Maybe<Article>>>;
  name?: Maybe<Scalars['String']>;
  pageId?: Maybe<Scalars['String']>;
};

export type PageEntry = App | Article | Page;

export type PageModelInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  App?: Maybe<App>;
  Article?: Maybe<Article>;
  Page?: Maybe<Page>;
};


export type QueryAppArgs = {
  model?: InputMaybe<AppModelInput>;
};


export type QueryArticleArgs = {
  model?: InputMaybe<ArticleModelInput>;
};


export type QueryPageArgs = {
  model?: InputMaybe<PageModelInput>;
};

export type GetAppQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
}>;


export type GetAppQuery = { __typename?: 'Query', App?: { __typename?: 'App', title?: string | null, allPages?: Array<{ __typename?: 'Page', name?: string | null } | null> | null } | null };

export type GetAppArticlesQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
}>;


export type GetAppArticlesQuery = { __typename?: 'Query', App?: { __typename?: 'App', allArticles?: Array<{ __typename?: 'Article', headline?: string | null, publishDate?: string | null, page?: { __typename?: 'Page', name?: string | null } | null } | null> | null } | null };

export type GetArticleQueryVariables = Exact<{
  headline?: InputMaybe<Scalars['String']>;
}>;


export type GetArticleQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', body?: string | null, headline?: string | null, publishDate?: string | null } | null };

export type GetPageQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type GetPageQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', name?: string | null, articles?: Array<{ __typename?: 'Article', headline?: string | null, publishDate?: string | null } | null> | null } | null };


export const GetAppDocument = gql`
    query GetApp($title: String) {
  App(model: {title: $title}) {
    title
    allPages {
      name
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
 *      title: // value for 'title'
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
export const GetAppArticlesDocument = gql`
    query GetAppArticles($title: String) {
  App(model: {title: $title}) {
    allArticles {
      headline
      publishDate
      page {
        name
      }
    }
  }
}
    `;

/**
 * __useGetAppArticlesQuery__
 *
 * To run a query within a React component, call `useGetAppArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppArticlesQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetAppArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetAppArticlesQuery, GetAppArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppArticlesQuery, GetAppArticlesQueryVariables>(GetAppArticlesDocument, options);
      }
export function useGetAppArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppArticlesQuery, GetAppArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppArticlesQuery, GetAppArticlesQueryVariables>(GetAppArticlesDocument, options);
        }
export type GetAppArticlesQueryHookResult = ReturnType<typeof useGetAppArticlesQuery>;
export type GetAppArticlesLazyQueryHookResult = ReturnType<typeof useGetAppArticlesLazyQuery>;
export type GetAppArticlesQueryResult = Apollo.QueryResult<GetAppArticlesQuery, GetAppArticlesQueryVariables>;
export const GetArticleDocument = gql`
    query GetArticle($headline: String) {
  Article(model: {headline: $headline}) {
    body
    headline
    publishDate
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
 *      headline: // value for 'headline'
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
    query GetPage($name: String) {
  Page(model: {name: $name}) {
    name
    articles {
      headline
      publishDate
    }
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
 *      name: // value for 'name'
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