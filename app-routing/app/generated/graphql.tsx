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

export type Article = {
  __typename?: 'Article';
  body?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  page?: Maybe<Page>;
  publishDate?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type ArticleModelInput = {
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type Articles = {
  __typename?: 'Articles';
  articles?: Maybe<Array<Maybe<Article>>>;
};

export type Page = {
  __typename?: 'Page';
  articles?: Maybe<Array<Maybe<Article>>>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type PageEntry = Article | Articles | Page | Pages;

export type PageModelInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type Pages = {
  __typename?: 'Pages';
  pages?: Maybe<Array<Maybe<Page>>>;
};

export type Query = {
  __typename?: 'Query';
  Article?: Maybe<Article>;
  Articles?: Maybe<Articles>;
  Page?: Maybe<Page>;
  Pages?: Maybe<Pages>;
};


export type QueryArticleArgs = {
  model?: InputMaybe<ArticleModelInput>;
};


export type QueryPageArgs = {
  model?: InputMaybe<PageModelInput>;
};

export type GetArticleQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  headline?: InputMaybe<Scalars['String']>;
}>;


export type GetArticleQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', body?: string | null, headline?: string | null, publishDate?: string | null, slug?: string | null } | null };

export type GetAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllArticlesQuery = { __typename?: 'Query', Articles?: { __typename?: 'Articles', articles?: Array<{ __typename?: 'Article', slug?: string | null, headline?: string | null, publishDate?: string | null, page?: { __typename?: 'Page', name?: string | null, slug?: string | null } | null } | null> | null } | null };

export type GetPageQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetPageQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', name?: string | null, slug?: string | null, articles?: Array<{ __typename?: 'Article', headline?: string | null, publishDate?: string | null, slug?: string | null, page?: { __typename?: 'Page', name?: string | null, slug?: string | null } | null } | null> | null } | null };

export type GetAllPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPagesQuery = { __typename?: 'Query', Pages?: { __typename?: 'Pages', pages?: Array<{ __typename?: 'Page', name?: string | null, slug?: string | null, articles?: Array<{ __typename?: 'Article', slug?: string | null, headline?: string | null, publishDate?: string | null, page?: { __typename?: 'Page', name?: string | null, slug?: string | null } | null } | null> | null } | null> | null } | null };


export const GetArticleDocument = gql`
    query GetArticle($slug: String, $headline: String) {
  Article(model: {slug: $slug, headline: $headline}) {
    body
    headline
    publishDate
    slug
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
 *      slug: // value for 'slug'
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
export const GetAllArticlesDocument = gql`
    query GetAllArticles {
  Articles {
    articles {
      slug
      headline
      publishDate
      page {
        name
        slug
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
export const GetPageDocument = gql`
    query GetPage($slug: String) {
  Page(model: {slug: $slug}) {
    name
    slug
    articles {
      headline
      publishDate
      slug
      page {
        name
        slug
      }
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
 *      slug: // value for 'slug'
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
export const GetAllPagesDocument = gql`
    query GetAllPages {
  Pages {
    pages {
      name
      slug
      articles {
        slug
        headline
        publishDate
        page {
          name
          slug
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllPagesQuery__
 *
 * To run a query within a React component, call `useGetAllPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPagesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPagesQuery, GetAllPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPagesQuery, GetAllPagesQueryVariables>(GetAllPagesDocument, options);
      }
export function useGetAllPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPagesQuery, GetAllPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPagesQuery, GetAllPagesQueryVariables>(GetAllPagesDocument, options);
        }
export type GetAllPagesQueryHookResult = ReturnType<typeof useGetAllPagesQuery>;
export type GetAllPagesLazyQueryHookResult = ReturnType<typeof useGetAllPagesLazyQuery>;
export type GetAllPagesQueryResult = Apollo.QueryResult<GetAllPagesQuery, GetAllPagesQueryVariables>;