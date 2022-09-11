import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AppViewModel from './AppViewModel'
import ArticleViewModel from './ArticleViewModel'
import Page from './Page'
import Article from './Article'
import Class from 'brightspot-types/java/lang/Class'
import List from 'brightspot-types/java/util/List'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
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
    console.log('CHOCOLATE ', this.model['getId()']())
    return this.model['getId()']().toString()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    const PAGE = 'page'
    let articlesQuery = Query.from(Article.class).where(
      PAGE + ' matches  ?',
      this.getPageId()
    )
    console.log('BELLA ', articlesQuery)
    const articles = articlesQuery.selectAll()
    console.log('SMORES ', articles)
    return this.createViews(
      ArticleViewModel.class as Class<ArticleViewModel>,
      articles
    ) as undefined as List<ArticleViewModel>
  }
}
