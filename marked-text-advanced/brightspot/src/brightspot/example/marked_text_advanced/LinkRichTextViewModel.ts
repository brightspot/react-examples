import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import CurrentSite from 'brightspot-types/com/psddev/cms/page/CurrentSite'
import RteMarkDataView from 'brightspot-types/com/psddev/cms/mark/view/RteMarkDataView'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import LinkRichTextElement from './LinkRichTextElement'

@ViewInterface
export default class LinkRichTextElementViewModel extends JavaClass(
  'brightspot.example.marked_text_advanced.LinkRichTextElementViewModel',
  ViewModel.Of(LinkRichTextElement),
  RteMarkDataView
) {
  @CurrentSite
  @JavaField(Site)
  site: Site

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getHref(): string {
    return this.model.getUrl()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTarget(): string {
    return this.model.getTarget()
  }
}
