import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import Page from './Page'

@ViewInterface
export default class PageViewModel extends JavaClass(
  'brightspot.example.pages.PageViewModel',
  ViewModel.Of(Page),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getsubTitle(): string {
    return this.model.subtitle
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getContent(): string {
    return this.model.content
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getCallToActionLink(): string {
    return this.model.callToActionLink
  }
}
