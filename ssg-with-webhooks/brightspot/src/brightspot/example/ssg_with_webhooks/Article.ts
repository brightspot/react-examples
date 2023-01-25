import Content from 'brightspot-types/com/psddev/cms/db/Content'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Author from './Author'
import Section from './Section'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import Optional from 'brightspot-types/java/util/Optional'

export default class Article extends JavaClass(
  'brightspot.example.ssg_with_webhooks.Article',
  Content,
  DirectoryItem
) {
  // @JavaField(Author)
  // author?: Author

  @JavaField(String)
  headline?: string

  @JavaField(String)
  body?: string

  @JavaField(Section)
  @Indexed
  section?: Section;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    const sectionSlug = Utils.toNormalized(
      Optional.ofNullable(this.section?.name).orElse('')
    )

    const headlineSlug =
      '/' + Utils.toNormalized(Optional.ofNullable(this.headline).orElse(''))

    return sectionSlug + headlineSlug
  }
}
