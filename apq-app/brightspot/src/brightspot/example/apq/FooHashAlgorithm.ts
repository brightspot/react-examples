import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'

export default class FooHashAlgorithm extends JavaClass(
  'brightspot.example.apq.FooHashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  @JavaMethodReturn(String)
  @JavaMethodParameters()
  getPersistedQueryHashKey(): string {
    return 'sha256Hash' // set string at sha256Hash since Apollo sends all hashs in sha256Hash field
  }

  @JavaMethodReturn(String)
  @JavaMethodParameters(String, String)
  calculateHash(sharedSecret: string, query: string): string {
    const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
      'SHA-1',
      query
    )
    const result = Utils.hex(hashedValue)
    return result
  }
}
