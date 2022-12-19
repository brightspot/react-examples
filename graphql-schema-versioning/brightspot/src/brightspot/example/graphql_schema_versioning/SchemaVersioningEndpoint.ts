import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpointV1'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import GraphQLSchemaVersion from 'brightspot-types/com/psddev/graphql/GraphQLSchemaVersion'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

export default class SchemaVersioningEndpoint extends JavaClass(
  'brightspot.example.graphql_schema_versioning.SchemaVersioningEndpoint',
  ContentManagementApiEndpointV1,
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
