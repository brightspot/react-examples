import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Long from 'brightspot-types/java/lang/Long' // added for user to make updates to file

import Content from 'brightspot-types/com/psddev/cms/db/Content'

export default class Movie extends JavaClass(
  'brightspot.example.graphql_schema_versioning.Movie',
  Content
) {
  @JavaRequired
  @JavaField(String)
  title: string

  @JavaField(String)
  description?: string
}
