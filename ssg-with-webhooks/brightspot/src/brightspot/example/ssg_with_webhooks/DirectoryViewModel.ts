import Directory from 'brightspot-types/com/psddev/cms/db/Directory'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

@ViewInterface
export default class DirectoryViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.DirectoryViewModel',
  ViewModel.Of(Directory)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPath(): string {
    return this.model.getPath()
  }
}
