import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Long from 'brightspot-types/java/lang/Long'

@DisplayName({ value: 'User (REST)' })
export default class User extends JavaClass(
  'brightspot.example.restification.Article',
  Content
) {
  @JavaRequired
  @JavaField(String)
  username?: string

  @JavaField(String)
  firstName?: string

  @JavaField(String)
  lastName?: string

  @JavaField(String)
  email?: string

  @JavaField(Long)
  phoneNumber?: number
}
