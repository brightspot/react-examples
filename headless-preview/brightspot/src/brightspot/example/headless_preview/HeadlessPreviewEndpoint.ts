import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentDeliveryApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpointV1'
import ContentDeliveryEntryPointField from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import GraphQLApiAccessOption from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOption'
import GraphQLApiAccessOptionImplicit from 'brightspot-types/com/psddev/graphql/GraphQLApiAccessOptionImplicit'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Placeholder from 'brightspot-types/com/psddev/cms/ui/form/Placeholder'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import CourseViewModel from './CourseViewModel'
import AllCoursesViewModel from './AllCoursesViewModel'
import HeadlessPreviewEndpointViewModel from './HeadlessPreviewEndpointViewModel'

export default class HeadlessPreviewEndpoint extends JavaClass(
  'brightspot.example.headless_preview.HeadlessPreviewEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  @Placeholder({ value: 'http://localhost:3000/courses/brightspot-preview' })
  @JavaField(String)
  previewUrl?: string

  getPaths(): JavaSet<string> {
    return ['/graphql/delivery/headless-preview'] as unknown as JavaSet<string>
  }

  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [
      CourseViewModel.getClass(),
      AllCoursesViewModel.getClass(),
      HeadlessPreviewEndpointViewModel.getClass(),
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
