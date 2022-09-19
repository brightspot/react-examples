import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Article from './Article'
import SectionViewModel from './SectionViewModel'
import TagViewModel from './TagViewModel'
import List from 'brightspot-types/java/util/List'

@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.app_routing.ArticleViewModel',
  ViewModel.Of(Article),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSlug(): string {
    return this.model.slug
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
  @JavaMethodReturn(SectionViewModel)
  getSection(): SectionViewModel {
    return this.createView(
      SectionViewModel.class as Class<SectionViewModel>,
      this.model.section
    )
  }

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(TagViewModel))
  getTags(): List<TagViewModel> {
    return this.createViews(
      TagViewModel.class as Class<TagViewModel>,
      this.model.tags
    ) as undefined as List<TagViewModel>
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPublishDate(): string {
    return this.model.getPublishDate().toString()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getId(): string {
    return this.model.getId().toString()
  }
}
