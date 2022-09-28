import JavaClass from 'brightspot-types/JavaClass'
import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

export default class ApqItem extends JavaClass(
  'brightspot.example.apq.ApqItem',
  Content
) {
  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  title: string

  @JavaField(String)
  body?: string
}
