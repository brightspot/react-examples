import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import AppRoutingEndpoint from './AppRoutingEndpoint'
import Tag from './Tag'
import TagViewModel from './TagViewModel'

@ViewInterface
export default class AllTagsViewModel extends JavaClass(
  'brightspot.example.app_routing.AllTagsViewModel',
  ViewModel.Of(AppRoutingEndpoint)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(TagViewModel))
  getTags(): List<TagViewModel> {
    return this.createViews(
      TagViewModel.getClass(),
      Query.from(Tag.getClass()).selectAll()
    )
  }
}
