import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionExplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionExplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import AllFunFactsViewModel from './AllFunFactsViewModel'

export default class ClientAuthCsrEndpoint extends JavaClass(
  'brightspot.example.client_authentication_csr.ClientAuthCsrEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return [
      '/graphql/delivery/client-authentication-csr',
    ] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [AllFunFactsViewModel.getClass()].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionExplicit()
  }
}
