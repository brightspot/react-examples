import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import RteMarkedText from 'brightspot-types/com/psddev/cms/mark/RteMarkedText'
import RteMarkedTextViewModel from 'brightspot-types/com/psddev/cms/mark/view/RteMarkedTextViewModel'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

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
  @JavaMethodReturn(RteMarkedTextViewModel)
  getBody(): RteMarkedTextViewModel {
    return this.createView(
      RteMarkedTextViewModel.class,
      RteMarkedText.getInstanceFromRichText(this.model, this.model.body)
    )
  }
}
