import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
// import Hashing from 'brightspot-types/com/google/common/hash/Hashing';
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
// import UtilsOverride from 'brightspot-types/com/psddev/dari/util/UtilsOverride'
// import PersistedQueryExtension from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryExtension'

export default class FooHashAlgorithm extends JavaClass(
  'brightspot.example.apq.FooHashAlgorithm',
  AutomaticPersistedQueryHashAlgorithm
) {
  @JavaMethodReturn(String)
  @JavaMethodParameters()
  getPersistedQueryHashKey(): string {
    return 'sha1Hash'
  }
  // [`getPersistedQueryHashKey()`](): string {
  //   console.log('FOO HASH ✨ ✨ ✨', )
  //   // return PersistedQueryExtension.SHA_256_HASH_KEY
  //   return 'md5Hash'
  // }

  @JavaMethodReturn(String)
  @JavaMethodParameters(String, String)
  calculateHash(sharedSecret: string, query: string): string {
    const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
      'SHA1',
      query
    )
    const result = Utils.hex(hashedValue)
    // console.log('RESULT ✨ ✨ ✨', result)

    return result
  }
  // [`calculateHash(java.lang.String,java.lang.String)`](
  //   sharedSecret: string,
  //   query: string
  // ): string {
  //   const hashedValue = Utils['hash(java.lang.String,java.lang.String)'](
  //     'MD5',
  //     query
  //   )
  //   const result = Utils.hex(hashedValue)
  //   // console.log('RESULT ✨ ✨ ✨', result)

  //   return result
  // }
}
