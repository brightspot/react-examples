import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PreviewEntryView from 'brightspot-types/com/psddev/cms/view/PreviewEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Course from './Course'

@ViewInterface
export default class CourseViewModel extends JavaClass(
  'brightspot.example.headless_preview.CourseViewModel',
  ViewModel.Of(Course),
  PreviewEntryView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSlug(): string {
    return this.model.slug
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.model.title
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAgeRange(): string {
    return this.model.ageRange
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getSubject(): string {
    return this.model.subject
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getDescription(): string {
    return this.model.description
  }
}
