import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import DirectoryPath from 'brightspot-types/com/psddev/cms/db/Directory$Path'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import PathType from 'brightspot-types/com/psddev/cms/db/Directory$PathType'

@ViewInterface
export default class DirectoryPathViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.DirectoryPathViewModel',
  ViewModel.Of(DirectoryPath)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPath(): string {
    return this.model.getPath()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(Boolean)
  getIsRedirect(): boolean {
    return this.model.getType() === PathType.REDIRECT ||
      this.model.getType() === PathType.REDIRECT_TEMPORARY
      ? true
      : false
  }
}
