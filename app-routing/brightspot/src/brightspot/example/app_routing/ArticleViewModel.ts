import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import Page from './Page'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.app_routing.ArticleViewModel',
  ViewModel.Of(Article),
  PageEntryView
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
  @JavaMethodReturn(Page)
  getPage(): Page {
    return this.model.page
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPublishDate(): string {
    console.log('BELLA', this.model.getPublishDate().toString())
    return this.model.getPublishDate().toString()
  }
}
