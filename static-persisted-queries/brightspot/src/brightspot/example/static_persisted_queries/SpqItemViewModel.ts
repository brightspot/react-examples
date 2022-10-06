import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import SpqItem from './SpqItem'

@ViewInterface
export default class SpqItemViewModel extends JavaClass(
  'brightspot.example.static_persisted_queries.SpqItemViewModel',
  ViewModel.Of(SpqItem)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getBody(): string {
    return this.model.body
  }
}
