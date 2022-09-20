import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.restification.ArticleViewModel',
  ViewModel.Of(Article),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getHeadline(): string {
    return this.model.headline
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSubheadline(): string {
    return this.model.subheadline
  }
}
