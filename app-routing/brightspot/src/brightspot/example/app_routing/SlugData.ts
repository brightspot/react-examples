import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentEditWidgetDisplay from 'brightspot-types/com/psddev/cms/tool/ContentEditWidgetDisplay'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import UrlsWidget from 'brightspot-types/com/psddev/cms/tool/content/UrlsWidget'
import Modification from 'brightspot-types/com/psddev/dari/db/Modification'
import ModificationClasses from 'brightspot-types/com/psddev/dari/db/Modification$Classes'
import Section from './Section'
import Article from './Article'
import Abstract from 'brightspot-types/com/psddev/dari/db/Recordable$Abstract'


//TODO: work on this functionality
// @Abstract
export default class SlugData extends JavaClass(
  'brightspot.example.app_routing.SlugData',
  Content
) {
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug2: string
}
