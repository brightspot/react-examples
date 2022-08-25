import JavaClass from 'brightspot-types/JavaClass'
import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

export default class Note extends JavaClass(
  'brightspot.example.notes.Note',
  Content
) {
  @JavaField(String)
  @JavaRequired
  @Indexed
  title?: string

  @JavaField(String)
  @JavaRequired
  description?: string

  getLabel(): string {
    return this.title || ''
  }
}
