import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

export default class Course extends JavaClass(
  'brightspot.example.test.Course',
  Content
) {
  @JavaField(String)
  @JavaRequired
  title: string
}
