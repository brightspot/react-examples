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

import AppViewModel from './AppViewModel'
import ArticleViewModel from './ArticleViewModel'
import PageViewModel from './PageViewModel'

export default class AppRoutingEndpoint extends JavaClass(
  'brightspot.example.app_routing.AppRoutingEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/app-routing'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    const arr1 = [AppViewModel.class as Class<AppViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    )
    const arr2 = [PageViewModel.class as Class<PageViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    )

    const arr3 = [ArticleViewModel.class as Class<ArticleViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    )

    const arr4 = arr1.concat(arr2)

    const finalArr = arr4.concat(
      arr3
    ) as unknown as List<ContentDeliveryEntryPointField>

    return finalArr
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}
