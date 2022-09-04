import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import PageViewModel from './PageViewModel'
import PagesEndpoint from './PagesEndpoint'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import Page from './Page'

@ViewInterface
export default class PagesViewModel extends JavaClass(
  'brightspot.example.pages.PagesViewModel',
  ViewModel.Of(PagesEndpoint),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(PageViewModel))
  getPages(): List<PageViewModel> {
    const query = Query.from(Page.class).selectAll()
    const list = super.createViews(PageViewModel.class, query)
    return list as unknown as List<PageViewModel>
  }
}
