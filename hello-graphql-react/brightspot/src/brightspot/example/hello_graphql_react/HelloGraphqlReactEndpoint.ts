import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import ContentDeliveryApiAccessOption from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption'
import ContentDeliveryApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import List from 'brightspot-types/java/util/List'
import HelloGraphqlReactViewModel from './HelloGraphqlReactViewModel'
import JavaSet from 'brightspot-types/java/util/Set'
import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'

export default class HelloGraphqlReactEndpoint extends JavaClass(
  'brightspot.example.hello_graphql_react.HelloGraphqlReactEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return [
      '/graphql/delivery/hello-graphql-react',
    ] as unknown as JavaSet<string>
  }

  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    return [
      HelloGraphqlReactViewModel.class as Class<HelloGraphqlReactViewModel>,
    ].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    // TODO: super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}
