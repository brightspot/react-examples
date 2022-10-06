import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import MarkedTextViewModel from 'brightspot-types/com/psddev/cms/mark/MarkedTextViewModel'

import Article from './Article'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.marked_text.ArticleViewModel',
  ViewModel.Of(Article)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getHeadline(): string {
    return this.model.headline
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSubheadline(): string {
    return this.model.subheadline
  }

  @JavaMethodParameters()
  @JavaMethodReturn(MarkedTextViewModel)
  getBody(): MarkedTextViewModel {
    return this.createView(MarkedTextViewModel.class, this.model.body)
  }
}
