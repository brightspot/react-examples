import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
// import Hashing from 'brightspot-types/com/google/common/hash/Hashing';
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import JavaClass from 'brightspot-types/JavaClass'
// import PersistedQueryExtension from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryExtension'

export default class ArticleHashAlgorithm extends JavaClass(
  'brightspot.example.apq.ArticleHashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  [`getPersistedQueryHashKey()`](): string {
    // return PersistedQueryExtension.SHA_256_HASH_KEY
    return 'sha256Hash'
  }

  [`calculateHash(java.lang.String,java.lang.String)`](
    sharedSecret: string,
    query: string
  ): string {
    const hashedValue = Utils.hash('SHA-512', query)
    const result = Utils.hex(hashedValue[0])
    // return Hashing.sha512().hashString(message, StandardCharsets.UTF_8).toString();
    return result
  }
}
