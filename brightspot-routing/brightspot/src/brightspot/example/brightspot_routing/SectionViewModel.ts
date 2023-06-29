import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import DirectoryData from 'brightspot-types/com/psddev/cms/db/Directory$Data'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import ArticleViewModel from './ArticleViewModel'
import DirectoryPathViewModel from './DirectoryPathViewModel'
import Section from './Section'

@ViewInterface
export default class SectionViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.SectionViewModel',
  ViewModel.Of(Section)
  // TODO: implement marker interface
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getName(): string {
    return this.model.name
  }

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(ArticleViewModel))
  getArticles(): List<ArticleViewModel> {
    const articles = Query.from(Article.getClass())
      .where('section = ?', this.model)
      .selectAll()

    return super.createViews(ArticleViewModel.getClass(), articles)
  }

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(DirectoryPathViewModel))
  getPaths(): List<DirectoryPathViewModel> {
    return this.createViews(
      DirectoryPathViewModel.getClass(),
      this.model.as(DirectoryData.class).getPaths()
    )
  }
}
