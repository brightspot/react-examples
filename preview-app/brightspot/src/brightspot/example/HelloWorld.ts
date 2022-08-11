import JavaClass from '../../../brightspot-types/JavaClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'
import JavaField from '../../../brightspot-types/JavaField'
import JavaRequired from '../../../brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from '../../../brightspot-types/com/psddev/cms/db/Site'
import DirectoryItem from '../../../brightspot-types/com/psddev/cms/db/Directory$Item'
import PreviewType from '../../../brightspot-types/com/psddev/cms/preview/PreviewType'
import List from '../../../brightspot-types/java/util/List'
import ArrayList from '../../../brightspot-types/java/util/ArrayList'
import ContentDeliveryPreviewType from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryPreviewType'
import Preview from '../../../brightspot-types/com/psddev/cms/db/Preview'
import PreviewTypeSupplier from '../../../brightspot-types/com/psddev/cms/preview/PreviewTypeSupplier'
import JavaMethodParameters from '../../../brightspot-types/JavaMethodParameters'
import JavaMethodReturn from '../../../brightspot-types/JavaMethodReturn'

export default class HelloWorld extends JavaClass(
  'brightspot.example.HelloWorld',
  Content,
  DirectoryItem,
  PreviewTypeSupplier
) {
  @JavaRequired
  @JavaField
  title?: string

  @JavaField
  text?: string

  // @JavaMethodParameters()
  // @JavaMethodReturn(String)
  getTitle(): string {
    console.log('YOU ARE IN THE HELLOWORLD CLASS: 🔥 🔥 🔥 🔥 🔥 🔥')
    return this.title || ''
  }

  // @JavaMethodParameters()
  // @JavaMethodReturn(String)
  getText(): string {
    return this.text || ''
  }

  @JavaMethodParameters(Site)
  @JavaMethodReturn(String)
  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.title)
  }

  @JavaMethodParameters(Preview)
  @JavaMethodReturn(List)
  getPreviewTypes(preview: Preview): List<PreviewType> {
    let previewTypes = new ArrayList<PreviewType>()
    let myCDPT = new ContentDeliveryPreviewType()

    myCDPT.setPreviewUrl('http://localhost:3000')
    previewTypes.add(myCDPT)

    return previewTypes
  }
}
