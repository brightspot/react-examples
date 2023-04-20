import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import AllArticlesViewModel from './AllArticlesViewModel'
import AllSectionsViewModel from './AllSectionsViewModel'
import ArticleViewModel from './ArticleViewModel'
import SectionViewModel from './SectionViewModel'

export default class BrightspotRoutingEndpoint extends JavaClass(
  'brightspot.example.brightspot_routing.BrightspotRoutingEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return [
      '/graphql/delivery/brightspot-routing',
    ] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [
      AllArticlesViewModel.getClass(),
      AllSectionsViewModel.getClass(),
      ArticleViewModel.getClass(),
      SectionViewModel.getClass(),
      // TODO: add marker interface
    ].map(
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
