import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

export default class BlogPost extends JavaClass(
  'brightspot.example.ssg_with_webhooks.models.BlogPost',
  Content,
  DirectoryItem
) {
  @JavaField(String)
  title?: string

  @JavaField(String)
  body?: string;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.title)
  }
}
