import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

export default class Section extends JavaClass(
  'brightspot.example.ssg_with_webhooks.Section',
  Content,
  DirectoryItem
) {
  @JavaField(String)
  name?: string;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.name)
  }
}
