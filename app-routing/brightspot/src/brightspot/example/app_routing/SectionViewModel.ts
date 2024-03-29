import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import ArticleViewModel from './ArticleViewModel'
import Section from './Section'

@ViewInterface
export default class SectionViewModel extends JavaClass(
  'brightspot.example.app_routing.SectionViewModel',
  ViewModel.Of(Section)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getName(): string {
    return this.model.name
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSlug(): string {
    return this.model.slug
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getId(): string {
    return this.model.getId().toString()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    let articles = Query.from(Article.getClass())
      .where('section = ?', this.model)
      .selectAll()
    return this.createViews(ArticleViewModel.getClass(), articles)
  }
}
