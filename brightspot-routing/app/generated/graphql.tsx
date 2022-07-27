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

export type Article = Content & Record_Interface & {
  __typename?: 'Article';
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  headline?: Maybe<Scalars['String']>;
  section?: Maybe<Section>;
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Article_Section_Connection = {
  __typename?: 'Article_section_connection';
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
  Section_page_connection?: Maybe<Section_Page_Connection>;
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
};


export type PageSection_Page_ConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sort?: InputMaybe<Section_Sort>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count?: Maybe<Scalars['Long']>;
  hasNext?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Long']>;
};

export type Query = {
  __typename?: 'Query';
  Article?: Maybe<Article>;
  Page?: Maybe<Page>;
  Section?: Maybe<Section>;
  _Entry?: Maybe<_Entry>;
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
};


export type QuerySectionArgs = {
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
  Article_section_connection?: Maybe<Article_Section_Connection>;
  Section_page_connection?: Maybe<Section_Page_Connection>;
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
};


/** Represents a generic record. */
export type RecordArticle_Section_ConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sort?: InputMaybe<Article_Sort>;
};


/** Represents a generic record. */
export type RecordSection_Page_ConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sort?: InputMaybe<Section_Sort>;
};

/** Represents a generic record. */
export type Record_Interface = {
  _id?: Maybe<Scalars['ID']>;
};

export type Section = Content & Record_Interface & {
  __typename?: 'Section';
  Article_section_connection?: Maybe<Article_Section_Connection>;
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  name?: Maybe<Scalars['String']>;
  page?: Maybe<Page>;
  url?: Maybe<Scalars['String']>;
};


export type SectionArticle_Section_ConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sort?: InputMaybe<Article_Sort>;
};

export type Section_Page_Connection = {
  __typename?: 'Section_page_connection';
  items: Array<Section>;
  pageInfo?: Maybe<PageInfo>;
};

export type Section_Sort = {
  option: Section_Sort_Option;
  order?: InputMaybe<SortOrder>;
};

export enum Section_Sort_Option {
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

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type _Entry = Article | Page | Section;

export type GetArticleQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetArticleQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', headline?: string | null, text?: string | null } | null };

export type GetSectionsQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetSectionsQuery = { __typename?: 'Query', Page?: { __typename?: 'Page', Section_page_connection?: { __typename?: 'Section_page_connection', items: Array<{ __typename?: 'Section', name?: string | null, url?: string | null }> } | null } | null };

export type GetArticlesQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', Section?: { __typename?: 'Section', name?: string | null, Article_section_connection?: { __typename?: 'Article_section_connection', items: Array<{ __typename?: 'Article', url?: string | null, headline?: string | null }> } | null } | null };


export const GetArticleDocument = gql`
    query GetArticle($path: String = "") {
  Article(path: $path) {
    headline
    text
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
export const GetSectionsDocument = gql`
    query GetSections($path: String = "") {
  Page(path: $path) {
    Section_page_connection {
      items {
        name
        url
      }
    }
  }
}
    `;

/**
 * __useGetSectionsQuery__
 *
 * To run a query within a React component, call `useGetSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionsQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetSectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, options);
      }
export function useGetSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, options);
        }
export type GetSectionsQueryHookResult = ReturnType<typeof useGetSectionsQuery>;
export type GetSectionsLazyQueryHookResult = ReturnType<typeof useGetSectionsLazyQuery>;
export type GetSectionsQueryResult = Apollo.QueryResult<GetSectionsQuery, GetSectionsQueryVariables>;
export const GetArticlesDocument = gql`
    query GetArticles($path: String = "") {
  Section(path: $path) {
    name
    Article_section_connection {
      items {
        url
        headline
      }
    }
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;