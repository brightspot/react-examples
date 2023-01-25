import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import Article from './Article'
import AuthorViewModel from './AuthorViewModel'
import SectionViewModel from './SectionViewModel'
import DirectoryData from 'brightspot-types/com/psddev/cms/db/Directory$Data'
import DirectoryDataViewModel from './DirectoryDataViewModel'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.ArticleViewModel',
  ViewModel.Of(Article)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(AuthorViewModel)
  getAuthor(): AuthorViewModel {
    return this.createView(AuthorViewModel.getClass(), this.model.author)
  }

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
      return this.createView(SectionViewModel.getClass(), this.model.section)
    }
  }

  @JavaMethodParameters()
  @JavaMethodReturn(DirectoryDataViewModel)
  getDirectoryData(): DirectoryDataViewModel {
    return this.createView(
      DirectoryDataViewModel.getClass(),
      this.model.as(DirectoryData.class)
    )
  }
}
