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
  Long: any;
};

export type App = Content & Record_Interface & {
  __typename?: 'App';
  Page_app_connection?: Maybe<Page_App_Connection>;
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  title?: Maybe<Scalars['String']>;
};


export type AppPage_App_ConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sort?: InputMaybe<Page_Sort>;
};

export type Article = Content & Record_Interface & {
  __typename?: 'Article';
  _id?: Maybe<Scalars['ID']>;
  body?: Maybe<Scalars['String']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  headline?: Maybe<Scalars['String']>;
  page?: Maybe<Page>;
  url?: Maybe<Scalars['String']>;
};

export type Article_Page_Connection = {
  __typename?: 'Article_page_connection';
  items: Array<Article>;
  pageInfo?: Maybe<PageInfo>;
};

export type Article_Sort = {
  option: Article_Sort_Option;
  order?: InputMaybe<SortOrder>;
};

export enum Article_Sort_Option {
  AverageTimeOnPage = 'AVERAGE_TIME_ON_PAGE',
  Bounces = 'BOUNCES',
  BounceRate = 'BOUNCE_RATE',
  CalendarDate = 'CALENDAR_DATE',
  Date = 'DATE',
  Entrances = 'ENTRANCES',
  ExitRatePercent = 'EXIT_RATE_PERCENT',
  Label = 'LABEL',
  PageValue = 'PAGE_VALUE',
  PageViews = 'PAGE_VIEWS',
  PageViewsVsUniquePageViews = 'PAGE_VIEWS_VS_UNIQUE_PAGE_VIEWS',
  PublishDate = 'PUBLISH_DATE',
  Sessions = 'SESSIONS',
  UniquePageViews = 'UNIQUE_PAGE_VIEWS',
  UpdateDate = 'UPDATE_DATE'
}

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
  Article_page_connection?: Maybe<Article_Page_Connection>;
  _id?: Maybe<Scalars['ID']>;
  app?: Maybe<App>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


export type PageArticle_Page_ConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sort?: InputMaybe<Article_Sort>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count?: Maybe<Scalars['Long']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Long']>;
};

export type Page_App_Connection = {
  __typename?: 'Page_app_connection';
  items: Array<Page>;
  pageInfo?: Maybe<PageInfo>;
};

export type Page_Sort = {
  option: Page_Sort_Option;
  order?: InputMaybe<SortOrder>;
};

export enum Page_Sort_Option {
  AverageTimeOnPage = 'AVERAGE_TIME_ON_PAGE',
  Bounces = 'BOUNCES',
  BounceRate = 'BOUNCE_RATE',
  CalendarDate = 'CALENDAR_DATE',
  Date = 'DATE',
  Entrances = 'ENTRANCES',
  ExitRatePercent = 'EXIT_RATE_PERCENT',
  Label = 'LABEL',
  PageValue = 'PAGE_VALUE',
  PageViews = 'PAGE_VIEWS',
  PageViewsVsUniquePageViews = 'PAGE_VIEWS_VS_UNIQUE_PAGE_VIEWS',
  PublishDate = 'PUBLISH_DATE',
  Sessions = 'SESSIONS',
  UniquePageViews = 'UNIQUE_PAGE_VIEWS',
  UpdateDate = 'UPDATE_DATE'
}

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

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type _Entry = App | Article | Page;

export type GetAllPagesQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetAllPagesQuery = { __typename?: 'Query', App?: { __typename?: 'App', Page_app_connection?: { __typename?: 'Page_app_connection', items: Array<{ __typename?: 'Page', url?: string | null, name?: string | null, Article_page_connection?: { __typename?: 'Article_page_connection', items: Array<{ __typename?: 'Article', url?: string | null, headline?: string | null, body?: string | null, page?: { __typename?: 'Page', url?: string | null, name?: string | null } | null, cms_content?: { __typename?: 'Content_ObjectModificationCmsContentField', publishDate?: any | null } | null }> } | null }> } | null } | null };

export type GetArticleQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetArticleQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', headline?: string | null, body?: string | null } | null };

export type GetAllArticlesQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetAllArticlesQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', Article_page_connection?: { __typename?: 'Article_page_connection', items: Array<{ __typename?: 'Article', url?: string | null, headline?: string | null }> } | null } | null };


export const GetAllPagesDocument = gql`
    query GetAllPages($path: String = "") {
  App(path: $path) {
    Page_app_connection {
      items {
        url
        name
        Article_page_connection(sort: {option: PUBLISH_DATE, order: DESCENDING}) {
          items {
            page {
              url
              name
            }
            url
            headline
            body
            cms_content {
              publishDate
            }
          }
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
 *      path: // value for 'path'
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
export const GetArticleDocument = gql`
    query GetArticle($path: String = "") {
  Article(path: $path) {
    headline
    body
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
 *      path: // value for 'path'
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
    query GetAllArticles($path: String = "") {
  Page(path: $path) {
    Article_page_connection {
      items {
        url
        headline
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
 *      path: // value for 'path'
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