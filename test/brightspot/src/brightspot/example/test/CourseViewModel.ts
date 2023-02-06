import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Course from './Course'
import CourseModuleView from './CourseModuleView'

@ViewInterface
export default class CourseViewModel extends JavaClass(
  'brightspot.example.test.CourseViewModel',
  ViewModel.Of(Course),
  CourseModuleView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }
}
