import JavaClass from 'brightspot-types/JavaClass'

import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import AutomaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryProtocol'
import Sha256PersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/Sha256PersistedQueryHashAlgorithm'

export default class CustomAPQProtocol extends JavaClass(
  'brightspot.example.automatic_persisted_queries.CustomAPQProtocol',
  AutomaticPersistedQueryProtocol
) {
  [`getHashAlgorithm()`](): AutomaticPersistedQueryHashAlgorithm {
    return new Sha256PersistedQueryHashAlgorithm()
  }

  [`getSharedSecret()`](): string {
    return 'secret'
  }
}
