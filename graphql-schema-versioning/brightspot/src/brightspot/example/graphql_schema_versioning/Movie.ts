import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Long from 'brightspot-types/java/lang/Long'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

export default class Movie extends JavaClass(
  'brightspot.example.graphql_schema_versioning.Movie',
  Content
) {
  @Required
  @JavaField(String)
  title: string

  @JavaField(String)
  description?: string

  @JavaField(Long)
  releaseYear?: number

  @JavaField(String)
  director?: string
}
