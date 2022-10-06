import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import AutomaticPersistedQueryHashAlgorithm from 'brightspot-types/com/psddev/graphql/pqp/AutomaticPersistedQueryHashAlgorithm'
import AutomaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/AutomaticPersistedQueryProtocol'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
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
  ContentDeliveryApiEndpoint,
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
    const endpointHash = this.hash
    protocol.setHashAlgorithm(endpointHash)
    protocol.setSharedSecret('secret')
    return protocol
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [ApqItemViewModel.class as Class<ApqItemViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  setCorsConfiguration(
    corsConfiguration: CustomGraphQLCorsConfiguration
  ): void {
    corsConfiguration['getAllowedOrigins()']()
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
