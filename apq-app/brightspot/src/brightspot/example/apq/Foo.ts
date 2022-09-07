import JavaClass from 'brightspot-types/JavaClass'
import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

export default class Foo extends JavaClass(
  'brightspot.example.apq.Foo',
  Content
) {
  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  foo: string

  @JavaField(String)
  bar?: string
}
