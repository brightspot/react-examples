import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import List from 'brightspot-types/java/util/List'

import JavaRecord from 'brightspot-types/com/psddev/dari/db/Record'

import BlogPostPayloadPath from './BlogPostPayloadPath'

export default class BlogPostPayload extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostPayload',
  JavaRecord
) {
  @JavaField(List.Of(BlogPostPayloadPath))
  paths?: List<BlogPostPayloadPath>
}
