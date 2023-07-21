import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

@DisplayName({ value: 'Theming Article' })
export default class ThemingArticle extends JavaClass(
  'brightspot.example.theming.ThemingArticle',
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
