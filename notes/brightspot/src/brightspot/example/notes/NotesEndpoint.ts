import Class from 'brightspot-types/java/lang/Class'
import ContentManagementApiEndpoint from 'brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpoint'
import ContentManagementEntryPointField from 'brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField'
import GraphQLCorsConfiguration from 'brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import ToolUser from 'brightspot-types/com/psddev/cms/db/ToolUser'

import Note from './Note'
export default class NotesEndpoint extends JavaClass(
  'brightspot.example.notes.NotesEndpoint',
  ContentManagementApiEndpoint,
  Singleton
) {
  [`getEntryFields()`](): List<ContentManagementEntryPointField> {
    let noteClass = Note.class as Class<Note>
    let toolUser = ToolUser.class as Class<ToolUser>

    let entryPointField1 = new ContentManagementEntryPointField(noteClass, true)
    let entryPointField2 = new ContentManagementEntryPointField(toolUser, false)

    return [
      entryPointField1,
      entryPointField2,
    ] as unknown as List<ContentManagementEntryPointField>
  }
  getPaths(): JavaSet<string> {
    return ['/graphql/management/notes'] as unknown as JavaSet<string>
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    super.updateCorsConfiguration(corsConfiguration)
    corsConfiguration.addAllowedOrigin('localhost')
  }
}
