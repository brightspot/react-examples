import Class from 'brightspot-types/java/lang/Class'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpoint from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpoint'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import SpqProtocol from './SpqProtocol'

export default class MappingEndpoint extends JavaClass(
  'brightspot.example.static_persisted_queries.MappingEndpoint',
  ContentManagementApiEndpoint,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let mappingClass = SpqProtocol.class as Class<SpqProtocol>

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
