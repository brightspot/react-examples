import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

export default class Author extends JavaClass(
  'brightspot.example.ssg_with_webhooks.Author',
  Content
) {
  @JavaField(String)
  name?: string
}
