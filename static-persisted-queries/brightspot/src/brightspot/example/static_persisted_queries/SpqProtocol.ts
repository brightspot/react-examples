import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Map from 'brightspot-types/java/util/Map'

import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import ObjectUtils from 'brightspot-types/com/psddev/dari/util/ObjectUtils'
import StaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/StaticPersistedQueryProtocol'

export default class SpqProtocol extends JavaClass(
  'brightspot.example.static_persisted_queries.SpqProtocol',
  StaticPersistedQueryProtocol
) {
  @DisplayName({ value: 'Version' })
  @JavaField(String)
  @Indexed({ unique: true })
  version: string

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
