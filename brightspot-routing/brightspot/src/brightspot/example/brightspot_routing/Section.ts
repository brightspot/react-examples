import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

@DisplayName({ value: 'Brightspot Routing Section' })
export default class Section extends JavaClass(
  'brightspot.example.brightspot_routing.Section',
  Content,
  DirectoryItem
) {
  @JavaField(String)
  @Required
  name?: string

  createPermalink(site: Site): string {
    return Utils.toNormalized(this.name)
  }
}
