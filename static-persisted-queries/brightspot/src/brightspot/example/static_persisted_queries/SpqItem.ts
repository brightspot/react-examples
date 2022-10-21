import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import UrlsWidget from 'brightspot-types/com/psddev/cms/tool/content/UrlsWidget'

export default class SpqItem extends JavaClass(
  'brightspot.example.static_persisted_queries.SpqItem',
  Content
) {
  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  title: string

  @JavaField(String)
  body?: string

  shouldDisplayContentEditWidget(widgetName: String) {
    if (widgetName === UrlsWidget.class.getName()) {
      return false
    } else {
      return true
    }
  }
}
