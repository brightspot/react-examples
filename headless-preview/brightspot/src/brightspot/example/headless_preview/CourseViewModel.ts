import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import PageEntryView from 'brightspot-types/com/psddev/cms/view/PageEntryView'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import Course from './Course'

@ViewInterface
export default class CourseViewModel extends JavaClass(
  'brightspot.example.headless_preview.CourseViewModel',
  ViewModel.Of(Course),
  PageEntryView
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
  getSubtitle(): string {
    return this.model.subject
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getContent(): string {
    return this.model.description
  }
}
