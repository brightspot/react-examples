import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import RichText from 'brightspot-types/com/psddev/cms/db/ToolUi$RichText'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

import CustomRichTextToolbar from './CustomRichTextToolbar'

@DisplayName({ value: 'Article: Marked Text Advanced' })
export default class Article extends JavaClass(
  'brightspot.example.marked_text_advanced.Article',
  Content,
  DirectoryItem
) {
  @Required
  @JavaField(String)
  headline: string

  @JavaField(String)
  @RichText({
    toolbar: CustomRichTextToolbar.getClass(),
    inline: false,
    lines: 5,
  })
  body?: string;

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.headline)
  }
}
