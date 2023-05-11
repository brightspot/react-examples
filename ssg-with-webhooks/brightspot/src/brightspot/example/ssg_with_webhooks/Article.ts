import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

import Section from './Section'

@DisplayName({ value: 'SSG Article' })
export default class Article extends JavaClass(
  'brightspot.example.ssg_with_webhooks.Article',
  Content,
  DirectoryItem
) {
  @JavaField(String)
  headline?: string

  @JavaField(String)
  body?: string

  @JavaField(Section)
  @Indexed
  section?: Section;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    if (!this.headline) {
      return null
    }

    return (
      Utils.toNormalized(this.section?.name ?? '') +
      '/' +
      Utils.toNormalized(this.headline)
    )
  }
}
