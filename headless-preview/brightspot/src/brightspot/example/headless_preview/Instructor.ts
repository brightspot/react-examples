import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import List from 'brightspot-types/java/util/List'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import ContentDeliveryPreviewType from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryPreviewType'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Preview from 'brightspot-types/com/psddev/cms/db/Preview'
import PreviewType from 'brightspot-types/com/psddev/cms/preview/PreviewType'
import PreviewTypeSupplier from 'brightspot-types/com/psddev/cms/preview/PreviewTypeSupplier'

export default class Instructor extends JavaClass(
  'brightspot.example.headless_preview.Instructor',
  Content,
  PreviewTypeSupplier
) {
  @JavaField(String)
  @JavaRequired
  name: string

  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string;

  [`getPreviewTypes(com.psddev.cms.db.Preview)`](
    preview: Preview
  ): List<PreviewType> {
    let headlessPreviewUrl =
      'http://localhost:3000/instructors/brightspot-preview'
    let contentDeliveryPreviewType = new ContentDeliveryPreviewType()
    contentDeliveryPreviewType.setPreviewUrl(headlessPreviewUrl)
    contentDeliveryPreviewType.setEntryViewClass(
      'brightspot-types/com/psddev/cms/view/PreviewEntryView'
    )
    return [contentDeliveryPreviewType] as unknown as List<PreviewType>
  }
}
