import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import ContentDeliveryApiThemeable from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiThemeable'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import CatsViewModel from './CatsViewModel'
import CatViewModel from './CatViewModel'
import DogsViewModel from './DogsViewModel'
import DogViewModel from './DogViewModel'

export default class ThemingEndpoint extends JavaClass(
  'brightspot.example.theming.ThemingEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton,
  ContentDeliveryApiThemeable
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/theming'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [
      CatViewModel.getClass() as Class<CatViewModel>,
      CatsViewModel.getClass() as Class<CatsViewModel>,
      DogViewModel.getClass() as Class<DogViewModel>,
      DogsViewModel.getClass() as Class<DogsViewModel>,
    ].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionImplicit()
  }
}
