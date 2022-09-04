import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import App from './App'
import Page from './Page'

@ViewInterface
export default class PageViewModel extends JavaClass(
  'brightspot.example.app_routing.PageViewModel',
  ViewModel.Of(Page),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getName(): string {
    return this.model.name
  }

  @JavaMethodParameters()
  @JavaMethodReturn(App)
  getApp(): App {
    return this.model.app
  }
}
