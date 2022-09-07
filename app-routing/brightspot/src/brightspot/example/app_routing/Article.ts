import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Page from './Page'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'

export default class Article extends JavaClass(
  'brightspot.example.app_routing.Article',
  Content
) {
  @JavaField(String)
  @Indexed({ unique: true })
  headline?: string

  @JavaField(String)
  body?: string

  // @JavaField(Page)
  // page?: Page

  getLabel(): string {
    return this.headline || ''
  }
}
