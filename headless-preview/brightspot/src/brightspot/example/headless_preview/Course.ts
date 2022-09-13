import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentDeliveryPreviewType from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryPreviewType'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import List from 'brightspot-types/java/util/List'
import Preview from 'brightspot-types/com/psddev/cms/db/Preview'
import PreviewType from 'brightspot-types/com/psddev/cms/preview/PreviewType'
import PreviewTypeSupplier from 'brightspot-types/com/psddev/cms/preview/PreviewTypeSupplier'

import Note from 'brightspot-types/com/psddev/cms/db/ToolUi$Note'
import ReadOnly from 'brightspot-types/com/psddev/cms/db/ToolUi$ReadOnly'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import HeadlessPreviewEndpoint from './HeadlessPreviewEndpoint'
import Class from 'brightspot-types/java/lang/Class'
import Singleton from 'brightspot-types/com/psddev/dari/db/Singleton'

export default class Course extends JavaClass(
  'brightspot.example.headless_preview.Course',
  Content,
  DirectoryItem,
  PreviewTypeSupplier
) {

  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  @Note({
    value:
      'Required title that appears at the top of each course page and also determines the pathname',
  })
  title: string

  @JavaField(String)
  @Note({ value: 'Optional subtitle supports the title for the course' })
  subtitle?: string

  @JavaField(String)
  @Note({ value: 'Optional paragraph(s) for the course' })
  content?: string

  @JavaField(String)
  @ReadOnly
  path?: string

  beforeCommit(): void {
    this.path = this.getPermalink()
  }

  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.title)
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
