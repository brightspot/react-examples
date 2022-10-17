import Class from 'brightspot-types/java/lang/Class'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ContentManagementApiEndpoint from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpoint'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

import Image from './Image'
export default class NotesEndpoint extends JavaClass(
  'brightspot.example.file_uploads.FileUploadsEndpoint',
  ContentManagementApiEndpoint,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let image = Image.class as Class<Image>

    let entryPointField = new ContentManagementEntryPointField(image, true)

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
