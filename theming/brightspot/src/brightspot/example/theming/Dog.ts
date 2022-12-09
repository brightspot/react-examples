import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Integer from 'brightspot-types/java/lang/Integer'
import Values from 'brightspot-types/com/psddev/dari/db/Recordable$Values'


@DisplayName({ value: 'Dog' })
export default class Dog extends JavaClass(
  'brightspot.example.theming.Dog',
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
    value: [
      'female',
      'male'
    ]
  })
  gender?: string

  @JavaField(String)
  breed?: string

  @JavaField(Integer)
  age?: number;

  @JavaField(String)
  description?: string
}