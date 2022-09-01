import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import Class from 'brightspot-types/java/lang/Class'
import List from 'brightspot-types/java/util/List'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import HelloWorldViewModel from './HelloWorldViewModel'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'

export default class HelloWorldEndpoint extends JavaClass(
  'brightspot.example.hello_world.HelloWorldEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/hello-world'] as unknown as JavaSet<string>
  }

  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    return [HelloWorldViewModel.class as Class<HelloWorldViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    // TODO: super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
