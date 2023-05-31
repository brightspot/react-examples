import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

@DisplayName({ value: 'Theme Article' })
export default class ThemeArticle extends JavaClass(
  'brightspot.example.theming.ThemeArticle',
  Content
) {
  @JavaRequired
  @JavaField(String)
  headline?: string

  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  slug?: string

  @JavaField(String)
  body?: string
}
