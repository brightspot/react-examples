import ColorPicker from 'brightspot-types/com/psddev/cms/db/ToolUi$ColorPicker'
import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

export default class Color extends JavaClass(
  'brightspot.example.content_delivery.Color',
  Content
) {
  @Indexed({ unique: true })
  @JavaRequired
  @JavaField(String)
  name: string

  @ColorPicker
  @JavaField(String)
  hexValue?: string
}
