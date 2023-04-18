import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'

export default class FunFact extends JavaClass(
  'brightspot.example.client_authentication.FunFact',
  Content,
) {
  @JavaField(String)
  text?: string
}
