import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import StringUtils from 'brightspot-types/com/psddev/dari/util/StringUtils'

import Page from './Page'
import SuggestedMaximum from 'brightspot-types/com/psddev/cms/db/ToolUi$SuggestedMaximum'

@DisplayName({ value: 'App Routing Article' })
export default class Article extends JavaClass(
  'brightspot.example.app_routing.Article',
  Content
) {
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string

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

  beforeCommit(): void {
    this.slug = StringUtils.toNormalized(this.slug)
  }
}
