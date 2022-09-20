import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'


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
