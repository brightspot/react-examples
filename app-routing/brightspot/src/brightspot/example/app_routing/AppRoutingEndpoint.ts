import Class from 'brightspot-types/java/lang/Class'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiAccessOption from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption'
import ContentDeliveryApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import ArticleViewModel from './ArticleViewModel'
import ArticlesViewModel from './ArticlesViewModel'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import SectionViewModel from './SectionViewModel'
import SectionsViewModel from './SectionsViewModel'
import TagViewModel from './TagViewModel'
import TagsViewModel from './TagsViewModel'

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
      ArticleViewModel.class as Class<ArticleViewModel>,
      ArticlesViewModel.class as Class<ArticlesViewModel>,
      SectionViewModel.class as Class<SectionViewModel>,
      SectionsViewModel.class as Class<SectionsViewModel>,
      TagViewModel.class as Class<TagViewModel>,
      TagsViewModel.class as Class<TagsViewModel>,
      PageEntryView.class as Class<PageEntryView>,
    ].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}
