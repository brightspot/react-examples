import Class from 'brightspot-types/java/lang/Class'
import List from 'brightspot-types/java/util/List'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentDeliveryPreviewType from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryPreviewType'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Preview from 'brightspot-types/com/psddev/cms/db/Preview'
import PreviewType from 'brightspot-types/com/psddev/cms/preview/PreviewType'
import PreviewTypeSupplier from 'brightspot-types/com/psddev/cms/preview/PreviewTypeSupplier'
import Note from 'brightspot-types/com/psddev/cms/db/ToolUi$Note'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import Values from 'brightspot-types/com/psddev/dari/db/Recordable$Values'

import HeadlessPreviewEndpoint from './HeadlessPreviewEndpoint'
// import CourseViewModel from './CourseViewModel'

export default class Course extends JavaClass(
  'brightspot.example.headless_preview.Course',
  Content,
  PreviewTypeSupplier
) {
  @JavaField(String)
  @JavaRequired
  title: string

  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  @Note({ value: 'slug used for course url' })
  slug: string

  @JavaField(String)
  @JavaRequired
  @Values({
    value: [
      '1st Grade',
      '2nd Grade',
      '3rd Grade',
      '4th Grade',
      '5th Grade',
      '6th Grade',
      '7th Grade',
      '8th Grade',
      'Highschool',
    ],
  })
  ageRange: string

  @JavaField(String)
  @JavaRequired
  @Values({
    value: [
      'Math',
      'Science',
      'English',
      'Social Studies',
      'Coding',
      'Fitness',
      'Languages',
      'Art',
    ],
  })
  subject: string

  @JavaField(String)
  @JavaRequired
  description?: string;

  [`getPreviewTypes(com.psddev.cms.db.Preview)`](
    preview: Preview
  ): List<PreviewType> {
    let headlessPreviewUrl =
      Singleton.getInstance(HeadlessPreviewEndpoint.getClass()).previewUrl ||
      'http://localhost:3000/courses/brightspot-preview'
    let contentDeliveryPreviewType = new ContentDeliveryPreviewType()
    contentDeliveryPreviewType.setPreviewUrl(headlessPreviewUrl)
    //TODO: this should be used instead of PageEntryView
    // contentDeliveryPreviewType.setEntryViewClass('brightspot.example.headless_preview.CourseViewModel')

    return [contentDeliveryPreviewType] as unknown as List<PreviewType>
  }
}
