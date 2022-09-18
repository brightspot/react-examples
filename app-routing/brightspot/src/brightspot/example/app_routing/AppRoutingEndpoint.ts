import Class from 'brightspot-types/java/lang/Class'
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
import ArticlesViewModel from './ArticlesViewModel'
import SectionViewModel from './SectionViewModel'
import SectionsViewModel from './SectionsViewModel'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'


export default class AppRoutingEndpoint extends JavaClass(
  'brightspot.example.app_routing.AppRoutingEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/app-routing'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [
      SectionViewModel.class as Class<SectionViewModel>,
      ArticleViewModel.class as Class<ArticleViewModel>,
      ArticlesViewModel.class as Class<ArticlesViewModel>,
      SectionsViewModel.class as Class<SectionsViewModel>,
      PageEntryView.class as Class<PageEntryView>,
    ].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}
