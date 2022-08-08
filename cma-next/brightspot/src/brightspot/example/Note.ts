import JavaClass from '../../../brightspot-types/JavaClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../brightspot-types/JavaField'
import Indexed from '../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed'

export default class Note extends JavaClass(
  'brightspot.example.Note',
  Content
) {
  @JavaField
  @Indexed({ unique: true })
  title?: string

  @JavaField
  text?: string

  getLabel(): string {
    return this.title || ''
  }
}
