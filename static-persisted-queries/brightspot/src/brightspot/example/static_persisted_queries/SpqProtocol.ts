import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import CustomStaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/CustomStaticPersistedQueryProtocol'
import StaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/StaticPersistedQueryProtocol'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Nullable from 'brightspot-types/Nullable'
import GraphQLSchemaVersion from 'brightspot-types/com/psddev/graphql/GraphQLSchemaVersion'
import Display from 'brightspot-types/org/jooq/ChartFormat$Display'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'

export default class SpqProtocol extends JavaClass(
  'brightspot.example.static_persisted_queries.SpqProtocol',
  CustomStaticPersistedQueryProtocol
) {
  @DisplayName({ value: 'Cool Mapping File' })
  @JavaField(StorageItem)
  persistedQueryMappingFile?: StorageItem

  // @JavaField(String)
  // test: string

  setPersistedQueryMappingFile(persistedQueryMappingFile: StorageItem) {
    this.persistedQueryMappingFile = persistedQueryMappingFile
  }
}

//  {
//   setPersistedQueryMappingFile(persistedQueryMappingFile: Nullable<StorageItem>): void;
//   [`setPersistedQueryMappingFile(com.psddev.dari.util.StorageItem)`](persistedQueryMappingFile: Nullable<StorageItem>): void;
//   getPersistedQueryMappingFile(): Nullable<StorageItem>;
//   [`getPersistedQueryMappingFile()`](): Nullable<StorageItem>;
//   getPersistedQueryKeyName(): Nullable<string>;
//   [`getPersistedQueryKeyName()`](): Nullable<string>;
//   setPersistedQueryKeyName(persistedQueryKeyName: Nullable<string>): void;
//   [`setPersistedQueryKeyName(java.lang.String)`](persistedQueryKeyName: Nullable<string>): void;
//   getPersistedQueryMapping(): Nullable<JavaMap<string, string>>;
//   [`getPersistedQueryMapping()`](): Nullable<JavaMap<string, string>>;
// }
