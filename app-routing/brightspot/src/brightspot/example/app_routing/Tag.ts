import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentEditWidgetDisplay from 'brightspot-types/com/psddev/cms/tool/ContentEditWidgetDisplay'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import UrlsWidget from 'brightspot-types/com/psddev/cms/tool/content/UrlsWidget'

@DisplayName({ value: 'App Routing Tag' })
export default class Tag extends JavaClass(
  'brightspot.example.app_routing.Tag',
  Content,
  ContentEditWidgetDisplay
) {
  @JavaField(String)
  @JavaRequired
  category: string

  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string;

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
