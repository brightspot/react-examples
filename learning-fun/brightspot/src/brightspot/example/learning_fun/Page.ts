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

export default class Page extends JavaClass(
  'brightspot.example.learning_fun.Page',
  Content,
  PreviewTypeSupplier
) {
  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  @Note({
    value:
      'Required title that appears at the top of each page and also determines the pathname',
  })
  title: string

  @JavaField(String)
  @Note({ value: 'Optional subtitle supports the title for the page' })
  subtitle?: string

  @JavaField(String)
  @Note({ value: 'Optional paragraph(s) for the page' })
  content?: string;

  [`getPreviewTypes(com.psddev.cms.db.Preview)`](
    preview: Preview
  ): List<PreviewType> {
    let previewTypes = new Array<PreviewType>()
    let contentDeliveryPreviewType = new ContentDeliveryPreviewType()
    contentDeliveryPreviewType.setPreviewUrl(
      `http://localhost:3000/previewpage`
    )
    previewTypes.push(contentDeliveryPreviewType)
    return previewTypes as unknown as List<PreviewType>
  }
}
