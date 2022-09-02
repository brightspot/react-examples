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

export default class Page extends JavaClass(
  'brightspot.example.pages.Page',
  Content,
  DirectoryItem,
  PreviewTypeSupplier
) {
  @JavaRequired
  @JavaField(String)
  title: string

  @JavaField(String)
  subtitle?: string

  @JavaField(String)
  catchPhrase?: string

  createPermalink(site: Site): string {
    return Utils.toNormalized(this.title)
  }

  getPreviewTypes(): List<PreviewType> {
    let previewTypes = new Array<PreviewType>()
    let myCDPT = new ContentDeliveryPreviewType()
    myCDPT.setPreviewUrl('http://localhost:3000')

    previewTypes.push(myCDPT)
    return previewTypes as unknown as List<PreviewType>
  }
}
