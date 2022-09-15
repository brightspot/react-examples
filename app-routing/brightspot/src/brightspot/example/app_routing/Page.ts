import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import StringUtils from 'brightspot-types/com/psddev/dari/util/StringUtils'

@DisplayName({ value: 'App Routing Page' })
export default class Page extends JavaClass(
  'brightspot.example.app_routing.Page',
  Content
) {
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  name: string

  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string

  beforeCommit(): void {
    this.slug = StringUtils.toNormalized(this.slug)
  }
}
