import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpointV1 from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpointV1'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import Image from './Image'

export default class NotesEndpoint extends JavaClass(
  'brightspot.example.file_uploads.FileUploadsEndpoint',
  ContentManagementApiEndpointV1,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let entryPointField = new ContentManagementEntryPointField(
      Image.getClass(),
      true
    )

    return [
      entryPointField,
    ] as unknown as List<ContentManagementEntryPointField>
  }

  getPaths(): JavaSet<string> {
    return ['/graphql/management/file-uploads'] as unknown as JavaSet<string>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }
}
