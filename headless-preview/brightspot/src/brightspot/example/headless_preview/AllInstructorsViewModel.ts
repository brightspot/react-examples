import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import PreviewEntryView from 'brightspot-types/com/psddev/cms/view/PreviewEntryView'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import HeadlessPreviewEndpoint from './HeadlessPreviewEndpoint'
import Instructor from './Instructor'
import InstructorViewModel from './InstructorViewModel'

@ViewInterface
export default class AllInstructorsViewModel extends JavaClass(
  'brightspot.example.headless_preview.AllInstructorsViewModel',
  ViewModel.Of(HeadlessPreviewEndpoint),
  PreviewEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(InstructorViewModel))
  getInstructors(): List<InstructorViewModel> {
    return this.createViews(
      InstructorViewModel.getClass(),
      Query.from(Instructor.getClass()).selectAll()
    )
  }
}
