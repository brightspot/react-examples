import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Long from 'brightspot-types/java/lang/Long'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Values from 'brightspot-types/com/psddev/dari/db/Recordable$Values'

export default class Song extends JavaClass(
  'brightspot.example.introspection_query_management.Song',
  Content
) {
  @JavaField(String)
  name?: string

  @JavaField(String)
  artist?: string

  @JavaField(String)
  album?: string

  @JavaField(String)
  @Values({
    value: ['Pop', 'Rock', 'Hip-Hop', 'Country', 'Indie', 'Electronic', 'Jazz'],
  })
  genre?: string

  @JavaField(String)
  year?: string

  @JavaField(Long)
  trackNumber?: number

  @JavaField(Long)
  rating?: number

  @JavaField(Long)
  bpm?: number

  @JavaField(String)
  internalNote?: string
}
