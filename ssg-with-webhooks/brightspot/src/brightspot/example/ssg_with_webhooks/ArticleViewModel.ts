import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import DirectoryDataViewModel from './DirectoryDataViewModel'
import SectionViewModel from './SectionViewModel'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.ArticleViewModel',
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
    // TODO: remove null check once createView null object issue is resolved
    if (this.model.section) {
      return this.createView(SectionViewModel.getClass(), this.model.section)
    } else return null
  }

  @JavaMethodParameters()
  @JavaMethodReturn(DirectoryDataViewModel)
  getDirectoryData(): DirectoryDataViewModel {
    return this.createView(DirectoryDataViewModel.getClass(), this.model)
  }
}
