import Class from 'brightspot-types/java/lang/Class'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpoint from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpoint'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import GraphQLSchemaVersion from 'brightspot-types/com/psddev/graphql/GraphQLSchemaVersion'
import JavaClass from 'brightspot-types/JavaClass'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

export default class MappingEndpoint extends JavaClass(
  'brightspot.example.static_persisted_queries.MappingEndpoint',
  ContentManagementApiEndpoint,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let schemaClass = GraphQLSchemaVersion.class as Class<GraphQLSchemaVersion>
    // TODO: figure this logic out to set a mappingClass --> let mappingClass = ??
    let entryPointField1 = new ContentManagementEntryPointField(
      schemaClass,
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
