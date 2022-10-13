import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import DirectoryData from 'brightspot-types/com/psddev/cms/db/Directory$Data'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import SectionViewModel from './SectionViewModel'
import DirectoryDataViewModel from './DirectoryDataViewModel'

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
      return this.createView(
        SectionViewModel.class as Class<SectionViewModel>,
        this.model.section
      )
    } else return null
  }

  @JavaMethodParameters()
  @JavaMethodReturn(DirectoryDataViewModel)
  getDirectoryData(): DirectoryDataViewModel {
    return this.createView(
      DirectoryDataViewModel.class as Class<DirectoryDataViewModel>,
      this.model.as(DirectoryData.class)
    )
  }
}
