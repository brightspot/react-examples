import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Integer from 'brightspot-types/java/lang/Integer'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'
import Values from 'brightspot-types/com/psddev/dari/db/Recordable$Values'

@DisplayName({ value: 'Cat' })
export default class Cat extends JavaClass(
  'brightspot.example.theming.Cat',
  Content
) {
  @JavaRequired
  @JavaField(String)
  name?: string

  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  userName?: string

  @JavaField(String)
  color?: string

  @JavaField(String)
  @Values({
    value: ['female', 'male'],
  })
  gender?: string

  @JavaField(String)
  breed?: string

  @JavaField(Integer)
  age?: number

  @JavaField(String)
  description?: string

  // TODO: this field can be used once the @ImageAttributes annotation is available for JS Classes
  @JavaField(StorageItem)
  image?: StorageItem
}
