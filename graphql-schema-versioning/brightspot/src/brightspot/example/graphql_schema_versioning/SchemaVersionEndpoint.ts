import Class from 'brightspot-types/java/lang/Class'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpoint from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpoint'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'

import GraphQLSchemaVersion from 'brightspot-types/com/psddev/graphql/GraphQLSchemaVersion'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

export default class SchemaVersionEndpoint extends JavaClass(
  'brightspot.example.graphql_schema_versioning.SchemaVersionEndpoint',
  ContentManagementApiEndpoint,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let schemaClass = new ContentManagementEntryPointField(
      GraphQLSchemaVersion.class,
      true
    )

    return [schemaClass] as unknown as List<ContentManagementEntryPointField>
  }
  getPaths(): JavaSet<string> {
    return ['/graphql/management/schema-versions'] as unknown as JavaSet<string>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }
}
