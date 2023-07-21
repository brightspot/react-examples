import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'
import Long from 'brightspot-types/java/lang/Long'

import DirectoryData from 'brightspot-types/com/psddev/cms/db/Directory$Data'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import DirectoryPathViewModel from './DirectoryPathViewModel'
import SectionViewModel from './SectionViewModel'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.ArticleViewModel',
  ViewModel.Of(Article)
  // TODO: implement marker interface
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
  @JavaMethodReturn(Long)
  getPublishDate(): Long {
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
  @JavaMethodReturn(List.Of(DirectoryPathViewModel))
  getPaths(): List<DirectoryPathViewModel> {
    return this.createViews(
      DirectoryPathViewModel.getClass(),
      this.model.as(DirectoryData.class).getPaths()
    )
  }
}
