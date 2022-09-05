import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.apq.ArticleViewModel',
  ViewModel.Of(Article)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getBody(): string {
    return this.model.body
  }
}
