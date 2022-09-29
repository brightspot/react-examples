import Class from 'brightspot-types/java/lang/Class'
import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import ArticleViewModel from './ArticleViewModel'
import Tag from './Tag'

@ViewInterface
export default class TagViewModel extends JavaClass(
  'brightspot.example.app_routing.TagViewModel',
  ViewModel.Of(Tag),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSlug(): string {
    return this.model.slug
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getCategory(): string {
    return this.model.category
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getId(): string {
    return this.model.getId().toString()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    let articles = Query.from(Article.class)
      .where('tags matches  ?', this.model)
      .selectAll()
    return super.createViews(
      ArticleViewModel.class as Class<ArticleViewModel>,
      articles
    ) as unknown as List<ArticleViewModel>
  }
}