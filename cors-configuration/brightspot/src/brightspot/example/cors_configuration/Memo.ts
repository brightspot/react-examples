import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'

@DisplayName({ value: 'Memo: CORs Configuration' })
export default class Memo extends JavaClass(
  'brightspot.example.cors_configuration.Memo',
  Content
) {
  @JavaField(String)
  subject: string

  @JavaField(String)
  message: string
}
