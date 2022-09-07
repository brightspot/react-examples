import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import App from './App'
import PageViewModel from './PageViewModel'
import Page from './Page'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import Class from 'brightspot-types/java/lang/Class'

@ViewInterface
export default class AppViewModel extends JavaClass(
  'brightspot.example.app_routing.AppViewModel',
  ViewModel.Of(App),

  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @JavaMethodParameters()
  @JavaMethodReturn(PageViewModel)
  getPage(): PageViewModel {
    let page = Query['from(java.lang.Class)'](Page.class)[
      'where(java.lang.String,java.lang.Object[])'
    ]('* matches *')
    return this.createView(PageViewModel.class as Class<PageViewModel>, page)
  }
}
