import Class from 'brightspot-types/java/lang/Class'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'
import CustomStaticPersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/CustomStaticPersistedQueryProtocol'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import PersistedQueryProtocol from 'brightspot-types/com/psddev/graphql/pqp/PersistedQueryProtocol'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'

import SpqItemViewModel from './SpqItemViewModel'

@DisplayName({ value: 'SPQ Endpoint' })
export default class ApqEndpoint extends JavaClass(
  'brightspot.example.static_persisted_queries.SpqEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  @JavaField(StorageItem)
  mappingFile: StorageItem

  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/spq'] as unknown as JavaSet<string>
  }

  [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
    let customProtocol = new CustomStaticPersistedQueryProtocol()
    customProtocol.setPersistedQueryMappingFile(this.mappingFile || null)
    return customProtocol
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [SpqItemViewModel.class as Class<SpqItemViewModel>].map(
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
