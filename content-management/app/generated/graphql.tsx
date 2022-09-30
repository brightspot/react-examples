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
  DiffId: any;
  JsonString: any;
  Long: any;
  RefId: any;
  ToolUser: any;
  URL: any;
  Upload: any;
};

export type Globals = {
  __typename?: 'Globals';
  com_psddev_cms_db_BulkUploadDraft?: Maybe<Com_Psddev_Cms_Db_BulkUploadDraft>;
  com_psddev_cms_db_ContentTemplateSource?: Maybe<Com_Psddev_Cms_Db_ContentTemplateSource>;
  com_psddev_cms_db_Content_ObjectModification?: Maybe<Com_Psddev_Cms_Db_Content_ObjectModification>;
  com_psddev_cms_db_Directory_Data?: Maybe<Com_Psddev_Cms_Db_Directory_Data>;
  com_psddev_cms_db_Directory_ObjectModification?: Maybe<Com_Psddev_Cms_Db_Directory_ObjectModification>;
  com_psddev_cms_db_Draft_NameData?: Maybe<Com_Psddev_Cms_Db_Draft_NameData>;
  com_psddev_cms_db_ExternalItemImported?: Maybe<Com_Psddev_Cms_Db_ExternalItemImported>;
  com_psddev_cms_db_SiteCopierObjectModification?: Maybe<Com_Psddev_Cms_Db_SiteCopierObjectModification>;
  com_psddev_cms_db_Site_ObjectModification?: Maybe<Com_Psddev_Cms_Db_Site_ObjectModification>;
  com_psddev_cms_db_Workflow_Data?: Maybe<Com_Psddev_Cms_Db_Workflow_Data>;
  com_psddev_dari_db_ColorDistribution_Data?: Maybe<Com_Psddev_Dari_Db_ColorDistribution_Data>;
  com_psddev_graphql_cma_ContentManagementApiMutationMetadata?: Maybe<Com_Psddev_Graphql_Cma_ContentManagementApiMutationMetadata>;
};

export type GlobalsInput = {
  com_psddev_cms_db_BulkUploadDraftInput?: InputMaybe<Com_Psddev_Cms_Db_BulkUploadDraftInput>;
  com_psddev_cms_db_ContentTemplateSourceInput?: InputMaybe<Com_Psddev_Cms_Db_ContentTemplateSourceInput>;
  com_psddev_cms_db_Content_ObjectModificationInput?: InputMaybe<Com_Psddev_Cms_Db_Content_ObjectModificationInput>;
  com_psddev_cms_db_Directory_DataInput?: InputMaybe<Com_Psddev_Cms_Db_Directory_DataInput>;
  com_psddev_cms_db_Directory_ObjectModificationInput?: InputMaybe<Com_Psddev_Cms_Db_Directory_ObjectModificationInput>;
  com_psddev_cms_db_Draft_NameDataInput?: InputMaybe<Com_Psddev_Cms_Db_Draft_NameDataInput>;
  com_psddev_cms_db_ExternalItemImportedInput?: InputMaybe<Com_Psddev_Cms_Db_ExternalItemImportedInput>;
  com_psddev_cms_db_SiteCopierObjectModificationInput?: InputMaybe<Com_Psddev_Cms_Db_SiteCopierObjectModificationInput>;
  com_psddev_cms_db_Site_ObjectModificationInput?: InputMaybe<Com_Psddev_Cms_Db_Site_ObjectModificationInput>;
  com_psddev_cms_db_Workflow_DataInput?: InputMaybe<Com_Psddev_Cms_Db_Workflow_DataInput>;
  com_psddev_dari_db_ColorDistribution_DataInput?: InputMaybe<Com_Psddev_Dari_Db_ColorDistribution_DataInput>;
  com_psddev_graphql_cma_ContentManagementApiMutationMetadataInput?: InputMaybe<Com_Psddev_Graphql_Cma_ContentManagementApiMutationMetadataInput>;
};

export type Map = {
  __typename?: 'Map';
  entries: Array<MapEntry>;
  json: Scalars['JsonString'];
};


export type MapEntriesArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type MapEntry = {
  __typename?: 'MapEntry';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  brightspot_example_content_management_NoteDelete?: Maybe<Brightspot_Example_Content_Management_Note>;
  brightspot_example_content_management_NoteSave?: Maybe<Brightspot_Example_Content_Management_Note>;
};


export type MutationBrightspot_Example_Content_Management_NoteDeleteArgs = {
  id: Scalars['ID'];
  permanently?: InputMaybe<Scalars['Boolean']>;
};


export type MutationBrightspot_Example_Content_Management_NoteSaveArgs = {
  diffs?: InputMaybe<Array<InputMaybe<Brightspot_Example_Content_Management_NoteDiffInput>>>;
  id?: InputMaybe<Scalars['DiffId']>;
  toolUser?: InputMaybe<Scalars['ToolUser']>;
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
  brightspot_example_content_management_NoteQuery?: Maybe<Brightspot_Example_Content_Management_NoteQueryResult>;
  com_psddev_cms_db_ToolUserQuery?: Maybe<Com_Psddev_Cms_Db_ToolUserQueryResult>;
};


export type QueryBrightspot_Example_Content_Management_NoteQueryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sorts?: InputMaybe<Array<SortInput>>;
  where?: InputMaybe<WhereInput>;
};


export type QueryCom_Psddev_Cms_Db_ToolUserQueryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Long']>;
  sorts?: InputMaybe<Array<SortInput>>;
  where?: InputMaybe<WhereInput>;
};

export type Reference = {
  __typename?: 'Reference';
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type SortInput = {
  options: Array<Scalars['String']>;
  order: SortOrder;
};

export enum SortOrder {
  Ascending = 'ascending',
  Closest = 'closest',
  Descending = 'descending',
  Farthest = 'farthest',
  Newest = 'newest',
  Oldest = 'oldest',
  Relevant = 'relevant'
}

export type StorageItem = {
  __typename?: 'StorageItem';
  contentType?: Maybe<Scalars['String']>;
  inStorage?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Map>;
  path?: Maybe<Scalars['String']>;
  publicUrl?: Maybe<Scalars['String']>;
  securePublicUrl?: Maybe<Scalars['String']>;
  storage?: Maybe<Scalars['String']>;
};

/** 'url' should be used to create a URLStorageItem and 'file' should be used for file uploads. 'url' and 'file' should not be used at the same time. */
export type StorageItemInput = {
  file?: InputMaybe<Scalars['Upload']>;
  url?: InputMaybe<Scalars['URL']>;
};

export type WhereInput = {
  arguments?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  predicate: Scalars['String'];
};

/**
 * **Type Metadata**
 * - Publishable: `true`
 *
 */
export type Brightspot_Example_Content_Management_Note = Com_Psddev_Cms_Db_Content & Com_Psddev_Dari_Db_Record & {
  __typename?: 'brightspot_example_content_management_Note';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   */
  description?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Required
   */
  title?: Maybe<Scalars['String']>;
};

export type Brightspot_Example_Content_Management_NoteDiffInput = {
  brightspot_example_content_management_NoteDiff?: InputMaybe<Brightspot_Example_Content_Management_NoteInput>;
  com_psddev_cms_db_WorkflowLogDiff?: InputMaybe<Com_Psddev_Cms_Db_WorkflowLogInput>;
  id?: InputMaybe<Scalars['DiffId']>;
};

/**
 * **Type Metadata**
 * - Publishable: `true`
 *
 */
export type Brightspot_Example_Content_Management_NoteInput = {
  _globals?: InputMaybe<GlobalsInput>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Brightspot_Example_Content_Management_NoteQueryResult = {
  __typename?: 'brightspot_example_content_management_NoteQueryResult';
  items: Array<Brightspot_Example_Content_Management_Note>;
  pageInfo?: Maybe<PageInfo>;
};

export type Com_Psddev_Cms_Db_BulkUploadDraft = {
  __typename?: 'com_psddev_cms_db_BulkUploadDraft';
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.bulkUpload.containerId"
   */
  containerId?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.bulkUpload.uploadId"
   */
  uploadId?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Db_BulkUploadDraftInput = {
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.bulkUpload.containerId"
   */
  containerId?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.bulkUpload.uploadId"
   */
  uploadId?: InputMaybe<Scalars['ID']>;
};

/**
 * Represents a generic content.
 *
 * **Type Metadata**
 * - Publishable: `true`
 *
 */
export type Com_Psddev_Cms_Db_Content = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Db_ContentTemplateMappings = {
  __typename?: 'com_psddev_cms_db_ContentTemplateMappings';
  globalDefaults?: Maybe<Array<Maybe<Reference>>>;
  globalExtras?: Maybe<Array<Maybe<Reference>>>;
  siteSpecificDefaults?: Maybe<Array<Maybe<Com_Psddev_Cms_Db_SiteSpecificContentTemplates>>>;
  siteSpecificExtras?: Maybe<Array<Maybe<Com_Psddev_Cms_Db_SiteSpecificContentTemplates>>>;
};

export type Com_Psddev_Cms_Db_ContentTemplateMappingsInput = {
  globalDefaults?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  globalExtras?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  siteSpecificDefaults?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  siteSpecificExtras?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
};

export type Com_Psddev_Cms_Db_ContentTemplateSource = {
  __typename?: 'com_psddev_cms_db_ContentTemplateSource';
  source?: Maybe<Reference>;
  sourceId?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Db_ContentTemplateSourceInput = {
  source?: InputMaybe<Scalars['RefId']>;
  sourceId?: InputMaybe<Scalars['ID']>;
};

/**
 * Modification that adds CMS content information.
 *
 * **Type Metadata**
 * - Display Name: `Object`
 *
 */
export type Com_Psddev_Cms_Db_Content_ObjectModification = {
  __typename?: 'com_psddev_cms_db_Content_ObjectModification';
  /**
   * Field getter method Javadoc:
   * Returns `true` if this content is a draft.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.draft"
   */
  draft?: Maybe<Scalars['Boolean']>;
  /**
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Calendar Date`
   */
  getCalendarDate?: Maybe<Scalars['Date']>;
  /**
   * **Field Metadata**
   * - Display Name: `Overlaid?`
   */
  overlaid?: Maybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Returns the date when the given `object` was published.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.publishDate"
   */
  publishDate?: Maybe<Scalars['Date']>;
  /**
   * Field getter method Javadoc:
   * Returns the tool user that published the given `object`.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.publishUser"
   */
  publishUser?: Maybe<Com_Psddev_Cms_Db_ToolUser>;
  scheduleDate?: Maybe<Scalars['Date']>;
  /**
   * **Field Metadata**
   * - Display Name: `Scheduled?`
   */
  scheduled?: Maybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Returns `true` if this content is a trash.
   *
   * **Field Metadata**
   * - Indexed
   * - Display Name: `Archived`
   *
   * Internal name is "cms.content.trashed"
   */
  trash?: Maybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Returns the date when the given `object` was last updated.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.updateDate"
   */
  updateDate?: Maybe<Scalars['Date']>;
  /**
   * Field getter method Javadoc:
   * Returns the tool user that last updated the given `object`.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.updateUser"
   */
  updateUser?: Maybe<Com_Psddev_Cms_Db_ToolUser>;
};

/**
 * Modification that adds CMS content information.
 *
 * **Type Metadata**
 * - Display Name: `Object`
 *
 */
export type Com_Psddev_Cms_Db_Content_ObjectModificationInput = {
  /**
   * Field getter method Javadoc:
   * Sets whether this content is a draft.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.draft"
   */
  draft?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Display Name: `Overlaid?`
   */
  overlaid?: InputMaybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Sets the date when the given `object` was published.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.publishDate"
   */
  publishDate?: InputMaybe<Scalars['Date']>;
  /**
   * Field getter method Javadoc:
   * Sets the tool user that published the given `object`.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.publishUser"
   */
  publishUser?: InputMaybe<Scalars['RefId']>;
  scheduleDate?: InputMaybe<Scalars['Date']>;
  /**
   * **Field Metadata**
   * - Display Name: `Scheduled?`
   */
  scheduled?: InputMaybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Sets whether this content is a trash.
   *
   * **Field Metadata**
   * - Indexed
   * - Display Name: `Archived`
   *
   * Internal name is "cms.content.trashed"
   */
  trash?: InputMaybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Sets the date when the given `object` was last updated.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.updateDate"
   */
  updateDate?: InputMaybe<Scalars['Date']>;
  /**
   * Field getter method Javadoc:
   * Sets the tool user that last updated the given `object`.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.content.updateUser"
   */
  updateUser?: InputMaybe<Scalars['RefId']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Directory Data`
 *
 */
export type Com_Psddev_Cms_Db_Directory_Data = {
  __typename?: 'com_psddev_cms_db_Directory_Data';
  automaticRawPaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * Method Javadoc:
   * Returns whether or not this object contains any paths.
   *
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Has Path?`
   *
   * Internal name is "cms.directory.hasPath"
   */
  hasPath?: Maybe<Scalars['Boolean']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Directory Data`
 *
 */
export type Com_Psddev_Cms_Db_Directory_DataInput = {
  automaticRawPaths?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Modification that adds directory information.
 *
 * **Type Metadata**
 * - Display Name: `Object`
 *
 */
export type Com_Psddev_Cms_Db_Directory_ObjectModification = {
  __typename?: 'com_psddev_cms_db_Directory_ObjectModification';
  /**
   * Field getter method Javadoc:
   * Returns the object name.
   */
  objectName?: Maybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Returns all paths in the given Site.ObjectModification#getOwner owner site associated with this
   *  object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.directory.paths"
   */
  paths?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * Field getter method Javadoc:
   * Returns the paths mode.
   */
  pathsMode?: Maybe<Com_Psddev_Cms_Db_Directory_PathsMode>;
};

/**
 * Modification that adds directory information.
 *
 * **Type Metadata**
 * - Display Name: `Object`
 *
 */
export type Com_Psddev_Cms_Db_Directory_ObjectModificationInput = {
  /**
   * Field getter method Javadoc:
   * Sets the object name.
   */
  objectName?: InputMaybe<Scalars['String']>;
  paths?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /**
   * Field getter method Javadoc:
   * Sets the paths mode.
   */
  pathsMode?: InputMaybe<Com_Psddev_Cms_Db_Directory_PathsMode>;
};

export enum Com_Psddev_Cms_Db_Directory_PathsMode {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL'
}

export type Com_Psddev_Cms_Db_Draft_NameData = {
  __typename?: 'com_psddev_cms_db_Draft_NameData';
  /**
   * **Field Metadata**
   * - Minimum: `-2147483648`
   * - Maximum: `2147483647`
   * - Step: `1`
   */
  index?: Maybe<Scalars['Int']>;
};

export type Com_Psddev_Cms_Db_Draft_NameDataInput = {
  /**
   * **Field Metadata**
   * - Minimum: `-2147483648`
   * - Maximum: `2147483647`
   * - Step: `1`
   */
  index?: InputMaybe<Scalars['Int']>;
};

export type Com_Psddev_Cms_Db_ExternalItemImported = {
  __typename?: 'com_psddev_cms_db_ExternalItemImported';
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.externalItemImported.itemId"
   */
  itemId?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.externalItemImported.sourceType"
   */
  sourceType?: Maybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Db_ExternalItemImportedInput = {
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.externalItemImported.itemId"
   */
  itemId?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.externalItemImported.sourceType"
   */
  sourceType?: InputMaybe<Scalars['String']>;
};

export enum Com_Psddev_Cms_Db_InlineEditingSetting {
  AllContents = 'ALL_CONTENTS',
  Disabled = 'DISABLED',
  OnlyMainContent = 'ONLY_MAIN_CONTENT'
}

/**
 * An interface indicating the type is capable of producing a revision that can be surfaced in the CMS
 *  com.psddev.cms.tool.content.RevisionsWidget.
 */
export type Com_Psddev_Cms_Db_Revision = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_db_RevisionModification?: Maybe<Com_Psddev_Cms_Db_RevisionModification>;
};

/**
 * **Type Metadata**
 * - Display Name: `Revision`
 *
 */
export type Com_Psddev_Cms_Db_RevisionModification = {
  __typename?: 'com_psddev_cms_db_RevisionModification';
  /**
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Revision Sort Date`
   *
   * Internal name is "cms.revision.getRevisionSortDate"
   */
  getRevisionSortDate?: Maybe<Scalars['String']>;
  /**
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Revision Sort Name`
   *
   * Internal name is "cms.revision.getRevisionSortName"
   */
  getRevisionSortName?: Maybe<Scalars['String']>;
  /**
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Revision Sort Object ID`
   *
   * Internal name is "cms.revision.getRevisionSortObjectId"
   */
  getRevisionSortObjectId?: Maybe<Scalars['ID']>;
};

/**
 * A set of permissions that are based on roles.
 *
 * **Type Metadata**
 * - Display Name: `Roles`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_RolesPermissions = Com_Psddev_Cms_Db_ToolPermissions & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_db_RolesPermissions';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_db_ToolPermissionsData?: Maybe<Com_Psddev_Cms_Db_ToolPermissionsData>;
  /**
   * **Field Metadata**
   * - Required
   */
  roles?: Maybe<Array<Maybe<Reference>>>;
};

/**
 * A set of permissions that are based on roles.
 *
 * **Type Metadata**
 * - Display Name: `Roles`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_RolesPermissionsInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  roles?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
};

/**
 * **Type Metadata**
 * - Display Name: `Site Copier Object`
 *
 */
export type Com_Psddev_Cms_Db_SiteCopierObjectModification = {
  __typename?: 'com_psddev_cms_db_SiteCopierObjectModification';
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.siteCopier.copySourceId"
   */
  copySourceId?: Maybe<Scalars['ID']>;
  /**
   * **Method Metadata**
   * - Indexed
   *
   * Internal name is "cms.siteCopier.isFromSiteCopier"
   */
  isFromSiteCopier?: Maybe<Scalars['Boolean']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Site Copier Object`
 *
 */
export type Com_Psddev_Cms_Db_SiteCopierObjectModificationInput = {
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.siteCopier.copySourceId"
   */
  copySourceId?: InputMaybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_SiteSpecificContentTemplates = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_db_SiteSpecificContentTemplates';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   */
  contentTemplates?: Maybe<Array<Maybe<Reference>>>;
  /**
   * **Field Metadata**
   * - Required
   */
  sites?: Maybe<Array<Maybe<Reference>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_SiteSpecificContentTemplatesInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  contentTemplates?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  /**
   * **Field Metadata**
   * - Required
   */
  sites?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_SiteSpecificRoles = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_db_SiteSpecificRoles';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   */
  roles?: Maybe<Array<Maybe<Reference>>>;
  /**
   * **Field Metadata**
   * - Required
   */
  sites?: Maybe<Array<Maybe<Reference>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_SiteSpecificRolesInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  roles?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  /**
   * **Field Metadata**
   * - Required
   */
  sites?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
};

/**
 * A set of permissions that are based on roles per sites.
 *
 * **Type Metadata**
 * - Display Name: `Site Specific Roles`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_SiteSpecificRolesPermissions = Com_Psddev_Cms_Db_ToolPermissions & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_db_SiteSpecificRolesPermissions';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_db_ToolPermissionsData?: Maybe<Com_Psddev_Cms_Db_ToolPermissionsData>;
  /**
   * **Field Metadata**
   * - Required
   */
  siteSpecificRoles?: Maybe<Array<Maybe<Com_Psddev_Cms_Db_SiteSpecificRoles>>>;
};

/**
 * A set of permissions that are based on roles per sites.
 *
 * **Type Metadata**
 * - Display Name: `Site Specific Roles`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_SiteSpecificRolesPermissionsInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  siteSpecificRoles?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
};

/**
 * Modification that adds object accessibility information per site.
 *
 * **Type Metadata**
 * - Display Name: `Object`
 *
 */
export type Com_Psddev_Cms_Db_Site_ObjectModification = {
  __typename?: 'com_psddev_cms_db_Site_ObjectModification';
  /**
   * Field getter method Javadoc:
   * Returns the set of blacklisted sites that aren't allowed to access this object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.site.blacklist"
   */
  blacklist?: Maybe<Array<Maybe<Reference>>>;
  /**
   * Field getter method Javadoc:
   * Returns the set of consumer sites that are allowed to access the object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.site.consumers"
   */
  consumers?: Maybe<Array<Maybe<Reference>>>;
  isGlobal?: Maybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Returns the owner that controls this object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.site.owner"
   */
  owner?: Maybe<Reference>;
};

/**
 * Modification that adds object accessibility information per site.
 *
 * **Type Metadata**
 * - Display Name: `Object`
 *
 */
export type Com_Psddev_Cms_Db_Site_ObjectModificationInput = {
  /**
   * Field getter method Javadoc:
   * Sets the set of blacklisted sites that aren't allowed to access this object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.site.blacklist"
   */
  blacklist?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  /**
   * Field getter method Javadoc:
   * Sets the set of consumer sites that are allowed to access this object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.site.consumers"
   */
  consumers?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  isGlobal?: InputMaybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Sets the owner that controls this object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.site.owner"
   */
  owner?: InputMaybe<Scalars['RefId']>;
};

export type Com_Psddev_Cms_Db_ToolEntity = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * A set of permissions that control access to the parts of the CMS.
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Db_ToolPermissions = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_db_ToolPermissionsData?: Maybe<Com_Psddev_Cms_Db_ToolPermissionsData>;
};

export type Com_Psddev_Cms_Db_ToolPermissionsData = {
  __typename?: 'com_psddev_cms_db_ToolPermissionsData';
  /**
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Site Role Ids`
   */
  getSiteRoleIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** User that uses the CMS and other related tools. */
export type Com_Psddev_Cms_Db_ToolUser = Com_Psddev_Cms_Db_ToolEntity & Com_Psddev_Cms_Notification_Receiver & Com_Psddev_Cms_Notification_ToolReceiver & Com_Psddev_Cms_Notification_ToolSubscriber & Com_Psddev_Dari_Db_Record & Com_Psddev_Dari_Notification_Subscriber & {
  __typename?: 'com_psddev_cms_db_ToolUser';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  automaticallySavedDraftIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  avatar?: Maybe<StorageItem>;
  /**
   * **Field Metadata**
   * - Display Name: `Change Password On Log In?`
   */
  changePasswordOnLogIn: Scalars['Boolean'];
  /**
   * **Field Metadata**
   * - Indexed
   */
  changePasswordToken?: Maybe<Scalars['String']>;
  changePasswordTokenTime: Scalars['Float'];
  cmsTheme?: Maybe<Scalars['String']>;
  com_psddev_cms_db_ContentTemplateMappings?: Maybe<Com_Psddev_Cms_Db_ContentTemplateMappings>;
  com_psddev_cms_notification_ToolReceiverData?: Maybe<Com_Psddev_Cms_Notification_ToolReceiverData>;
  com_psddev_cms_notification_ToolUserReceiverModification?: Maybe<Com_Psddev_Cms_Notification_ToolUserReceiverModification>;
  com_psddev_cms_tool_widget_CreateNewWidget_ToolUserCreateNewSettings?: Maybe<Com_Psddev_Cms_Tool_Widget_CreateNewWidget_ToolUserCreateNewSettings>;
  com_psddev_cms_ui_StandardUiSettings?: Maybe<Com_Psddev_Cms_Ui_StandardUiSettings>;
  com_psddev_theme_ToolUserThemeSettings?: Maybe<Com_Psddev_Theme_ToolUserThemeSettings>;
  compareId?: Maybe<Scalars['ID']>;
  contentLocks?: Maybe<Array<Maybe<Scalars['String']>>>;
  currentPreviewId?: Maybe<Scalars['ID']>;
  currentSchedule?: Maybe<Reference>;
  currentSearchResultSelection?: Maybe<Reference>;
  currentSite?: Maybe<Reference>;
  /**
   * **Field Metadata**
   * - Embedded
   * - Display Name: `Legacy Dashboard`
   * - Note HTML: `Deprecated. Please use the Dashboard field above instead.`
   * @deprecated Deprecated
   */
  dashboard?: Maybe<Com_Psddev_Cms_Tool_Dashboard>;
  /**
   * **Field Metadata**
   * - Display Name: `Dashboard`
   */
  dashboardContainer?: Maybe<Com_Psddev_Cms_Tool_DashboardContainer>;
  /**
   * **Field Metadata**
   * - Display Name: `Disable Navigate Away Alert?`
   */
  disableNavigateAwayAlert: Scalars['Boolean'];
  /**
   * **Field Metadata**
   * - Display Name: `Disable Work In Progress?`
   */
  disableWorkInProgress: Scalars['Boolean'];
  /**
   * Field getter method Javadoc:
   * Returns the email.
   *
   * **Field Metadata**
   * - Indexed
   */
  email?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `External?`
   */
  external: Scalars['Boolean'];
  /**
   * Method Javadoc:
   * Not for external use!
   *
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Role`
   */
  getRoleName?: Maybe<Scalars['String']>;
  /**
   * Method Javadoc:
   * Not for external use!
   *
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Roles`
   */
  getRoleNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Unique Names`
   */
  getUniqueNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * **Field Metadata**
   * - Display Name: `Guide Open?`
   */
  guideOpen: Scalars['Boolean'];
  /**
   * **Field Metadata**
   * - Placeholder: `Inherited`
   */
  inlineEditing?: Maybe<Com_Psddev_Cms_Db_InlineEditingSetting>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  lastLoginDate?: Maybe<Scalars['Date']>;
  lastTotpCounter: Scalars['Float'];
  locale?: Maybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Returns the name.
   *
   * **Field Metadata**
   * - Indexed
   * - Required
   */
  name?: Maybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Returns the password.
   */
  password?: Maybe<Scalars['String']>;
  passwordChangedDate?: Maybe<Scalars['Date']>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Placeholder: `Full Access`
   */
  permissions?: Maybe<Com_Psddev_Cms_Db_ToolPermissions>;
  phoneNumber?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `Return To Dashboard On Save?`
   */
  returnToDashboardOnSave: Scalars['Boolean'];
  /**
   * **Field Metadata**
   * - Display Name: `Return To Dashboard On Workflow?`
   */
  returnToDashboardOnWorkflow: Scalars['Boolean'];
  /**
   * Field getter method Javadoc:
   * Returns the role.
   *
   * **Field Metadata**
   * - Indexed
   * - Note HTML: `If left blank, this user will have full access.`
   * @deprecated Deprecated
   */
  role?: Maybe<Reference>;
  /**
   * **Field Metadata**
   * - Indexed
   * @deprecated Deprecated
   */
  roles?: Maybe<Array<Maybe<Reference>>>;
  /**
   * **Field Metadata**
   * - Display Name: `Tfa Enabled?`
   */
  tfaEnabled: Scalars['Boolean'];
  /**
   * **Field Metadata**
   * - Display Name: `Tfa Reset?`
   */
  tfaReset: Scalars['Boolean'];
  /**
   * **Field Metadata**
   * - Placeholder: `Default`
   * @deprecated Deprecated
   */
  theme?: Maybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Returns the time zone.
   */
  timeZone?: Maybe<Scalars['String']>;
  totpSecret?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  totpToken?: Maybe<Scalars['String']>;
  totpTokenTime: Scalars['Float'];
  /**
   * **Field Metadata**
   * - Indexed
   */
  username?: Maybe<Scalars['String']>;
};

/** User that uses the CMS and other related tools. */
export type Com_Psddev_Cms_Db_ToolUserInput = {
  _globals?: InputMaybe<GlobalsInput>;
  automaticallySavedDraftIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  avatar?: InputMaybe<StorageItemInput>;
  /**
   * **Field Metadata**
   * - Display Name: `Change Password On Log In?`
   */
  changePasswordOnLogIn?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  changePasswordToken?: InputMaybe<Scalars['String']>;
  changePasswordTokenTime?: InputMaybe<Scalars['Float']>;
  cmsTheme?: InputMaybe<Scalars['String']>;
  com_psddev_cms_db_ContentTemplateMappingsInput?: InputMaybe<Com_Psddev_Cms_Db_ContentTemplateMappingsInput>;
  com_psddev_cms_notification_ToolUserReceiverModificationInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolUserReceiverModificationInput>;
  com_psddev_cms_tool_widget_CreateNewWidget_ToolUserCreateNewSettingsInput?: InputMaybe<Com_Psddev_Cms_Tool_Widget_CreateNewWidget_ToolUserCreateNewSettingsInput>;
  com_psddev_cms_ui_StandardUiSettingsInput?: InputMaybe<Com_Psddev_Cms_Ui_StandardUiSettingsInput>;
  com_psddev_theme_ToolUserThemeSettingsInput?: InputMaybe<Com_Psddev_Theme_ToolUserThemeSettingsInput>;
  compareId?: InputMaybe<Scalars['ID']>;
  contentLocks?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  currentPreviewId?: InputMaybe<Scalars['ID']>;
  currentSchedule?: InputMaybe<Scalars['RefId']>;
  currentSearchResultSelection?: InputMaybe<Scalars['RefId']>;
  currentSite?: InputMaybe<Scalars['RefId']>;
  /**
   * **Field Metadata**
   * - Embedded
   * - Display Name: `Legacy Dashboard`
   * - Note HTML: `Deprecated. Please use the Dashboard field above instead.`
   */
  dashboard?: InputMaybe<Scalars['DiffId']>;
  /**
   * **Field Metadata**
   * - Display Name: `Dashboard`
   */
  dashboardContainer?: InputMaybe<Scalars['DiffId']>;
  /**
   * **Field Metadata**
   * - Display Name: `Disable Navigate Away Alert?`
   */
  disableNavigateAwayAlert?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Display Name: `Disable Work In Progress?`
   */
  disableWorkInProgress?: InputMaybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Sets the email.
   *
   * **Field Metadata**
   * - Indexed
   */
  email?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `External?`
   */
  external?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Display Name: `Guide Open?`
   */
  guideOpen?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Placeholder: `Inherited`
   */
  inlineEditing?: InputMaybe<Com_Psddev_Cms_Db_InlineEditingSetting>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  lastLoginDate?: InputMaybe<Scalars['Date']>;
  lastTotpCounter?: InputMaybe<Scalars['Float']>;
  /**
   * Field getter method Javadoc:
   * Sets the user's locale.
   */
  locale?: InputMaybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Sets the name.
   *
   * **Field Metadata**
   * - Indexed
   * - Required
   */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Sets the password.
   */
  password?: InputMaybe<Scalars['String']>;
  passwordChangedDate?: InputMaybe<Scalars['Date']>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Placeholder: `Full Access`
   */
  permissions?: InputMaybe<Scalars['DiffId']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `Return To Dashboard On Save?`
   */
  returnToDashboardOnSave?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Display Name: `Return To Dashboard On Workflow?`
   */
  returnToDashboardOnWorkflow?: InputMaybe<Scalars['Boolean']>;
  /**
   * Field getter method Javadoc:
   * Sets the role.
   *
   * **Field Metadata**
   * - Indexed
   * - Note HTML: `If left blank, this user will have full access.`
   */
  role?: InputMaybe<Scalars['RefId']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  roles?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  /**
   * **Field Metadata**
   * - Display Name: `Tfa Enabled?`
   */
  tfaEnabled?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Display Name: `Tfa Reset?`
   */
  tfaReset?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Placeholder: `Default`
   */
  theme?: InputMaybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Sets the time zone.
   */
  timeZone?: InputMaybe<Scalars['String']>;
  totpSecret?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  totpToken?: InputMaybe<Scalars['String']>;
  totpTokenTime?: InputMaybe<Scalars['Float']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  username?: InputMaybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Db_ToolUserQueryResult = {
  __typename?: 'com_psddev_cms_db_ToolUserQueryResult';
  items: Array<Com_Psddev_Cms_Db_ToolUser>;
  pageInfo?: Maybe<PageInfo>;
};

export type Com_Psddev_Cms_Db_WorkflowLog = Com_Psddev_Cms_Db_Revision & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_db_WorkflowLog';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_db_RevisionModification?: Maybe<Com_Psddev_Cms_Db_RevisionModification>;
  comment?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  date?: Maybe<Scalars['Date']>;
  mainObjectId?: Maybe<Scalars['ID']>;
  mainObjectLabel?: Maybe<Scalars['String']>;
  newWorkflowState?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  objectId?: Maybe<Scalars['ID']>;
  objectLabel?: Maybe<Scalars['String']>;
  objectTypeId?: Maybe<Scalars['ID']>;
  oldWorkflowState?: Maybe<Scalars['String']>;
  siteId?: Maybe<Scalars['ID']>;
  transition?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Db_WorkflowLogInput = {
  _globals?: InputMaybe<GlobalsInput>;
  comment?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  date?: InputMaybe<Scalars['Date']>;
  mainObjectId?: InputMaybe<Scalars['ID']>;
  mainObjectLabel?: InputMaybe<Scalars['String']>;
  newWorkflowState?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  objectId?: InputMaybe<Scalars['ID']>;
  objectLabel?: InputMaybe<Scalars['String']>;
  objectTypeId?: InputMaybe<Scalars['ID']>;
  oldWorkflowState?: InputMaybe<Scalars['String']>;
  siteId?: InputMaybe<Scalars['ID']>;
  transition?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workflow Data`
 *
 */
export type Com_Psddev_Cms_Db_Workflow_Data = {
  __typename?: 'com_psddev_cms_db_Workflow_Data';
  /**
   * **Field Metadata**
   * - Embedded
   */
  currentLog?: Maybe<Com_Psddev_Cms_Db_WorkflowLog>;
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "cms.workflow.currentState"
   */
  currentState?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workflow Data`
 *
 */
export type Com_Psddev_Cms_Db_Workflow_DataInput = {
  /**
   * **Field Metadata**
   * - Embedded
   */
  currentLog?: InputMaybe<Scalars['DiffId']>;
  currentState?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOption = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Disabled`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOptionDisabled = Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOption & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_AutomaticToolSubscriptionDeliveryOptionDisabled';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Disabled`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOptionDisabledInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

/**
 * **Type Metadata**
 * - Display Name: `Override`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOptionOverride = Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOption & Com_Psddev_Cms_Notification_ToolDeliveryMethodReferences & Com_Psddev_Cms_Notification_ToolDeliveryOptionReferences & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_AutomaticToolSubscriptionDeliveryOptionOverride';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryMethodReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesData>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData>;
};

/**
 * **Type Metadata**
 * - Display Name: `Override`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOptionOverrideInput = {
  _globals?: InputMaybe<GlobalsInput>;
  com_psddev_cms_notification_ToolDeliveryMethodReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesDataInput>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesDataInput>;
};

/**
 * **Type Metadata**
 * - Display Name: `Automatic Subscription`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolSubscriptionOption = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_AutomaticToolSubscriptionOption';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Embedded
   */
  automaticDeliveryOption?: Maybe<Com_Psddev_Cms_Notification_AutomaticToolSubscriptionDeliveryOption>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  disabledSubscriptionId?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  subscription?: Maybe<Com_Psddev_Cms_Notification_ToolSubscription>;
  subscriptionDisplay?: Maybe<Com_Psddev_Cms_Notification_ToolSubscription>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  subscriptionId?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Automatic Subscription`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolSubscriptionOptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Embedded
   */
  automaticDeliveryOption?: InputMaybe<Scalars['DiffId']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  disabledSubscriptionId?: InputMaybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  subscription?: InputMaybe<Scalars['DiffId']>;
  subscriptionDisplay?: InputMaybe<Scalars['DiffId']>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  subscriptionId?: InputMaybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Embedded
 * - Publishable: `true`
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolUserSubscriptions = Com_Psddev_Cms_Db_Content & Com_Psddev_Cms_Notification_ToolDeliveryMethodReferences & Com_Psddev_Cms_Notification_ToolDeliveryOptionReferences & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_AutomaticToolUserSubscriptions';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryMethodReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesData>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Embedded
   * - Display Name: `Subscriptions`
   */
  subscriptionOptions?: Maybe<Array<Maybe<Com_Psddev_Cms_Notification_AutomaticToolSubscriptionOption>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 * - Publishable: `true`
 *
 */
export type Com_Psddev_Cms_Notification_AutomaticToolUserSubscriptionsInput = {
  _globals?: InputMaybe<GlobalsInput>;
  com_psddev_cms_notification_ToolDeliveryMethodReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesDataInput>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesDataInput>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Embedded
   * - Display Name: `Subscriptions`
   */
  subscriptionOptions?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
};

/**
 * **Type Metadata**
 * - Display Name: `Sites & Types`
 *
 */
export type Com_Psddev_Cms_Notification_BasicPublishContentFilter = Com_Psddev_Cms_Notification_PublishContentFilter & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_BasicPublishContentFilter';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  siteIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  sites?: Maybe<Array<Maybe<Reference>>>;
  typeIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  types?: Maybe<Array<Maybe<Reference>>>;
};

/**
 * **Type Metadata**
 * - Display Name: `Sites & Types`
 *
 */
export type Com_Psddev_Cms_Notification_BasicPublishContentFilterInput = {
  _globals?: InputMaybe<GlobalsInput>;
  name?: InputMaybe<Scalars['String']>;
  siteIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sites?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  typeIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  types?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workflow, Sites, Types, & Transitions`
 *
 */
export type Com_Psddev_Cms_Notification_BasicWorkflowContentFilter = Com_Psddev_Cms_Notification_WorkflowContentFilter & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_BasicWorkflowContentFilter';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  siteIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  sites?: Maybe<Array<Maybe<Reference>>>;
  /**
   * **Field Metadata**
   * - Placeholder: `Any Transition`
   */
  transitions?: Maybe<Array<Maybe<Scalars['String']>>>;
  typeIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  types?: Maybe<Array<Maybe<Reference>>>;
  workflow?: Maybe<Reference>;
  workflowId?: Maybe<Scalars['String']>;
  workflowIdRelocated?: Maybe<Scalars['Boolean']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workflow, Sites, Types, & Transitions`
 *
 */
export type Com_Psddev_Cms_Notification_BasicWorkflowContentFilterInput = {
  _globals?: InputMaybe<GlobalsInput>;
  name?: InputMaybe<Scalars['String']>;
  siteIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sites?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  /**
   * **Field Metadata**
   * - Placeholder: `Any Transition`
   */
  transitions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  typeIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  types?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
  workflow?: InputMaybe<Scalars['RefId']>;
  workflowId?: InputMaybe<Scalars['String']>;
  workflowIdRelocated?: InputMaybe<Scalars['Boolean']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Browser`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_BrowserDeliveryOption = Com_Psddev_Cms_Notification_DeliveryOption & Com_Psddev_Cms_Notification_ToolDeliveryMethod & Com_Psddev_Cms_Notification_ToolUserOnlyDeliveryOption & Com_Psddev_Dari_Db_Record & Com_Psddev_Dari_Notification_AbstractDeliveryMethod & Com_Psddev_Dari_Notification_DeliveryMethod & {
  __typename?: 'com_psddev_cms_notification_BrowserDeliveryOption';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Browser`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_BrowserDeliveryOptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Notification_DeliveryOption = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Email`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_EmailDeliveryOption = Com_Psddev_Cms_Notification_DeliveryOption & Com_Psddev_Cms_Notification_ToolDeliveryMethod & Com_Psddev_Cms_Notification_VerifiableDeliveryMethod & Com_Psddev_Dari_Db_Record & Com_Psddev_Dari_Notification_AbstractDeliveryMethod & Com_Psddev_Dari_Notification_DeliveryMethod & {
  __typename?: 'com_psddev_cms_notification_EmailDeliveryOption';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  savedVerificationKey?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Email`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_EmailDeliveryOptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
  email?: InputMaybe<Scalars['String']>;
  savedVerificationKey?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Match All`
 *
 */
export type Com_Psddev_Cms_Notification_MatchAllPublishContentFilter = Com_Psddev_Cms_Notification_PublishContentFilter & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_MatchAllPublishContentFilter';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Embedded
   * - Note HTML: `All filters must match.`
   */
  contentFilters?: Maybe<Array<Maybe<Com_Psddev_Cms_Notification_PublishContentFilter>>>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Match All`
 *
 */
export type Com_Psddev_Cms_Notification_MatchAllPublishContentFilterInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Embedded
   * - Note HTML: `All filters must match.`
   */
  contentFilters?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  name?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Match All`
 *
 */
export type Com_Psddev_Cms_Notification_MatchAllWorkflowContentFilter = Com_Psddev_Cms_Notification_WorkflowContentFilter & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_MatchAllWorkflowContentFilter';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Embedded
   * - Note HTML: `All filters must match.`
   */
  contentFilters?: Maybe<Array<Maybe<Com_Psddev_Cms_Notification_WorkflowContentFilter>>>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Match All`
 *
 */
export type Com_Psddev_Cms_Notification_MatchAllWorkflowContentFilterInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Embedded
   * - Note HTML: `All filters must match.`
   */
  contentFilters?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  name?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Only First`
 *
 */
export type Com_Psddev_Cms_Notification_OnlyFirstPublishContentFilter = Com_Psddev_Cms_Notification_PublishContentFilter & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_OnlyFirstPublishContentFilter';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Only First`
 *
 */
export type Com_Psddev_Cms_Notification_OnlyFirstPublishContentFilterInput = {
  _globals?: InputMaybe<GlobalsInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Notification_PublishContentFilter = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Publish`
 *
 */
export type Com_Psddev_Cms_Notification_PublishSubscription = Com_Psddev_Cms_Notification_Subscription & Com_Psddev_Cms_Notification_ToolDeliveryOptionReferences & Com_Psddev_Cms_Notification_ToolSubscription & Com_Psddev_Dari_Db_Record & Com_Psddev_Dari_Notification_AbstractTopic & Com_Psddev_Dari_Notification_Topic & {
  __typename?: 'com_psddev_cms_notification_PublishSubscription';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData>;
  /** @deprecated Deprecated */
  contentFilter?: Maybe<Com_Psddev_Cms_Notification_BasicPublishContentFilter>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  contentFilters?: Maybe<Array<Maybe<Com_Psddev_Cms_Notification_PublishContentFilter>>>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Publish`
 *
 */
export type Com_Psddev_Cms_Notification_PublishSubscriptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesDataInput>;
  contentFilter?: InputMaybe<Scalars['DiffId']>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  contentFilters?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  name?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Query Match`
 *
 */
export type Com_Psddev_Cms_Notification_QueryPublishContentFilter = Com_Psddev_Cms_Notification_PublishContentFilter & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_QueryPublishContentFilter';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  query?: Maybe<Com_Psddev_Dari_Db_Query>;
};

/**
 * **Type Metadata**
 * - Display Name: `Query Match`
 *
 */
export type Com_Psddev_Cms_Notification_QueryPublishContentFilterInput = {
  _globals?: InputMaybe<GlobalsInput>;
  name?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  query?: InputMaybe<Scalars['DiffId']>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Notification_Receiver = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Shared`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_SharedSubscription = Com_Psddev_Cms_Notification_Subscription & Com_Psddev_Cms_Notification_ToolDeliveryOptionReferences & Com_Psddev_Cms_Notification_ToolSubscription & Com_Psddev_Dari_Db_Record & Com_Psddev_Dari_Notification_AbstractTopic & Com_Psddev_Dari_Notification_Topic & {
  __typename?: 'com_psddev_cms_notification_SharedSubscription';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData>;
  /**
   * **Field Metadata**
   * - Display Name: `Subscription`
   */
  delegate?: Maybe<Reference>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Shared`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_SharedSubscriptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesDataInput>;
  delegate?: InputMaybe<Scalars['RefId']>;
  name?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Text (SMS)`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_SmsDeliveryOption = Com_Psddev_Cms_Notification_DeliveryOption & Com_Psddev_Cms_Notification_ToolDeliveryMethod & Com_Psddev_Cms_Notification_VerifiableDeliveryMethod & Com_Psddev_Dari_Db_Record & Com_Psddev_Dari_Notification_AbstractDeliveryMethod & Com_Psddev_Dari_Notification_DeliveryMethod & {
  __typename?: 'com_psddev_cms_notification_SmsDeliveryOption';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  phoneNumber?: Maybe<Scalars['String']>;
  savedVerificationKey?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Text (SMS)`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_SmsDeliveryOptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  savedVerificationKey?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Notification_Subscription = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_ToolDeliveryMethod = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Notification_ToolDeliveryMethodReferences = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryMethodReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesData>;
};

export type Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesData = {
  __typename?: 'com_psddev_cms_notification_ToolDeliveryMethodReferencesData';
  /**
   * **Field Metadata**
   * - Indexed
   * - Display Name: `Delivery Methods`
   */
  deliveryMethodIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesDataInput = {
  /**
   * **Field Metadata**
   * - Indexed
   * - Display Name: `Delivery Methods`
   */
  deliveryMethodIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Notification_ToolDeliveryOptionReferences = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData = {
  __typename?: 'com_psddev_cms_notification_ToolDeliveryOptionReferencesData';
  /**
   * **Field Metadata**
   * - Indexed
   * - Display Name: `Delivery Methods`
   * @deprecated Deprecated
   */
  deliveryOptionIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** @deprecated Deprecated */
  deliveryOptionTypes?: Maybe<Array<Maybe<Reference>>>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesDataInput = {
  /**
   * **Field Metadata**
   * - Indexed
   * - Display Name: `Delivery Methods`
   */
  deliveryOptionIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  deliveryOptionTypes?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Notification_ToolReceiver = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolReceiverData?: Maybe<Com_Psddev_Cms_Notification_ToolReceiverData>;
};

export type Com_Psddev_Cms_Notification_ToolReceiverData = {
  __typename?: 'com_psddev_cms_notification_ToolReceiverData';
  /**
   * **Method Metadata**
   * - Indexed
   * - Display Name: `Delivery Option Ids`
   *
   * Internal name is "cms.notification.getDeliveryOptionIds"
   */
  getDeliveryOptionIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /**
   * Method Javadoc:
   * Gets the delivery options for this receiver.
   *
   * **Returns**
   * - Never <code>null</code>.
   *
   * **Method Metadata**
   * - Indexed
   * - Embedded
   * - Display Name: `Delivery Options`
   *
   * Internal name is "cms.notification.getDeliveryOptions"
   */
  getDeliveryOptions?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryMethod>;
};

export type Com_Psddev_Cms_Notification_ToolSubscriber = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolReceiverData?: Maybe<Com_Psddev_Cms_Notification_ToolReceiverData>;
};

/** Specialized type of subscriptions that are meant exclusively for CMS notifications. */
export type Com_Psddev_Cms_Notification_ToolSubscription = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Subscription`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_ToolSubscriptionOption = Com_Psddev_Cms_Notification_ToolDeliveryMethodReferences & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_notification_ToolSubscriptionOption';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryMethodReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesData>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  topic?: Maybe<Com_Psddev_Cms_Notification_ToolSubscription>;
};

/**
 * **Type Metadata**
 * - Display Name: `Subscription`
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_ToolSubscriptionOptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
  com_psddev_cms_notification_ToolDeliveryMethodReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryMethodReferencesDataInput>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  topic?: InputMaybe<Scalars['DiffId']>;
};

/** Marker interface for DeliveryMethods that are only meant for ToolUsers. */
export type Com_Psddev_Cms_Notification_ToolUserOnlyDeliveryOption = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Tool User Receiver`
 *
 */
export type Com_Psddev_Cms_Notification_ToolUserReceiverModification = {
  __typename?: 'com_psddev_cms_notification_ToolUserReceiverModification';
  announcementIdsViewed?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * **Field Metadata**
   * - Indexed
   * - Required
   *
   * Internal name is "cms.notification.automaticSubscriptions"
   */
  automaticSubscriptions?: Maybe<Com_Psddev_Cms_Notification_AutomaticToolUserSubscriptions>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  deliveryMethods?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryMethod>;
  notificationsClearedDate?: Maybe<Scalars['Date']>;
  notificationsViewedDate?: Maybe<Scalars['Date']>;
  /**
   * Field getter method Javadoc:
   * Gets the subscriptions this receiver should be notified about.
   *
   * **Field Metadata**
   * - Embedded
   * - Display Name: `Subscriptions`
   */
  subscriptionOptions?: Maybe<Array<Maybe<Com_Psddev_Cms_Notification_ToolSubscriptionOption>>>;
  /**
   * **Field Metadata**
   * - Embedded
   * @deprecated Deprecated
   */
  subscriptions?: Maybe<Com_Psddev_Cms_Notification_ToolSubscription>;
};

/**
 * **Type Metadata**
 * - Display Name: `Tool User Receiver`
 *
 */
export type Com_Psddev_Cms_Notification_ToolUserReceiverModificationInput = {
  announcementIdsViewed?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  automaticSubscriptions?: InputMaybe<Scalars['DiffId']>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  deliveryMethods?: InputMaybe<Scalars['DiffId']>;
  notificationsClearedDate?: InputMaybe<Scalars['Date']>;
  notificationsViewedDate?: InputMaybe<Scalars['Date']>;
  /**
   * Field getter method Javadoc:
   * Sets the subscriptions this receiver should be notified about.
   *
   * **Field Metadata**
   * - Embedded
   * - Display Name: `Subscriptions`
   */
  subscriptionOptions?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  subscriptions?: InputMaybe<Scalars['DiffId']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Notification_VerifiableDeliveryMethod = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  savedVerificationKey?: Maybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Notification_WorkflowContentFilter = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workflow`
 *
 */
export type Com_Psddev_Cms_Notification_WorkflowSubscription = Com_Psddev_Cms_Notification_Subscription & Com_Psddev_Cms_Notification_ToolDeliveryOptionReferences & Com_Psddev_Cms_Notification_ToolSubscription & Com_Psddev_Dari_Db_Record & Com_Psddev_Dari_Notification_AbstractTopic & Com_Psddev_Dari_Notification_Topic & {
  __typename?: 'com_psddev_cms_notification_WorkflowSubscription';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesData?: Maybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesData>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  contentFilters?: Maybe<Array<Maybe<Com_Psddev_Cms_Notification_WorkflowContentFilter>>>;
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workflow`
 *
 */
export type Com_Psddev_Cms_Notification_WorkflowSubscriptionInput = {
  _globals?: InputMaybe<GlobalsInput>;
  com_psddev_cms_notification_ToolDeliveryOptionReferencesDataInput?: InputMaybe<Com_Psddev_Cms_Notification_ToolDeliveryOptionReferencesDataInput>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  contentFilters?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  name?: InputMaybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_CmsTool_ResourceFile = Com_Psddev_Cms_Tool_CmsTool_ResourceItem & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_CmsTool_ResourceFile';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   */
  file?: Maybe<StorageItem>;
  name?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `Same Window?`
   */
  sameWindow: Scalars['Boolean'];
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_CmsTool_ResourceFileInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  file?: InputMaybe<StorageItemInput>;
  name?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `Same Window?`
   */
  sameWindow?: InputMaybe<Scalars['Boolean']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_CmsTool_ResourceItem = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `Same Window?`
   */
  sameWindow: Scalars['Boolean'];
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_CmsTool_ResourceLink = Com_Psddev_Cms_Tool_CmsTool_ResourceItem & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_CmsTool_ResourceLink';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `Same Window?`
   */
  sameWindow: Scalars['Boolean'];
  /**
   * **Field Metadata**
   * - Required
   */
  url?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_CmsTool_ResourceLinkInput = {
  _globals?: InputMaybe<GlobalsInput>;
  name?: InputMaybe<Scalars['String']>;
  /**
   * **Field Metadata**
   * - Display Name: `Same Window?`
   */
  sameWindow?: InputMaybe<Scalars['Boolean']>;
  /**
   * **Field Metadata**
   * - Required
   */
  url?: InputMaybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Tool_Dashboard = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_Dashboard';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  columns?: Maybe<Array<Maybe<Com_Psddev_Cms_Tool_DashboardColumn>>>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  name?: Maybe<Scalars['String']>;
  rows?: Maybe<Array<Maybe<Com_Psddev_Cms_Tool_DashboardRow>>>;
  tabs?: Maybe<Array<Maybe<Com_Psddev_Cms_Tool_DashboardTab>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardColumn = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_DashboardColumn';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  widgets?: Maybe<Array<Maybe<Com_Psddev_Cms_Tool_DashboardWidget>>>;
  width: Scalars['Float'];
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardColumnInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Embedded
   */
  widgets?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  width?: InputMaybe<Scalars['Float']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardContainer = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardContainer_OneOff = Com_Psddev_Cms_Tool_DashboardContainer & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_DashboardContainer_OneOff';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   * - Embedded
   */
  dashboard?: Maybe<Com_Psddev_Cms_Tool_Dashboard>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardContainer_OneOffInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   * - Embedded
   */
  dashboard?: InputMaybe<Scalars['DiffId']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardContainer_Shared = Com_Psddev_Cms_Tool_DashboardContainer & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_DashboardContainer_Shared';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   */
  dashboard?: Maybe<Reference>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardContainer_SharedInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  dashboard?: InputMaybe<Scalars['RefId']>;
};

export type Com_Psddev_Cms_Tool_DashboardInput = {
  _globals?: InputMaybe<GlobalsInput>;
  columns?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  /**
   * **Field Metadata**
   * - Indexed
   */
  name?: InputMaybe<Scalars['String']>;
  rows?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  tabs?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardRow = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_DashboardRow';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  columns?: Maybe<Array<Maybe<Com_Psddev_Cms_Tool_DashboardColumn>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardRowInput = {
  _globals?: InputMaybe<GlobalsInput>;
  columns?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardTab = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_DashboardTab';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   */
  columns?: Maybe<Array<Maybe<Com_Psddev_Cms_Tool_DashboardColumn>>>;
  /**
   * **Field Metadata**
   * - Required
   */
  name?: Maybe<Scalars['String']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Cms_Tool_DashboardTabInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  columns?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  /**
   * **Field Metadata**
   * - Required
   */
  name?: InputMaybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Tool_DashboardWidget = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Tool_DefaultDashboardWidget = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * Provides an extensible base implementation of a DashboardWidget displaying a PaginatedResult.
 *
 *  Minimal implementation requires overriding com.psddev.cms.tool.widget.AbstractPaginatedResultWidget and com.psddev.cms.tool.widget.AbstractPaginatedResultWidget.
 *  For further customization, optionally override com.psddev.cms.tool.widget.AbstractPaginatedResultWidget,
 *  com.psddev.cms.tool.widget.AbstractPaginatedResultWidget, or
 *  com.psddev.cms.tool.widget.AbstractPaginatedResultWidget.
 */
export type Com_Psddev_Cms_Tool_Widget_AbstractPaginatedResultWidget = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Upload Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_BulkUploadWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Cms_Tool_DefaultDashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_BulkUploadWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Upload Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_BulkUploadWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

/**
 * **Type Metadata**
 * - Display Name: `Quick Start Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_CreateNewWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Cms_Tool_DefaultDashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_CreateNewWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Quick Start Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_CreateNewWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

export type Com_Psddev_Cms_Tool_Widget_CreateNewWidget_ToolUserCreateNewSettings = {
  __typename?: 'com_psddev_cms_tool_widget_CreateNewWidget_ToolUserCreateNewSettings';
  collapsedIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * **Field Metadata**
   * - Display Name: `Edit Existing Content`
   */
  editExistingContents?: Maybe<Array<Maybe<Reference>>>;
};

export type Com_Psddev_Cms_Tool_Widget_CreateNewWidget_ToolUserCreateNewSettingsInput = {
  collapsedIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /**
   * **Field Metadata**
   * - Display Name: `Edit Existing Content`
   */
  editExistingContents?: InputMaybe<Array<InputMaybe<Scalars['RefId']>>>;
};

export type Com_Psddev_Cms_Tool_Widget_RecentActivityWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Cms_Tool_DefaultDashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_RecentActivityWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Tool_Widget_RecentActivityWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

export type Com_Psddev_Cms_Tool_Widget_ResourcesWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_ResourcesWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Note HTML: `Leave empty to use the items defined globally.`
   */
  items?: Maybe<Array<Maybe<Com_Psddev_Cms_Tool_CmsTool_ResourceItem>>>;
  title?: Maybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Tool_Widget_ResourcesWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Note HTML: `Leave empty to use the items defined globally.`
   */
  items?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Com_Psddev_Cms_Tool_Widget_ScheduledEventsWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Cms_Tool_DefaultDashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_ScheduledEventsWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Tool_Widget_ScheduledEventsWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

/**
 * **Type Metadata**
 * - Display Name: `Search Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_SearchDashboardWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Cms_Tool_Widget_AbstractPaginatedResultWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_SearchDashboardWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * Field getter method Javadoc:
   * Returns a Set of the fields to display within the list of results.
   */
  displayFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading?: Maybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Returns the `query`
   *
   * **Field Metadata**
   * - Embedded
   */
  query?: Maybe<Com_Psddev_Dari_Db_Query>;
};

/**
 * **Type Metadata**
 * - Display Name: `Search Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_SearchDashboardWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * Field getter method Javadoc:
   * Sets the list of fields to display within the list of results.
   */
  displayFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  heading?: InputMaybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Sets the `query`.
   *
   * **Field Metadata**
   * - Embedded
   */
  query?: InputMaybe<Scalars['DiffId']>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Tool_Widget_SiteMapWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_SiteMapWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Deprecated
 *
 */
export type Com_Psddev_Cms_Tool_Widget_SiteMapWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

export type Com_Psddev_Cms_Tool_Widget_UnpublishedDraftsWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Cms_Tool_DefaultDashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_UnpublishedDraftsWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Cms_Tool_Widget_UnpublishedDraftsWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workstreams Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_WorkStreamsWidget = Com_Psddev_Cms_Tool_DashboardWidget & Com_Psddev_Cms_Tool_DefaultDashboardWidget & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_cms_tool_widget_WorkStreamsWidget';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * **Type Metadata**
 * - Display Name: `Workstreams Widget`
 *
 */
export type Com_Psddev_Cms_Tool_Widget_WorkStreamsWidgetInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

/** Standard set of UI settings. */
export type Com_Psddev_Cms_Ui_StandardUiSettings = {
  __typename?: 'com_psddev_cms_ui_StandardUiSettings';
  enableGuides?: Maybe<Com_Psddev_Cms_Ui_UiToggle>;
  enablePostPublishActions?: Maybe<Com_Psddev_Cms_Ui_UiToggle>;
  enablePrePublishActions?: Maybe<Com_Psddev_Cms_Ui_UiToggle>;
  enablePreviewToEdit?: Maybe<Com_Psddev_Cms_Ui_UiToggle>;
  excludedClasses?: Maybe<Array<Maybe<Scalars['String']>>>;
  openPostPublishActionsAutomatically?: Maybe<Com_Psddev_Cms_Ui_UiToggle>;
};

/** Standard set of UI settings. */
export type Com_Psddev_Cms_Ui_StandardUiSettingsInput = {
  enableGuides?: InputMaybe<Com_Psddev_Cms_Ui_UiToggle>;
  enablePostPublishActions?: InputMaybe<Com_Psddev_Cms_Ui_UiToggle>;
  enablePrePublishActions?: InputMaybe<Com_Psddev_Cms_Ui_UiToggle>;
  enablePreviewToEdit?: InputMaybe<Com_Psddev_Cms_Ui_UiToggle>;
  excludedClasses?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  openPostPublishActionsAutomatically?: InputMaybe<Com_Psddev_Cms_Ui_UiToggle>;
};

export enum Com_Psddev_Cms_Ui_UiToggle {
  Disabled = 'DISABLED',
  Enabled = 'ENABLED'
}

/**
 * Stores information about how much of each color is in an image.
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_ColorDistribution = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_dari_db_ColorDistribution';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  n_0_0_0?: Maybe<Scalars['Float']>;
  n_0_0_20?: Maybe<Scalars['Float']>;
  n_0_0_40?: Maybe<Scalars['Float']>;
  n_0_0_60?: Maybe<Scalars['Float']>;
  n_0_0_80?: Maybe<Scalars['Float']>;
  n_0_0_100?: Maybe<Scalars['Float']>;
  n_0_40_20?: Maybe<Scalars['Float']>;
  n_0_40_40?: Maybe<Scalars['Float']>;
  n_0_40_60?: Maybe<Scalars['Float']>;
  n_0_40_80?: Maybe<Scalars['Float']>;
  n_0_60_20?: Maybe<Scalars['Float']>;
  n_0_60_40?: Maybe<Scalars['Float']>;
  n_0_60_60?: Maybe<Scalars['Float']>;
  n_0_60_80?: Maybe<Scalars['Float']>;
  n_0_80_20?: Maybe<Scalars['Float']>;
  n_0_80_40?: Maybe<Scalars['Float']>;
  n_0_80_60?: Maybe<Scalars['Float']>;
  n_0_80_80?: Maybe<Scalars['Float']>;
  n_0_100_20?: Maybe<Scalars['Float']>;
  n_0_100_40?: Maybe<Scalars['Float']>;
  n_0_100_60?: Maybe<Scalars['Float']>;
  n_0_100_80?: Maybe<Scalars['Float']>;
  n_24_40_20?: Maybe<Scalars['Float']>;
  n_24_40_40?: Maybe<Scalars['Float']>;
  n_24_40_60?: Maybe<Scalars['Float']>;
  n_24_40_80?: Maybe<Scalars['Float']>;
  n_24_60_20?: Maybe<Scalars['Float']>;
  n_24_60_40?: Maybe<Scalars['Float']>;
  n_24_60_60?: Maybe<Scalars['Float']>;
  n_24_60_80?: Maybe<Scalars['Float']>;
  n_24_80_20?: Maybe<Scalars['Float']>;
  n_24_80_40?: Maybe<Scalars['Float']>;
  n_24_80_60?: Maybe<Scalars['Float']>;
  n_24_80_80?: Maybe<Scalars['Float']>;
  n_24_100_20?: Maybe<Scalars['Float']>;
  n_24_100_40?: Maybe<Scalars['Float']>;
  n_24_100_60?: Maybe<Scalars['Float']>;
  n_24_100_80?: Maybe<Scalars['Float']>;
  n_48_40_20?: Maybe<Scalars['Float']>;
  n_48_40_40?: Maybe<Scalars['Float']>;
  n_48_40_60?: Maybe<Scalars['Float']>;
  n_48_40_80?: Maybe<Scalars['Float']>;
  n_48_60_20?: Maybe<Scalars['Float']>;
  n_48_60_40?: Maybe<Scalars['Float']>;
  n_48_60_60?: Maybe<Scalars['Float']>;
  n_48_60_80?: Maybe<Scalars['Float']>;
  n_48_80_20?: Maybe<Scalars['Float']>;
  n_48_80_40?: Maybe<Scalars['Float']>;
  n_48_80_60?: Maybe<Scalars['Float']>;
  n_48_80_80?: Maybe<Scalars['Float']>;
  n_48_100_20?: Maybe<Scalars['Float']>;
  n_48_100_40?: Maybe<Scalars['Float']>;
  n_48_100_60?: Maybe<Scalars['Float']>;
  n_48_100_80?: Maybe<Scalars['Float']>;
  n_72_40_20?: Maybe<Scalars['Float']>;
  n_72_40_40?: Maybe<Scalars['Float']>;
  n_72_40_60?: Maybe<Scalars['Float']>;
  n_72_40_80?: Maybe<Scalars['Float']>;
  n_72_60_20?: Maybe<Scalars['Float']>;
  n_72_60_40?: Maybe<Scalars['Float']>;
  n_72_60_60?: Maybe<Scalars['Float']>;
  n_72_60_80?: Maybe<Scalars['Float']>;
  n_72_80_20?: Maybe<Scalars['Float']>;
  n_72_80_40?: Maybe<Scalars['Float']>;
  n_72_80_60?: Maybe<Scalars['Float']>;
  n_72_80_80?: Maybe<Scalars['Float']>;
  n_72_100_20?: Maybe<Scalars['Float']>;
  n_72_100_40?: Maybe<Scalars['Float']>;
  n_72_100_60?: Maybe<Scalars['Float']>;
  n_72_100_80?: Maybe<Scalars['Float']>;
  n_96_40_20?: Maybe<Scalars['Float']>;
  n_96_40_40?: Maybe<Scalars['Float']>;
  n_96_40_60?: Maybe<Scalars['Float']>;
  n_96_40_80?: Maybe<Scalars['Float']>;
  n_96_60_20?: Maybe<Scalars['Float']>;
  n_96_60_40?: Maybe<Scalars['Float']>;
  n_96_60_60?: Maybe<Scalars['Float']>;
  n_96_60_80?: Maybe<Scalars['Float']>;
  n_96_80_20?: Maybe<Scalars['Float']>;
  n_96_80_40?: Maybe<Scalars['Float']>;
  n_96_80_60?: Maybe<Scalars['Float']>;
  n_96_80_80?: Maybe<Scalars['Float']>;
  n_96_100_20?: Maybe<Scalars['Float']>;
  n_96_100_40?: Maybe<Scalars['Float']>;
  n_96_100_60?: Maybe<Scalars['Float']>;
  n_96_100_80?: Maybe<Scalars['Float']>;
  n_120_40_20?: Maybe<Scalars['Float']>;
  n_120_40_40?: Maybe<Scalars['Float']>;
  n_120_40_60?: Maybe<Scalars['Float']>;
  n_120_40_80?: Maybe<Scalars['Float']>;
  n_120_60_20?: Maybe<Scalars['Float']>;
  n_120_60_40?: Maybe<Scalars['Float']>;
  n_120_60_60?: Maybe<Scalars['Float']>;
  n_120_60_80?: Maybe<Scalars['Float']>;
  n_120_80_20?: Maybe<Scalars['Float']>;
  n_120_80_40?: Maybe<Scalars['Float']>;
  n_120_80_60?: Maybe<Scalars['Float']>;
  n_120_80_80?: Maybe<Scalars['Float']>;
  n_120_100_20?: Maybe<Scalars['Float']>;
  n_120_100_40?: Maybe<Scalars['Float']>;
  n_120_100_60?: Maybe<Scalars['Float']>;
  n_120_100_80?: Maybe<Scalars['Float']>;
  n_144_40_20?: Maybe<Scalars['Float']>;
  n_144_40_40?: Maybe<Scalars['Float']>;
  n_144_40_60?: Maybe<Scalars['Float']>;
  n_144_40_80?: Maybe<Scalars['Float']>;
  n_144_60_20?: Maybe<Scalars['Float']>;
  n_144_60_40?: Maybe<Scalars['Float']>;
  n_144_60_60?: Maybe<Scalars['Float']>;
  n_144_60_80?: Maybe<Scalars['Float']>;
  n_144_80_20?: Maybe<Scalars['Float']>;
  n_144_80_40?: Maybe<Scalars['Float']>;
  n_144_80_60?: Maybe<Scalars['Float']>;
  n_144_80_80?: Maybe<Scalars['Float']>;
  n_144_100_20?: Maybe<Scalars['Float']>;
  n_144_100_40?: Maybe<Scalars['Float']>;
  n_144_100_60?: Maybe<Scalars['Float']>;
  n_144_100_80?: Maybe<Scalars['Float']>;
  n_168_40_20?: Maybe<Scalars['Float']>;
  n_168_40_40?: Maybe<Scalars['Float']>;
  n_168_40_60?: Maybe<Scalars['Float']>;
  n_168_40_80?: Maybe<Scalars['Float']>;
  n_168_60_20?: Maybe<Scalars['Float']>;
  n_168_60_40?: Maybe<Scalars['Float']>;
  n_168_60_60?: Maybe<Scalars['Float']>;
  n_168_60_80?: Maybe<Scalars['Float']>;
  n_168_80_20?: Maybe<Scalars['Float']>;
  n_168_80_40?: Maybe<Scalars['Float']>;
  n_168_80_60?: Maybe<Scalars['Float']>;
  n_168_80_80?: Maybe<Scalars['Float']>;
  n_168_100_20?: Maybe<Scalars['Float']>;
  n_168_100_40?: Maybe<Scalars['Float']>;
  n_168_100_60?: Maybe<Scalars['Float']>;
  n_168_100_80?: Maybe<Scalars['Float']>;
  n_192_40_20?: Maybe<Scalars['Float']>;
  n_192_40_40?: Maybe<Scalars['Float']>;
  n_192_40_60?: Maybe<Scalars['Float']>;
  n_192_40_80?: Maybe<Scalars['Float']>;
  n_192_60_20?: Maybe<Scalars['Float']>;
  n_192_60_40?: Maybe<Scalars['Float']>;
  n_192_60_60?: Maybe<Scalars['Float']>;
  n_192_60_80?: Maybe<Scalars['Float']>;
  n_192_80_20?: Maybe<Scalars['Float']>;
  n_192_80_40?: Maybe<Scalars['Float']>;
  n_192_80_60?: Maybe<Scalars['Float']>;
  n_192_80_80?: Maybe<Scalars['Float']>;
  n_192_100_20?: Maybe<Scalars['Float']>;
  n_192_100_40?: Maybe<Scalars['Float']>;
  n_192_100_60?: Maybe<Scalars['Float']>;
  n_192_100_80?: Maybe<Scalars['Float']>;
  n_216_40_20?: Maybe<Scalars['Float']>;
  n_216_40_40?: Maybe<Scalars['Float']>;
  n_216_40_60?: Maybe<Scalars['Float']>;
  n_216_40_80?: Maybe<Scalars['Float']>;
  n_216_60_20?: Maybe<Scalars['Float']>;
  n_216_60_40?: Maybe<Scalars['Float']>;
  n_216_60_60?: Maybe<Scalars['Float']>;
  n_216_60_80?: Maybe<Scalars['Float']>;
  n_216_80_20?: Maybe<Scalars['Float']>;
  n_216_80_40?: Maybe<Scalars['Float']>;
  n_216_80_60?: Maybe<Scalars['Float']>;
  n_216_80_80?: Maybe<Scalars['Float']>;
  n_216_100_20?: Maybe<Scalars['Float']>;
  n_216_100_40?: Maybe<Scalars['Float']>;
  n_216_100_60?: Maybe<Scalars['Float']>;
  n_216_100_80?: Maybe<Scalars['Float']>;
  n_240_40_20?: Maybe<Scalars['Float']>;
  n_240_40_40?: Maybe<Scalars['Float']>;
  n_240_40_60?: Maybe<Scalars['Float']>;
  n_240_40_80?: Maybe<Scalars['Float']>;
  n_240_60_20?: Maybe<Scalars['Float']>;
  n_240_60_40?: Maybe<Scalars['Float']>;
  n_240_60_60?: Maybe<Scalars['Float']>;
  n_240_60_80?: Maybe<Scalars['Float']>;
  n_240_80_20?: Maybe<Scalars['Float']>;
  n_240_80_40?: Maybe<Scalars['Float']>;
  n_240_80_60?: Maybe<Scalars['Float']>;
  n_240_80_80?: Maybe<Scalars['Float']>;
  n_240_100_20?: Maybe<Scalars['Float']>;
  n_240_100_40?: Maybe<Scalars['Float']>;
  n_240_100_60?: Maybe<Scalars['Float']>;
  n_240_100_80?: Maybe<Scalars['Float']>;
  n_264_40_20?: Maybe<Scalars['Float']>;
  n_264_40_40?: Maybe<Scalars['Float']>;
  n_264_40_60?: Maybe<Scalars['Float']>;
  n_264_40_80?: Maybe<Scalars['Float']>;
  n_264_60_20?: Maybe<Scalars['Float']>;
  n_264_60_40?: Maybe<Scalars['Float']>;
  n_264_60_60?: Maybe<Scalars['Float']>;
  n_264_60_80?: Maybe<Scalars['Float']>;
  n_264_80_20?: Maybe<Scalars['Float']>;
  n_264_80_40?: Maybe<Scalars['Float']>;
  n_264_80_60?: Maybe<Scalars['Float']>;
  n_264_80_80?: Maybe<Scalars['Float']>;
  n_264_100_20?: Maybe<Scalars['Float']>;
  n_264_100_40?: Maybe<Scalars['Float']>;
  n_264_100_60?: Maybe<Scalars['Float']>;
  n_264_100_80?: Maybe<Scalars['Float']>;
  n_288_40_20?: Maybe<Scalars['Float']>;
  n_288_40_40?: Maybe<Scalars['Float']>;
  n_288_40_60?: Maybe<Scalars['Float']>;
  n_288_40_80?: Maybe<Scalars['Float']>;
  n_288_60_20?: Maybe<Scalars['Float']>;
  n_288_60_40?: Maybe<Scalars['Float']>;
  n_288_60_60?: Maybe<Scalars['Float']>;
  n_288_60_80?: Maybe<Scalars['Float']>;
  n_288_80_20?: Maybe<Scalars['Float']>;
  n_288_80_40?: Maybe<Scalars['Float']>;
  n_288_80_60?: Maybe<Scalars['Float']>;
  n_288_80_80?: Maybe<Scalars['Float']>;
  n_288_100_20?: Maybe<Scalars['Float']>;
  n_288_100_40?: Maybe<Scalars['Float']>;
  n_288_100_60?: Maybe<Scalars['Float']>;
  n_288_100_80?: Maybe<Scalars['Float']>;
  n_312_40_20?: Maybe<Scalars['Float']>;
  n_312_40_40?: Maybe<Scalars['Float']>;
  n_312_40_60?: Maybe<Scalars['Float']>;
  n_312_40_80?: Maybe<Scalars['Float']>;
  n_312_60_20?: Maybe<Scalars['Float']>;
  n_312_60_40?: Maybe<Scalars['Float']>;
  n_312_60_60?: Maybe<Scalars['Float']>;
  n_312_60_80?: Maybe<Scalars['Float']>;
  n_312_80_20?: Maybe<Scalars['Float']>;
  n_312_80_40?: Maybe<Scalars['Float']>;
  n_312_80_60?: Maybe<Scalars['Float']>;
  n_312_80_80?: Maybe<Scalars['Float']>;
  n_312_100_20?: Maybe<Scalars['Float']>;
  n_312_100_40?: Maybe<Scalars['Float']>;
  n_312_100_60?: Maybe<Scalars['Float']>;
  n_312_100_80?: Maybe<Scalars['Float']>;
  n_336_40_20?: Maybe<Scalars['Float']>;
  n_336_40_40?: Maybe<Scalars['Float']>;
  n_336_40_60?: Maybe<Scalars['Float']>;
  n_336_40_80?: Maybe<Scalars['Float']>;
  n_336_60_20?: Maybe<Scalars['Float']>;
  n_336_60_40?: Maybe<Scalars['Float']>;
  n_336_60_60?: Maybe<Scalars['Float']>;
  n_336_60_80?: Maybe<Scalars['Float']>;
  n_336_80_20?: Maybe<Scalars['Float']>;
  n_336_80_40?: Maybe<Scalars['Float']>;
  n_336_80_60?: Maybe<Scalars['Float']>;
  n_336_80_80?: Maybe<Scalars['Float']>;
  n_336_100_20?: Maybe<Scalars['Float']>;
  n_336_100_40?: Maybe<Scalars['Float']>;
  n_336_100_60?: Maybe<Scalars['Float']>;
  n_336_100_80?: Maybe<Scalars['Float']>;
};

/**
 * Global modification for associating a ColorDistribution instance to an object.
 *
 * **Type Metadata**
 * - Display Name: `Color Distribution Data`
 *
 */
export type Com_Psddev_Dari_Db_ColorDistribution_Data = {
  __typename?: 'com_psddev_dari_db_ColorDistribution_Data';
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "color.distribution"
   */
  distribution?: Maybe<Com_Psddev_Dari_Db_ColorDistribution>;
};

/**
 * Global modification for associating a ColorDistribution instance to an object.
 *
 * **Type Metadata**
 * - Display Name: `Color Distribution Data`
 *
 */
export type Com_Psddev_Dari_Db_ColorDistribution_DataInput = {
  /**
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "color.distribution"
   */
  distribution?: InputMaybe<Scalars['DiffId']>;
};

/**
 * Predicate for comparing object field values that are represented by a key against other values. This class is
 *  immutable as long as the initial values passed to the constructor are immutable as well.
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_ComparisonPredicate = Com_Psddev_Dari_Db_Predicate & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_dari_db_ComparisonPredicate';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  isIgnoreCase: Scalars['Boolean'];
  /**
   * Field getter method Javadoc:
   * Returns the key that represents the object field values.
   */
  key?: Maybe<Scalars['String']>;
  /**
   * Field getter method Javadoc:
   * Returns the operator used to test this predicate.
   */
  operator?: Maybe<Scalars['String']>;
};

/**
 * Predicate for comparing object field values that are represented by a key against other values. This class is
 *  immutable as long as the initial values passed to the constructor are immutable as well.
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_ComparisonPredicateInput = {
  _globals?: InputMaybe<GlobalsInput>;
  isIgnoreCase?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<Scalars['String']>;
};

/**
 * Predicate whose evaluation depends on its child predicates. This class is immutable as long as all child predicates
 *  are immutable as well.
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_CompoundPredicate = Com_Psddev_Dari_Db_Predicate & Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_dari_db_CompoundPredicate';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * Field getter method Javadoc:
   * Returns the child predicates to be evaluated.
   */
  children?: Maybe<Array<Maybe<Com_Psddev_Dari_Db_Predicate>>>;
  /**
   * Field getter method Javadoc:
   * Returns the operator used to test this predicate.
   */
  operator?: Maybe<Scalars['String']>;
};

/**
 * Predicate whose evaluation depends on its child predicates. This class is immutable as long as all child predicates
 *  are immutable as well.
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_CompoundPredicateInput = {
  _globals?: InputMaybe<GlobalsInput>;
  children?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
  operator?: InputMaybe<Scalars['String']>;
};

/**
 * Logical condition used with a Query query.
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_Predicate = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * Field getter method Javadoc:
   * Returns the operator used to test this predicate.
   */
  operator?: Maybe<Scalars['String']>;
};

/**
 * Query over objects in a Database database.
 *
 *
 * Typical use looks like:
 *
 *
 *
 *
 *
 * > Query&amp;lt;Article&amp;gt; query = Query.from(Article.class);
 * > query.where("author = ?", author);
 * > query.sortAscending("headline");
 * > List&amp;lt;Article&amp;gt; articles = query.select();
 * >
 * >
 *
 *
 * Which is roughly equivalent to the following SQL:
 *
 *
 *
 *
 *
 * > SELECT *
 * > FROM Article
 * > WHERE author = ?
 * > ORDER BY headline ASC
 * >
 * >
 *
 *
 * Most methods can be chained so the above query can be rewritten as:
 *
 *
 *
 *
 *
 * > List&amp;lt;Article&amp;gt; articles = Query.
 * > &amp;nbsp;   from(Article.class).
 * > &amp;nbsp;   where("author = ?", author).
 * > &amp;nbsp;   sortAscending("headline").
 * > &amp;nbsp;   select();
 * >
 * >
 *
 *
 * The #and compound methods provide a convenient way to
 *  split the PredicateParser.Static#parse predicate string around the logical flow of the program:
 *
 *
 *
 *
 *
 * > Query&amp;lt;Article&amp;gt; query = Query.from(Article.class);
 * > query.where("author = ?", author);
 * > query.sortAscending("headline");
 * > if (...) {
 * > &amp;nbsp;   query.and("topic = ?", topic1);
 * > } else {
 * > &amp;nbsp;   query.and("topic = ?", topic2);
 * > }
 * >
 * >
 *
 *
 * Or you can use the predicate classes directly for more control over
 *  the whole process:
 *
 *
 *
 *
 *
 * > Query&amp;lt;Article&amp;gt; query = Query.from(Article.class);
 * > String comparison = ...
 * > String compound = ...
 * > Predicate predicate = new ComparisonPredicate(comparison, null, "author", author);
 * > if (...) {
 * > &amp;nbsp;   predicate = new CompoundPredicate(compound, Arrays.asList(
 * > &amp;nbsp;           predicate,
 * > &amp;nbsp;           new ComparisonPredicate(comparison, null, "topic", topic1)));
 * > } else {
 * > &amp;nbsp;   predicate = new CompoundPredicate(compound, Arrays.asList(
 * > &amp;nbsp;           predicate,
 * > &amp;nbsp;           new ComparisonPredicate(comparison, null, "topic", topic2)));
 * > }
 * > List&amp;lt;Article&amp;gt; articles = query.where(predicate).select();
 * >
 * >
 *
 *
 * Finally, joins are not supported, but subqueries are:
 *
 *
 *
 *
 *
 * > Query&amp;lt;Author&amp;gt; authorQuery = Query.
 * > &amp;nbsp;   from(Author.class).
 * > &amp;nbsp;   where("name = ?", name);
 * > Query&amp;lt;Article&amp;gt; articleQuery = Query.
 * > &amp;nbsp;   from(Article.class).
 * > &amp;nbsp;   where("author = ?", authorQuery).
 * > &amp;nbsp;   sortAscending("headline");
 * >
 * >
 */
export type Com_Psddev_Dari_Db_Query = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_dari_db_Query';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * Field getter method Javadoc:
   * Returns the ObjectType#getGroups group that identifies the types of objects to query.
   */
  group?: Maybe<Scalars['String']>;
  having?: Maybe<Com_Psddev_Dari_Db_Predicate>;
  /**
   * Field getter method Javadoc:
   * Returns the predicate for filtering the result.
   */
  predicate?: Maybe<Com_Psddev_Dari_Db_Predicate>;
  /**
   * Field getter method Javadoc:
   * Returns the list of sorters applied to the result.
   */
  sorters?: Maybe<Array<Maybe<Com_Psddev_Dari_Db_Sorter>>>;
};

/** Represents a generic record. */
export type Com_Psddev_Dari_Db_Record = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/** Represents a generic record. */
export type Com_Psddev_Dari_Db_RecordInput = {
  _globals?: InputMaybe<GlobalsInput>;
};

/** Represents a generic record. */
export type Com_Psddev_Dari_Db_Record_Type = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_dari_db_Record_Type';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * Sorter used to prioritize items returned from a Query query.
 *
 *
 * Following operators are available:
 *
 *
 *
 *
 * - com.psddev.dari.db.Sorter#ASCENDING_OPERATOR
 *  - com.psddev.dari.db.Sorter#CLOSEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#NEWEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#OLDEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#DESCENDING_OPERATOR
 *  - com.psddev.dari.db.Sorter#FARTHEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#RELEVANT_OPERATOR
 *
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_Sorter = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_dari_db_Sorter';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * Field getter method Javadoc:
   * Returns the operator.
   */
  operator?: Maybe<Scalars['String']>;
};

/**
 * Sorter used to prioritize items returned from a Query query.
 *
 *
 * Following operators are available:
 *
 *
 *
 *
 * - com.psddev.dari.db.Sorter#ASCENDING_OPERATOR
 *  - com.psddev.dari.db.Sorter#CLOSEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#NEWEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#OLDEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#DESCENDING_OPERATOR
 *  - com.psddev.dari.db.Sorter#FARTHEST_OPERATOR
 *  - com.psddev.dari.db.Sorter#RELEVANT_OPERATOR
 *
 *
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Dari_Db_SorterInput = {
  _globals?: InputMaybe<GlobalsInput>;
  operator?: InputMaybe<Scalars['String']>;
};

export type Com_Psddev_Dari_Db_VisibilityValues = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Dari_Notification_AbstractDeliveryMethod = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/**
 * Base implementation of Topic that allows delivery of any compatible payload, and only requires that a
 *  com.psddev.dari.notification.AbstractTopic implementation be provided.
 */
export type Com_Psddev_Dari_Notification_AbstractTopic = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/** Provides notifications via a unique delivery method, i.e. Email, SMS, etc. */
export type Com_Psddev_Dari_Notification_DeliveryMethod = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/** An entity capable of subscribing to and receiving notifications. */
export type Com_Psddev_Dari_Notification_Subscriber = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

/** A topic for receiving notifications. */
export type Com_Psddev_Dari_Notification_Topic = {
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
};

export type Com_Psddev_Graphql_Cma_ContentManagementApiMutationMetadata = {
  __typename?: 'com_psddev_graphql_cma_ContentManagementApiMutationMetadata';
  /**
   * Field getter method Javadoc:
   * Return the most recent client that modified the original object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "graphql.cma.lastMutation.client"
   */
  client?: Maybe<Reference>;
  /**
   * Field getter method Javadoc:
   * Return the date of when the original object was last updated by a CMA mutation.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "graphql.cma.lastMutation.date"
   */
  date?: Maybe<Scalars['Date']>;
  /**
   * Field getter method Javadoc:
   * Return the most recent endpoint that modified the original object.
   *
   * **Field Metadata**
   * - Indexed
   *
   * Internal name is "graphql.cma.lastMutation.endpoint"
   */
  endpoint?: Maybe<Reference>;
};

export type Com_Psddev_Graphql_Cma_ContentManagementApiMutationMetadataInput = {
  client?: InputMaybe<Scalars['RefId']>;
  date?: InputMaybe<Scalars['Date']>;
  endpoint?: InputMaybe<Scalars['RefId']>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Theme_SiteThemeOverride = Com_Psddev_Dari_Db_Record & {
  __typename?: 'com_psddev_theme_SiteThemeOverride';
  _globals?: Maybe<Globals>;
  _id?: Maybe<Scalars['ID']>;
  _type?: Maybe<Scalars['ID']>;
  /**
   * **Field Metadata**
   * - Required
   */
  site?: Maybe<Reference>;
  /**
   * **Field Metadata**
   * - Required
   */
  theme?: Maybe<Reference>;
};

/**
 * **Type Metadata**
 * - Embedded
 *
 */
export type Com_Psddev_Theme_SiteThemeOverrideInput = {
  _globals?: InputMaybe<GlobalsInput>;
  /**
   * **Field Metadata**
   * - Required
   */
  site?: InputMaybe<Scalars['RefId']>;
  /**
   * **Field Metadata**
   * - Required
   */
  theme?: InputMaybe<Scalars['RefId']>;
};

export type Com_Psddev_Theme_ToolUserThemeSettings = {
  __typename?: 'com_psddev_theme_ToolUserThemeSettings';
  globalThemeOverride?: Maybe<Reference>;
  siteThemeOverrides?: Maybe<Array<Maybe<Com_Psddev_Theme_SiteThemeOverride>>>;
};

export type Com_Psddev_Theme_ToolUserThemeSettingsInput = {
  globalThemeOverride?: InputMaybe<Scalars['RefId']>;
  siteThemeOverrides?: InputMaybe<Array<InputMaybe<Scalars['DiffId']>>>;
};

export type CreateAndUpdateNoteMutationVariables = Exact<{
  toolUser?: InputMaybe<Scalars['ToolUser']>;
  id?: InputMaybe<Scalars['DiffId']>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type CreateAndUpdateNoteMutation = { __typename?: 'Mutation', brightspot_example_content_management_NoteSave?: { __typename?: 'brightspot_example_content_management_Note', _id?: string | null, description?: string | null, title?: string | null, _globals?: { __typename?: 'Globals', com_psddev_cms_db_Content_ObjectModification?: { __typename?: 'com_psddev_cms_db_Content_ObjectModification', updateDate?: any | null, publishDate?: any | null, updateUser?: { __typename?: 'com_psddev_cms_db_ToolUser', username?: string | null } | null, publishUser?: { __typename?: 'com_psddev_cms_db_ToolUser', username?: string | null } | null } | null } | null } | null };

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', brightspot_example_content_management_NoteDelete?: { __typename?: 'brightspot_example_content_management_Note', _id?: string | null, description?: string | null, title?: string | null } | null };

export type GetNotesQueryVariables = Exact<{
  arguments?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  predicate?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Long']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetNotesQuery = { __typename?: 'Query', brightspot_example_content_management_NoteQuery?: { __typename?: 'brightspot_example_content_management_NoteQueryResult', items: Array<{ __typename?: 'brightspot_example_content_management_Note', title?: string | null, description?: string | null, _id?: string | null, _globals?: { __typename?: 'Globals', com_psddev_cms_db_Content_ObjectModification?: { __typename?: 'com_psddev_cms_db_Content_ObjectModification', updateDate?: any | null, publishDate?: any | null, publishUser?: { __typename?: 'com_psddev_cms_db_ToolUser', username?: string | null } | null, updateUser?: { __typename?: 'com_psddev_cms_db_ToolUser', username?: string | null } | null } | null } | null }>, pageInfo?: { __typename?: 'PageInfo', count?: any | null } | null } | null };


export const CreateAndUpdateNoteDocument = gql`
    mutation CreateAndUpdateNote($toolUser: ToolUser, $id: DiffId, $description: String, $title: String) {
  brightspot_example_content_management_NoteSave(
    toolUser: $toolUser
    diffs: {id: $id, brightspot_example_content_management_NoteDiff: {description: $description, title: $title}}
    id: $id
  ) {
    _id
    description
    title
    _globals {
      com_psddev_cms_db_Content_ObjectModification {
        updateDate
        updateUser {
          username
        }
        publishDate
        publishUser {
          username
        }
      }
    }
  }
}
    `;
export type CreateAndUpdateNoteMutationFn = Apollo.MutationFunction<CreateAndUpdateNoteMutation, CreateAndUpdateNoteMutationVariables>;

/**
 * __useCreateAndUpdateNoteMutation__
 *
 * To run a mutation, you first call `useCreateAndUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAndUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAndUpdateNoteMutation, { data, loading, error }] = useCreateAndUpdateNoteMutation({
 *   variables: {
 *      toolUser: // value for 'toolUser'
 *      id: // value for 'id'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateAndUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateAndUpdateNoteMutation, CreateAndUpdateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAndUpdateNoteMutation, CreateAndUpdateNoteMutationVariables>(CreateAndUpdateNoteDocument, options);
      }
export type CreateAndUpdateNoteMutationHookResult = ReturnType<typeof useCreateAndUpdateNoteMutation>;
export type CreateAndUpdateNoteMutationResult = Apollo.MutationResult<CreateAndUpdateNoteMutation>;
export type CreateAndUpdateNoteMutationOptions = Apollo.BaseMutationOptions<CreateAndUpdateNoteMutation, CreateAndUpdateNoteMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation DeleteNote($id: ID!) {
  brightspot_example_content_management_NoteDelete(id: $id, permanently: true) {
    _id
    description
    title
  }
}
    `;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, options);
      }
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const GetNotesDocument = gql`
    query GetNotes($arguments: [String], $predicate: String = "* matches ?", $offset: Long, $limit: Int) {
  brightspot_example_content_management_NoteQuery(
    sorts: {order: ascending, options: "cms.content.updateDate"}
    where: {predicate: $predicate, arguments: $arguments}
    offset: $offset
    limit: $limit
  ) {
    items {
      title
      description
      _id
      _globals {
        com_psddev_cms_db_Content_ObjectModification {
          updateDate
          publishDate
          publishUser {
            username
          }
          updateUser {
            username
          }
        }
      }
    }
    pageInfo {
      count
    }
  }
}
    `;

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *      arguments: // value for 'arguments'
 *      predicate: // value for 'predicate'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
      }
export function useGetNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
        }
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>;
export type GetNotesLazyQueryHookResult = ReturnType<typeof useGetNotesLazyQuery>;
export type GetNotesQueryResult = Apollo.QueryResult<GetNotesQuery, GetNotesQueryVariables>;