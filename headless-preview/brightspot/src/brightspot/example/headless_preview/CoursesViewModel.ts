import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Course from './Course'
import CourseViewModel from './CourseViewModel'
import HeadlessPreviewEndpoint from './HeadlessPreviewEndpoint'
import PreviewEntryView from 'brightspot-types/com/psddev/cms/view/PreviewEntryView'

@ViewInterface
export default class CoursesViewModel extends JavaClass(
  'brightspot.example.headless_preview.CoursesViewModel',
  ViewModel.Of(HeadlessPreviewEndpoint),
  PreviewEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(CourseViewModel))
  getCourses(): List<CourseViewModel> {
    return this.createViews(
      CourseViewModel.getClass(),
      Query.from(Course.getClass()).selectAll()
    ) as unknown as List<CourseViewModel>
  }
}
