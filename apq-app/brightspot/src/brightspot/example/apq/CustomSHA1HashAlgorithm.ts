import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'

export default class CustomSHA1HashAlgorithm extends JavaClass(
  'brightspot.example.apq.CustomSHA1HashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  @JavaMethodReturn(String)
  @JavaMethodParameters()
  getPersistedQueryHashKey(): string {
    return 'sha1Hash'
  }

  @JavaMethodReturn(String)
  @JavaMethodParameters(String, String)
  calculateHash(sharedSecret: string, query: string): string {
    let result
    if(sharedSecret) {
      const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
        'SHA-1',
        sharedSecret.concat(query)
      )
      result = Utils.hex(hashedValue)
    } else if (!sharedSecret) {
      const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
        'SHA-1',
        query
      )
      result = Utils.hex(hashedValue)
    }

    return result
  }
}
