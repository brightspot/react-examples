import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import DirectoryPath from 'brightspot-types/com/psddev/cms/db/Directory$Path'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

@ViewInterface
export default class DirectoryPathViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.DirectoryPathViewModel',
  ViewModel.Of(DirectoryPath)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPath(): string {
    return this.model.getPath()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getType(): string {
    return this.model.getType().toString()
  }
}
