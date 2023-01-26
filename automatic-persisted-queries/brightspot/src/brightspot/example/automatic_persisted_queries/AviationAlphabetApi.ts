import JavaClass from 'brightspot-types/JavaClass'
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
import AviationAlphabetApiViewModel from './AviationAlphabetApiViewModel'
import LinkedHashMap from 'brightspot-types/java/util/LinkedHashMap'

const alphabetMap: LinkedHashMap<string, string> = new LinkedHashMap<
  string,
  string
>()
alphabetMap.put('A', 'Alpha')
alphabetMap.put('B', 'Bravo')
alphabetMap.put('C', 'Charlie')
alphabetMap.put('D', 'Delta')
alphabetMap.put('E', 'Echo')
alphabetMap.put('F', 'Foxtrot')
alphabetMap.put('G', 'Golf')
alphabetMap.put('H', 'Hotel')
alphabetMap.put('I', 'India')
alphabetMap.put('J', 'Juliet')
alphabetMap.put('K', 'Kilo')
alphabetMap.put('L', 'Lima')
alphabetMap.put('M', 'Mike')
alphabetMap.put('N', 'November')
alphabetMap.put('O', 'Oscar')
alphabetMap.put('P', 'Papa')
alphabetMap.put('Q', 'Quebec')
alphabetMap.put('R', 'Romeo')
alphabetMap.put('S', 'Sierra')
alphabetMap.put('T', 'Tango')
alphabetMap.put('U', 'Uniform')
alphabetMap.put('V', 'Victor')
alphabetMap.put('W', 'Whiskey')
alphabetMap.put('X', 'X-Ray')
alphabetMap.put('Y', 'Yankee')
alphabetMap.put('Z', 'Zulu')

export default class AviationAlphabetApi extends JavaClass(
  'brightspot.example.automatic_persisted_queries.AviationAlphabetApi',
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

  static ALPHABET_MAPPING = alphabetMap

  getAlphabetLetterCode(letter: string): string {
    if (letter === null) {
      return null
    }
    return AviationAlphabetApi.ALPHABET_MAPPING.get(letter.toUpperCase())
  }

  getLetterOutputFromText(letter: string): string {
    return AviationAlphabetApi.ALPHABET_MAPPING.get(letter.toUpperCase())
  }
}
