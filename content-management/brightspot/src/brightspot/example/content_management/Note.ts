import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

export default class Note extends JavaClass(
  'brightspot.example.content_management.Note',
  Content
) {
  @JavaField(String)
  @JavaRequired
  @Indexed
  title: string

  @JavaField(String)
  @JavaRequired
  description: string

  getLabel(): string {
    return this.title
  }
}
