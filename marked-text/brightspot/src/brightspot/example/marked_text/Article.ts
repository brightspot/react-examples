import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import RichText from 'brightspot-types/com/psddev/cms/db/ToolUi$RichText'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

import CustomRichTextToolbar from './CustomRichTextToolbar'

export default class Article extends JavaClass(
  'brightspot.example.marked_text.Article',
  Content,
  DirectoryItem
) {
  @Required
  @JavaField(String)
  headline: string

  @JavaField(String)
  subheadline?: string

  @JavaField(String)
  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    lines: 5,
  })
  body?: string;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.headline)
  }
}
