
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import AutomaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/AutomaticPersistedQueryProtocol'
import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import AviationAlphabetApiViewModel from "./AviationAlphabetApiViewModel";
import LinkedHashMap from 'brightspot-types/java/util/LinkedHashMap'
import JavaMap from 'brightspot-types/java/util/Map'

const alphabetMap: LinkedHashMap<string, string> = new LinkedHashMap<string, string>()
alphabetMap.put('A', 'Alpha')

export default class AviationAlphabetApi extends JavaClass(
    'brightspot.example.automatic_persisted_queries.ApqItem',
    ContentDeliveryApiEndpointV1,
    Singleton
  ) {

    [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
        return [AviationAlphabetApiViewModel.getClass()].map(
            (c) => new ContentDeliveryEntryPointField(c)
          ) as unknown as List<ContentDeliveryEntryPointField>
    }
    setCorsConfiguration(
      corsConfiguration: CustomGraphQLCorsConfiguration
    ): void {
      corsConfiguration.getAllowedOrigins()
    }
  
    updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
      super.updateCorsConfiguration(corsConfiguration)
      corsConfiguration.addAllowedOrigin('localhost')
    }
  
    getApiAccessOption(): GraphQLApiAccessOption {
      return new GraphQLApiAccessOptionImplicit()
    }


  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/apq2'] as unknown as JavaSet<string>
  }

  [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
    let protocol = new AutomaticPersistedQueryProtocol()

    // protocol.setHashAlgorithm(this.hash)

    protocol.setSharedSecret('secret')
    return protocol
  }

  @JavaField(JavaMap<String, String>)
  ALPHABET_MAPPING  = alphabetMap

  getWord (letter: string): string {
    if (letter === null) {
      return this.ALPHABET_MAPPING.get(letter.toUpperCase())
  }
}
}