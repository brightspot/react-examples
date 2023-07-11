import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import List from 'brightspot-types/java/util/List'

import Embedded from 'brightspot-types/com/psddev/dari/db/Recordable$Embedded'
import JavaRecord from 'brightspot-types/com/psddev/dari/db/Record'

@Embedded
export default class BlogPostPayloadPath extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostPayloadPath',
  JavaRecord
) {
  @JavaField(String)
  path?: string

  @JavaField(List.Of(String))
  siteUrls?: List<string>

  @JavaField(String)
  type?: string
}
