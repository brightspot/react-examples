import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import ArticleViewModel from './ArticleViewModel'
import AppRoutingEndpoint from './AppRoutingEndpoint'

@ViewInterface
export default class ArticlesViewModel extends JavaClass(
  'brightspot.example.app_routing.ArticlesViewModel',
  ViewModel.Of(AppRoutingEndpoint),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    return super.createViews(
      ArticleViewModel.class,
      Query.from(Article.class).selectAll()
    ) as unknown as List<ArticleViewModel>
  }
}
