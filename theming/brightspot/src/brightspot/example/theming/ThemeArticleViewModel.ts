import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import ViewTemplate from 'brightspot-types/com/psddev/cms/view/ViewTemplate'

import ThemeArticle from './ThemeArticle'
import ViewModelOverlayValueEntryView from 'brightspot-types/com/psddev/cms/view/ViewModelOverlayValueEntryView'

@ViewInterface
@ViewTemplate({ value: '/themeArticle' })
export default class ThemeArticleViewModel extends JavaClass(
  'brightspot.example.theming.ThemeArticleViewModel',
  ViewModel.Of(ThemeArticle),
  ViewModelOverlayValueEntryView
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
