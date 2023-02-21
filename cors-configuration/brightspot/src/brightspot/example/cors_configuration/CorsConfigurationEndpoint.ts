import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import CustomGraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/CustomGraphQLCorsConfiguration'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import AllMemosViewModel from './AllMemosViewModel'

@DisplayName({ value: 'CORS Configuration Endpoint' })
export default class CorsConfigurationEndpoint extends JavaClass(
  'brightspot.example.cors_configuration.CorsConfigurationEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  @DisplayName({ value: 'CORS Configuration' })
  @JavaField(CustomGraphQLCorsConfiguration)
  corsConfiguration: CustomGraphQLCorsConfiguration

  getPaths(): JavaSet<string> {
    return [
      '/graphql/delivery/cors-configuration',
    ] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [AllMemosViewModel.getClass()].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(
    graphQLCorsConfiguration: GraphQLCorsConfiguration
  ): void {
    super.updateCorsConfiguration(graphQLCorsConfiguration)

    Array.from(this.corsConfiguration.getAllowedOrigins()).map((origin) => {
      graphQLCorsConfiguration.addAllowedOrigin(origin)
    })

    Array.from(this.corsConfiguration.getAllowedHeaders()).map((header) => {
      graphQLCorsConfiguration.addAllowedHeader(header)
    })

    graphQLCorsConfiguration.setMaxAge(this.corsConfiguration.getMaxAge())

    // Add allowed origins here:
    // graphQLCorsConfiguration.addAllowedOrigin('localhost')

    // Add allowed headers here:
    // graphQLCorsConfiguration.addAllowedHeader('foo')

    // Set max age to thirty seconds here:
    // graphQLCorsConfiguration.setMaxAge(30)
  }

  afterSave() {
    this.updateCorsConfiguration(new GraphQLCorsConfiguration())
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
