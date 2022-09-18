import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Tag from './Tag'


@ViewInterface
export default class TagViewModel extends JavaClass(
  'brightspot.example.app_routing.TagViewModel',
  ViewModel.Of(Tag),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getCategory(): string {
    return this.model.category
  }
}
