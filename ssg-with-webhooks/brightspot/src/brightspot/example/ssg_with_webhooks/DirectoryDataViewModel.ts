import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import JavaSet from 'brightspot-types/java/util/Set'

import DirectoryData from 'brightspot-types/com/psddev/cms/db/Directory$Data'
import JavaRecord from 'brightspot-types/com/psddev/dari/db/Record'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import DirectoryPathViewModel from './DirectoryPathViewModel'

@ViewInterface
export default class DirectoryDataViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.DirectoryDataViewModel',
  ViewModel.Of(JavaRecord)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(JavaSet.Of(DirectoryPathViewModel))
  getPaths(): JavaSet<DirectoryPathViewModel> {
    return this.createViews(
      DirectoryPathViewModel.getClass(),
      this.model.as(DirectoryData.class).getPaths()
    )
  }
}
