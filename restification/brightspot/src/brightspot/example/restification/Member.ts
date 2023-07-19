import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import Long from 'brightspot-types/java/lang/Long'

@DisplayName({ value: 'Member (REST)' })
export default class Member extends JavaClass(
  'brightspot.example.restification.Member',
  Content
) {
  @JavaRequired
  @JavaField(String)
  @Indexed
  displayName?: string

  @JavaField(String)
  firstName?: string

  @JavaField(String)
  lastName?: string

  @JavaField(String)
  email?: string

  @JavaField(Long)
  phoneNumber?: number
}
