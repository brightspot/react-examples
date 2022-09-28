import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import JavaClass from 'brightspot-types/JavaClass'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

@DisplayName({ value: 'SHA-512' })
export default class CustomSHA512HashAlgorithm extends JavaClass(
  'brightspot.example.apq.CustomSHA512HashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  [`getPersistedQueryHashKey()`](): string {
    return 'sha512Hash'
  }

  [`calculateHash(java.lang.String,java.lang.String)`](
    sharedSecret: string,
    query: string
  ): string {
    let result
    if (sharedSecret) {
      const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
        'SHA-512',
        sharedSecret.concat(query)
      )
      result = Utils.hex(hashedValue)
    } else if (!sharedSecret) {
      const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
        'SHA-256',
        query
      )
      result = Utils.hex(hashedValue)
    }

    return result
  }
}
