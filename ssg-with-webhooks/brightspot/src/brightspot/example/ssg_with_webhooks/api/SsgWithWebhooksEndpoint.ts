import List from 'brightspot-types/java/util/List'
import JavaSet from 'brightspot-types/java/util/Set'
import Set from 'brightspot-types/java/util/Set'
import JavaClass from 'brightspot-types/JavaClass'

import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import AllBlogPostsViewModel from './AllBlogPostsViewModel'
import BlogPostViewModel from './BlogPostViewModel'

@DisplayName({ value: 'Blog Post Endpoint' })
export default class SsgWithWebhooksEndpoint extends JavaClass(
  'brightspot.example.ssg_with_webhooks.api.SsgWithWebhooksEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  getPaths(): Set<string> {
    return ['/graphql/delivery/ssg-with-webhooks'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [AllBlogPostsViewModel.getClass(), BlogPostViewModel.getClass()].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('*')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
