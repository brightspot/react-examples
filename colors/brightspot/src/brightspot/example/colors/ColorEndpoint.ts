import JavaClass from 'brightspot-types/JavaClass'

import JavaSet from 'brightspot-types/java/util/Set'
import Class from 'brightspot-types/java/lang/Class'
import List from 'brightspot-types/java/util/List'

import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import ContentDeliveryApiAccessOption from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption'
import ContentDeliveryApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit'
import ContentDeliveryApiEndpoint from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'

import ColorViewModel from './ColorViewModel'

export default class ColorEndpoint extends JavaClass(
  'brightspot.example.colors.ColorEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/colors'] as unknown as JavaSet<string>
  }

  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    return [ColorViewModel.class as Class<ColorViewModel>].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    // TODO: super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}
