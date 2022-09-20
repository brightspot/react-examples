import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

@DisplayName({ value: 'Article (REST)' })
export default class Article extends JavaClass(
  'brightspot.example.restification.Article',
  Content,
  DirectoryItem
) {
  @JavaRequired
  @JavaField(String)
  headline?: string

  @JavaField(String)
  subheadline?: string;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.headline)
  }
}
