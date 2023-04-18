import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionExplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionExplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import AllFunFactsViewModel from './AllFunFactsViewModel'

export default class ClientAuthEndpoint extends JavaClass(
  'brightspot.example.client_authentication.ClientAuthEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return [
      '/graphql/delivery/client-authentication',
    ] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [
      AllFunFactsViewModel.getClass(),
    ].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('*')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionExplicit()
  }
}
