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
import List from 'brightspot-types/java/util/List'

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
  @JavaMethodReturn(List.Of(PageViewModel))
  getPages(): List<PageViewModel> {
    let pagesQuery = Query.from(Page.class).where('* matches *')

    const pages = pagesQuery.selectAll()

    return this.createViews(
      PageViewModel.class as Class<PageViewModel>,
      pages
    ) as undefined as List<PageViewModel>
  }
}
