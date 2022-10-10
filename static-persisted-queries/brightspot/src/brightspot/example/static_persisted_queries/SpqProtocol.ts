import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import StaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/StaticPersistedQueryProtocol'
import Map from 'brightspot-types/java/util/Map'
import ObjectUtils from 'brightspot-types/com/psddev/dari/util/ObjectUtils'

export default class SpqProtocol extends JavaClass(
  'brightspot.example.static_persisted_queries.SpqProtocol',
  StaticPersistedQueryProtocol
) {
  @JavaField(String)
  name: string

  @JavaField(String)
  spqMappingFile: string;

  [`getPersistedQueryKeyName()`](): string {
    return 'sha256Hash'
  }

  [`getPersistedQueryMapping()`](): Map<string, string> {
    return ObjectUtils.fromJson(this.spqMappingFile) as unknown as Map<
      string,
      string
    >
  }
}
