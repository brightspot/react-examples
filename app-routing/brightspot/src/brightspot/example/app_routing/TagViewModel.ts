import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import ArticleViewModel from './ArticleViewModel'
import Tag from './Tag'

@ViewInterface
export default class TagViewModel extends JavaClass(
  'brightspot.example.app_routing.TagViewModel',
  ViewModel.Of(Tag)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getCategory(): string {
    return this.model.category
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
      .where('tags matches  ?', this.model)
      .selectAll()
    return this.createViews(
      ArticleViewModel.getClass(),
      articles
    ) as unknown as List<ArticleViewModel>
  }
}
