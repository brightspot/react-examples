import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'

import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import WebRequest from 'brightspot-types/com/psddev/dari/web/WebRequest'

import SpqItemViewModel from './SpqItemViewModel'
import SpqItemsViewModel from './SpqItemsViewModel'
import SpqProtocol from './SpqProtocol'

@DisplayName({ value: 'SPQ Endpoint' })
export default class SpqEndpoint extends JavaClass(
  'brightspot.example.static_persisted_queries.SpqEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/spq'] as unknown as JavaSet<string>
  }

  [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
    let version = WebRequest.getCurrent().getHeader('X-App-Version')
    /* NOTE: currently if the Query result is null no whitelist will be applied. In the near future an API key will be added
     for requests. Therefore, all queries not on a whitelist will require an API key */
    return Query.from(SpqProtocol.getClass())
      .where('version = ?', version)
      .first() as unknown as PersistedQueryProtocol
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [
      SpqItemViewModel.getClass(),
      SpqItemsViewModel.getClass(),
    ].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  setCorsConfiguration(
    corsConfiguration: CustomGraphQLCorsConfiguration
  ): void {
    corsConfiguration['getAllowedOrigins()']()
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
    corsConfiguration.addAllowedHeader('X-App-Version')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
