import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'
import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import IntrospectionQueryRule from 'brightspot-types/com/psddev/graphql/IntrospectionQueryRule'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import AllSongsViewModel from './AllSongsViewModel'

export default class IntrospectionQueryManagementEndpoint extends JavaClass(
  'brightspot.example.introspection_query_management',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return [
      '/graphql/delivery/introspection-query-management',
    ] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [AllSongsViewModel.getClass()].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
    corsConfiguration.addAllowedOrigin('cloud.hasura.io') // for testing externally with hasura.io
    corsConfiguration.addAllowedHeader('Introspection-Key')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }

  getIntrospectionQueryRule(): IntrospectionQueryRule {
    const ExampleIntrospectionQueryRule = ClassFinder.getClass(
      'brightspot.example.introspection_query_management.ExampleIntrospectionQueryRule'
    )
    
    return new ExampleIntrospectionQueryRule()
  }
}
