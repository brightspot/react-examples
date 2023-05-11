import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaMap from 'brightspot-types/java/util/Map'
import JavaObject from 'brightspot-types/java/lang/Object'
import List from 'brightspot-types/java/util/List'

import JavaRecord from 'brightspot-types/com/psddev/dari/db/Record'

export default class SsgPayload extends JavaClass(
  'brightspot.example.ssg_with_webhooks.SsgPayload',
  JavaRecord
) {
  @JavaField(List.Of(JavaObject))
  paths?: List<JavaObject>

  @JavaField(List.Of(JavaObject))
  referencePaths?: List<JavaObject>

  @JavaField(JavaMap.Of(String, JavaObject))
  values?: JavaMap<string, JavaObject>
}
