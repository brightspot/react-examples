import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import List from 'brightspot-types/java/util/List'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import ThemingArticle from './ThemingArticle'
import ThemingArticleViewModel from './ThemingArticleViewModel'
import ThemingEndpoint from './ThemingEndpoint'

@ViewInterface
export default class ThemingArticlesViewModel extends JavaClass(
  'brightspot.example.theming.ThemingArticlesViewModel',
  ViewModel.Of(ThemingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ThemingArticleViewModel))
  getThemingArticles(): List<ThemingArticleViewModel> {
    return this.createViews(
      ThemingArticleViewModel.getClass(),
      Query.from(ThemingArticle.getClass()).selectAll()
    )
  }
}
