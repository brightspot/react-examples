import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentEditWidgetDisplay from 'brightspot-types/com/psddev/cms/tool/ContentEditWidgetDisplay'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import UrlsWidget from 'brightspot-types/com/psddev/cms/tool/content/UrlsWidget'

export default class Tag extends JavaClass(
  'brightspot.example.app_routing.Tag',
  Content,
  ContentEditWidgetDisplay
) {
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string

  @JavaField(String)
  @JavaRequired
  category: string;

  [`shouldDisplayContentEditWidget(java.lang.String)`](
    widgetName: string
  ): boolean {
    if (widgetName === UrlsWidget.class.getName()) {
      return false
    } else {
      return true
    }
  }
}
