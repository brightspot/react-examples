import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'

import Page from './Page'

@DisplayName({ value: 'App Routing Article' })
export default class Article extends JavaClass(
  'brightspot.example.app_routing.Article',
  Content
) {
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  headline: string

  @JavaField(String)
  body?: string

  @JavaField(Page)
  @JavaRequired
  @Indexed
  page: Page
}
