import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Page from './Page'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import ReadOnly from 'brightspot-types/com/psddev/cms/db/ToolUi$ReadOnly'
import Hidden from 'brightspot-types/com/psddev/cms/db/ToolUi$Hidden'

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
  page: Page

  @ReadOnly
  @Hidden
  @Indexed
  pageName: Page['name']

  getLabel(): string {
    return this.headline || ''
  }
}
