import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import Article from './Article'
import JavaClass from 'brightspot-types/JavaClass'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.graphql_restification.ArticleViewModel',
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
