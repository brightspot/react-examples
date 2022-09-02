import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Color from './Color'

@ViewInterface
export default class ColorViewModel extends JavaClass(
  'brightspot.example.colors.ColorViewModel',
  ViewModel.Of(Color)
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getName(): string {
    return this.model.name
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getHexValue(): string {
    return this.model.name === 'Brightspot' && !this.model.hex_value
      ? '#ee0120'
      : this.model.hex_value
  }
}
