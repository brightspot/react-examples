import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

@DisplayName({ value: 'Color' })
export default class Color extends JavaClass(
  'brightspot.example.colors.Color',
  Content
) {
  @Indexed({ unique: true })
  @JavaField(String)
  name?: string

  @JavaField(String)
  hex_value?: string
}
