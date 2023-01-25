import JavaRecord from 'brightspot-types/com/psddev/dari/db/Record'
import List from 'brightspot-types/java/util/List'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

export default class SsgPayload extends JavaClass(
  'brightspot.example.ssg_with_webhooks.SsgPayload',
  JavaRecord
) {
  @JavaField(List.Of(String))
  paths?: List<string>
}
