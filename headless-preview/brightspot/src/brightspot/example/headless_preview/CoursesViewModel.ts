import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Course from './Course'
import CourseViewModel from './CourseViewModel'
import HeadlessPreviewEndpoint from './HeadlessPreviewEndpoint'

@ViewInterface
export default class CoursesViewModel extends JavaClass(
  'brightspot.example.headless_preview.CoursesViewModel',
  ViewModel.Of(HeadlessPreviewEndpoint),
  PageEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(CourseViewModel))
  getCourses(): List<CourseViewModel> {
    return super.createViews(
      CourseViewModel.class,
      Query.from(Course.class).selectAll()
    ) as unknown as List<CourseViewModel>
  }
}
