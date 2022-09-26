import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import SectionViewModel from './SectionViewModel'
import Long from 'brightspot-types/java/lang/Long'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.ArticleViewModel',
  ViewModel.Of(Article)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getHeadline(): string {
    return this.model.headline
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getBody(): string {
    return this.model.body
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPath(): string {
    return this.model.getPermalink()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Number)
  getPublishDate(): number {
    return this.model.getPublishDate().getTime()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(SectionViewModel)
  getSection(): SectionViewModel {
    if (this.model.section) {
      return super.createView(
        SectionViewModel.class as Class<SectionViewModel>,
        this.model.section
      )
    } else return null
  }
}
