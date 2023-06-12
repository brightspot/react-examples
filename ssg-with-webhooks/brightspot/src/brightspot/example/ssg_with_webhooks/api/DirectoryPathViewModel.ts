import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import DirectoryPath from 'brightspot-types/com/psddev/cms/db/Directory$Path'

@ViewInterface
export default class DirectoryPathViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.api.DirectoryPathViewModel',
  ViewModel.Of(DirectoryPath)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPath(): string {
    return this.model.getPath()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSite(): string {
    return this.model.getSite()?.getPrimaryUrl()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getType(): string {
    return this.model.getType().toString()
  }
}
