import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaClass from '../../../brightspot-types/JavaClass'
import JavaField from '../../../brightspot-types/JavaField'
import Page from './Page'
import Indexed from '../../../brightspot-types/com/psddev/dari/db/Recordable$Indexed'

export default class Article extends JavaClass(
  'brightspot.example.Article',
  Content
) {
  @JavaField
  headline?: string

  @JavaField
  body?: string

  @JavaField
  @Indexed()
  page?: Page

  getLabel(): string {
    return this.headline || ''
  }
}
