import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AppViewModel from './AppViewModel'
import Article from './Article'
import ArticleViewModel from './ArticleViewModel'
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
  @JavaMethodReturn(AppViewModel)
  getApp(): AppViewModel {
    return this.createView(
      AppViewModel.class as Class<AppViewModel>,
      this.model.app
    )
  }
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPageId(): string {
    return this.model.getId().toString()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    const PAGE = 'page'
    let articles = Query.from(Article.class)
      .where(PAGE + ' matches  ?', this.getPageId())
      .selectAll()
    return this.createViews(
      ArticleViewModel.class as Class<ArticleViewModel>,
      articles
    ) as undefined as List<ArticleViewModel>
  }
}
