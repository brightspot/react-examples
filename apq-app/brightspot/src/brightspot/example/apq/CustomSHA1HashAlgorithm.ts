import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import JavaClass from 'brightspot-types/JavaClass'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

@DisplayName({ value: 'SHA-1' })
export default class CustomSHA1HashAlgorithm extends JavaClass(
  'brightspot.example.apq.CustomSHA1HashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  [`getPersistedQueryHashKey()`](): string {
    return 'sha1Hash'
  }

  [`calculateHash(java.lang.String,java.lang.String)`](
    sharedSecret: string,
    query: string
  ): string {
    let result
    if (sharedSecret) {
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
