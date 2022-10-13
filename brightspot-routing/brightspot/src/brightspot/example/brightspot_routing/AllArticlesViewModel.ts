import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import DirectoryStatic from 'brightspot-types/com/psddev/cms/db/Directory$Static'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import ArticleViewModel from './ArticleViewModel'
import BrightspotRoutingEndpoint from './BrightspotRoutingEndpoint'

@ViewInterface
export default class AllArticlesViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.AllArticlesViewModel',
  ViewModel.Of(BrightspotRoutingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    return this.createViews(
      ArticleViewModel.class as Class<ArticleViewModel>,
      Query.from(Article.class)
        .where(DirectoryStatic.hasPathPredicate())
        .selectAll()
    ) as List<ArticleViewModel>
  }
}
