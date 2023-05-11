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
import SsgWithWebhooksEndpoint from './SsgWithWebhooksEndpoints'

@ViewInterface
export default class AllArticlesViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.AllArticlesViewModel',
  ViewModel.Of(SsgWithWebhooksEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    return this.createViews(
      ArticleViewModel.getClass(),
      Query.from(Article.getClass())
        .where(DirectoryStatic.hasPathPredicate())
        .selectAll()
    )
  }
}
