import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Tag from './Tag'
import TagViewModel from './TagViewModel'
import AppRoutingEndpoint from './AppRoutingEndpoint'

@ViewInterface
export default class TagsViewModel extends JavaClass(
  'brightspot.example.app_routing.TagsViewModel',
  ViewModel.Of(AppRoutingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(TagViewModel))
  getTags(): List<TagViewModel> {
    return super.createViews(
      TagViewModel.class,
      Query.from(Tag.class).selectAll()
    ) as unknown as List<TagViewModel>
  }
}
