import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaSet from 'brightspot-types/java/util/Set'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentEditWidgetDisplay from 'brightspot-types/com/psddev/cms/tool/ContentEditWidgetDisplay'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import UrlsWidget from 'brightspot-types/com/psddev/cms/tool/content/UrlsWidget'

import Section from './Section'
import Tag from './Tag'

@DisplayName({ value: 'App Routing Article' })
export default class Article extends JavaClass(
  'brightspot.example.app_routing.Article',
  Content,
  ContentEditWidgetDisplay
) {
  @JavaField(String)
  @JavaRequired
  headline: string

  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string

  @JavaField(String)
  body?: string

  @JavaField(Section)
  @Indexed
  section: Section

  @JavaField(JavaSet.Of(Tag))
  @Indexed
  tags: JavaSet<Tag>;

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
