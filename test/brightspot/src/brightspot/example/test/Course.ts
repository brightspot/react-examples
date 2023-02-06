import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

export default class Course extends JavaClass(
  'brightspot.example.test.Course',
  Content
) {
  @JavaField(String)
  @JavaRequired
  @Indexed({ unique: true })
  title: string

  // @JavaField(String)
  // description: string
}
