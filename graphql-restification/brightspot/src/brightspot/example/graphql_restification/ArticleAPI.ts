import ContentDeliveryApiAccessOption from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption'
import ContentDeliveryApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import ArticleViewModel from './ArticleViewModel'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'

export default class ArticleAPI extends JavaClass(
  'brightspot.example.graphql_restification.ArticleAPI',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  [`getPaths()`](): JavaSet<string> {
    return ['/article-api'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [ArticleViewModel.class].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}
