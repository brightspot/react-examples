import JavaClass from 'brightspot-types/JavaClass'

import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

@DisplayName({ value: 'SHA-512' })
export default class CustomSHA512HashAlgorithm extends JavaClass(
  'brightspot.example.automatic_persisted_queries.CustomSHA512HashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  [`getPersistedQueryHashKey()`](): string {
    return 'sha512Hash'
  }

  [`calculateHash(java.lang.String,java.lang.String)`](
    sharedSecret: string,
    query: string
  ): string {
    if (sharedSecret) {
      const hashedValue = Utils.hash('SHA-512', sharedSecret + query)
      return Utils.hex(hashedValue)
    } else {
      const hashedValue = Utils.hash('SHA-512', query)
      return Utils.hex(hashedValue)
    }
  }
}
