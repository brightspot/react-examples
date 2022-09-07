import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
// import Hashing from 'brightspot-types/com/google/common/hash/Hashing';
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import JavaClass from 'brightspot-types/JavaClass'
// import UtilsOverride from 'brightspot-types/com/psddev/dari/util/UtilsOverride'
// import PersistedQueryExtension from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryExtension'

export default class FooHashAlgorithm extends JavaClass(
  'brightspot.example.apq.FooHashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  [`getPersistedQueryHashKey()`](): string {
    // console.log('MANDI: ', PersistedQueryExtension.SHA_256_HASH_KEY)
    // return PersistedQueryExtension.SHA_256_HASH_KEY
    return 'sha256Hash'
  }

  [`calculateHash(java.lang.String,java.lang.String)`](
    sharedSecret: string,
    query: string
  ): string {
    const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
      'SHA-256',
      query
    )
    const result = Utils.hex(...hashedValue)
    // return Hashing.sha512().hashString(message, StandardCharsets.UTF_8).toString();
    return result
  }
}
