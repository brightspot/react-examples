import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import PreviewEntryView from 'brightspot-types/com/psddev/cms/view/PreviewEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Instructor from './Instructor'

@ViewInterface
export default class InstructoreViewModel extends JavaClass(
  'brightspot.example.headless_preview.InstructorViewModel',
  ViewModel.Of(Instructor),
  PreviewEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSlug(): string {
    return this.model.slug
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getName(): string {
    return this.model.name
  }
}
