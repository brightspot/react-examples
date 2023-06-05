import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import ViewTemplate from 'brightspot-types/com/psddev/cms/view/ViewTemplate'

import ThemingArticle from './ThemingArticle'

@ViewInterface
@ViewTemplate({ value: '/themingArticle' })
export default class ThemingArticleViewModel extends JavaClass(
  'brightspot.example.theming.ThemingArticleViewModel',
  ViewModel.Of(ThemingArticle),
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getHeadline(): string {
    return this.model.headline
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSlug(): string {
    return this.model.slug
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getBody(): string {
    return this.model.body
  }
}
