import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpointV1'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import SpqProtocol from './SpqProtocol'

export default class MappingEndpoint extends JavaClass(
  'brightspot.example.static_persisted_queries.MappingEndpoint',
  ContentManagementApiEndpointV1,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let mappingClass = SpqProtocol.getClass()

    let entryPointField1 = new ContentManagementEntryPointField(
      mappingClass,
      true
    )
    return [
      entryPointField1,
    ] as unknown as List<ContentManagementEntryPointField>
  }

  getPaths(): JavaSet<string> {
    return ['/graphql/management/mapping'] as unknown as JavaSet<string>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }
}
