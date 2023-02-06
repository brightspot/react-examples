import JavaInterface from 'brightspot-types/JavaInterface'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

export default abstract class CourseModuleView extends JavaInterface(
  'brightspot.example.test.CourseModuleView'
) {
  @JavaMethodParameters(String)
  @JavaMethodReturn(String)
  foo(x: string): string {
    return ''
  }
}
