import JavaClass from 'brightspot-types/JavaClass'
import Content from 'brightspot-types/com/psddev/cms/db/Content'
import JavaField from 'brightspot-types/JavaField'
import JavaRequired from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import PreviewType from 'brightspot-types/com/psddev/cms/preview/PreviewType'
import List from 'brightspot-types/java/util/List'
import ContentDeliveryPreviewType from 'brightspot-types/com/psddev/graphql/cda/ContentDeliveryPreviewType'
import PreviewTypeSupplier from 'brightspot-types/com/psddev/cms/preview/PreviewTypeSupplier'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'
import Preview from 'brightspot-types/com/psddev/cms/db/Preview'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import WebParameter from 'brightspot-types/com/psddev/dari/web/annotation/WebParameter'

export default class Page extends JavaClass(
  'brightspot.example.pages.Page',
  Content,
  DirectoryItem,
  PreviewTypeSupplier
) {
  [`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
    return Utils.toNormalized(this.title)
  }

  @JavaRequired
  @JavaField(String)
  @Indexed({ unique: true })
  title: string

  @JavaField(String)
  subtitle?: string

  @JavaField(String)
  content?: string

  @JavaField(String)
  callToActionLink?: string;

  [`getPreviewTypes(com.psddev.cms.db.Preview)`](
    preview: Preview
  ): List<PreviewType> {
    let previewTypes = new Array<PreviewType>()
    let contentDeliveryPreviewType = new ContentDeliveryPreviewType()
    console.log('HERE IS YOUR TITLE ✨ ✨ ✨: ', this.title)

    if (this.title) {
      contentDeliveryPreviewType.setPreviewUrl(
        `http://localhost:3000/${this.title}`
      )
      console.log(
        'HERE IS THE URL  ✨ ✨ ✨: ',
        contentDeliveryPreviewType['getPreviewUrl()']()
      )
    } else {
      contentDeliveryPreviewType.setPreviewUrl(`http://localhost:3000`)
    }

    previewTypes.push(contentDeliveryPreviewType)
    return previewTypes as unknown as List<PreviewType>
  }
}
