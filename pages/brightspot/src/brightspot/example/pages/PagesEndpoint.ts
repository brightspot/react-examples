import Class from 'brightspot-types/java/lang/Class'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'
import PageViewModel from './PageViewModel'
import PagesViewModel from './PagesViewModel'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

export default class PagesEndpoint extends JavaClass(
  'brightspot.example.pages.PagesEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/pages'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    const arr1 = [PageViewModel.class as Class<PageViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    )
    const arr2 = [PagesViewModel.class as Class<PagesViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    )

    const finalArray = arr1.concat(
      arr2
    ) as unknown as List<ContentDeliveryEntryPointField>

    return finalArray
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
