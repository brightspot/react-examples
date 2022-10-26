import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Image from './Image'

import StorageItem from 'brightspot-types/com/psddev/dari/util/StorageItem'

@ViewInterface
export default class StorageItemViewModel extends JavaClass(
  'brightspot.example.images.StorageItemViewModel',
  // TODO: determine the cause of the following warning
  ViewModel.Of(StorageItem) // warning can be ignored
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getUrl(): string {
    return this.model.getSecurePublicUrl()
  }
}
