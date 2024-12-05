import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import AllProfilesViewModel from './AllProfilesViewModel'

@DisplayName({ value: 'GraphQL Schema Documentation' })
export default class GraphQLSchemaDocumentationEndpoint extends JavaClass(
  'brightspot.example.graphql_schema_documentation.GraphQLSchemaDocumentationEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return [
      '/graphql/delivery/graphql-schema-documentation',
    ] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [AllProfilesViewModel.getClass()].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
