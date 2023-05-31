import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import List from 'brightspot-types/java/util/List'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import ThemeArticle from './ThemeArticle'
import ThemeArticleViewModel from './ThemeArticleViewModel'
import ThemingEndpoint from './ThemingEndpoint'

@ViewInterface
export default class ThemeArticlesViewModel extends JavaClass(
  'brightspot.example.theming.ThemeArticlesViewModel',
  ViewModel.Of(ThemingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ThemeArticleViewModel))
  getThemeArticles(): List<ThemeArticleViewModel> {
    return this.createViews(
      ThemeArticleViewModel.getClass(),
      Query.from(ThemeArticle.getClass()).selectAll()
    )
  }
}
