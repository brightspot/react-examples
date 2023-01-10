import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import AutomaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/AutomaticPersistedQueryProtocol'
import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Embedded from 'brightspot-types/com/psddev/dari/db/Recordable$Embedded'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import ApqItemViewModel from './ApqItemViewModel'

@DisplayName({ value: 'APQ Endpoint' })
export default class ApqEndpoint extends JavaClass(
  'brightspot.example.automatic_persisted_queries.ApqEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  @JavaField(AutomaticPersistedQueryHashAlgorithm)
  @Embedded
  hash: AutomaticPersistedQueryHashAlgorithm

  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/apq'] as unknown as JavaSet<string>
  }
  [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
    let protocol = new AutomaticPersistedQueryProtocol()

    protocol.setHashAlgorithm(this.hash)

    protocol.setSharedSecret('secret')
    return protocol
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [ApqItemViewModel.getClass()].map(
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
}
