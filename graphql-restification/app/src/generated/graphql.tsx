export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Article = Content & Record_Interface & {
  __typename?: 'Article';
  _id?: Maybe<Scalars['ID']>;
  cms_content?: Maybe<Content_ObjectModificationCmsContentField>;
  headline?: Maybe<Scalars['String']>;
  subheadline?: Maybe<Scalars['String']>;
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

export type Query = {
  __typename?: 'Query';
  Article?: Maybe<Article>;
  _Entry?: Maybe<_Entry>;
};


export type QueryArticleArgs = {
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

export type _Entry = Article;

export type BrightspotQueryVariables = Exact<{
  path?: InputMaybe<Scalars['String']>;
}>;


export type BrightspotQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', headline?: string | null, subheadline?: string | null } | null };

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'Query', Article?: { __typename?: 'Article', headline?: string | null, subheadline?: string | null } | null };
