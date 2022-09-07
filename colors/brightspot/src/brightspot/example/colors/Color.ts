import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

@DisplayName({ value: 'Color' })
export default class Color extends JavaClass(
  'brightspot.example.colors.Color',
  Content
) {
  @Indexed({ unique: true })
  @JavaRequired
  @JavaField(String)
  name: string

  @JavaField(String)
  hex_value?: string
}
