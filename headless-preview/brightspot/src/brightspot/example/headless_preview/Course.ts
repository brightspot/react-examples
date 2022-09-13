import Class from 'brightspot-types/java/lang/Class'
import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentDeliveryPreviewType from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryPreviewType'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import List from 'brightspot-types/java/util/List'
import Preview from 'brightspot-types/com/psddev/cms/db/Preview'
import PreviewType from 'brightspot-types/com/psddev/cms/preview/PreviewType'
import PreviewTypeSupplier from 'brightspot-types/com/psddev/cms/preview/PreviewTypeSupplier'
import Note from 'brightspot-types/com/psddev/cms/db/ToolUi$Note'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'
import StringUtils from 'brightspot-types/com/psddev/dari/util/StringUtils'

import HeadlessPreviewEndpoint from './HeadlessPreviewEndpoint'
import Enum from 'brightspot-types/java/lang/Enum'
import Values from 'brightspot-types/com/psddev/dari/db/Recordable$Values'

export default class Course extends JavaClass(
  'brightspot.example.headless_preview.Course',
  Content,
  PreviewTypeSupplier,
) {
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  @Note({ value: 'slug used for course url' })
  slug: string

  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  title: string

  @JavaField(String)
  @Values({value: ['1st grade', '2nd grade', '3rd grade', '4th grade', '5th grade', '6th grade', '7th grade', '8th grade', 'highschool']})
  ageRange: string

  @JavaField(String)
  @Values({value: ['Math', 'Science', 'English', 'Social Studies', 'Coding', 'Fitness', 'Languages', 'Art']})
  subject: string

  @JavaField(String)
  description?: string

  beforeCommit(): void {
    this.slug = StringUtils.toNormalized(this.slug);
  }

  [`getPreviewTypes(com.psddev.cms.db.Preview)`](
    preview: Preview
  ): List<PreviewType> {
    let headlessPreviewUrl = Singleton.getInstance(
      HeadlessPreviewEndpoint.class as Class<HeadlessPreviewEndpoint>).previewUrl
      || 'http://localhost:3000/brightspot-preview'
    let contentDeliveryPreviewType = new ContentDeliveryPreviewType()
    contentDeliveryPreviewType.setPreviewUrl(
      headlessPreviewUrl
    )
  
    return [contentDeliveryPreviewType] as unknown as List<PreviewType>
  }
}
