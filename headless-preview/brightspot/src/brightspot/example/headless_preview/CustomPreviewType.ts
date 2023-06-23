import JavaClass from 'brightspot-types/JavaClass'
import Preview from 'brightspot-types/com/psddev/cms/db/Preview'
import PreviewType from 'brightspot-types/com/psddev/cms/preview/PreviewType'

export default class CustomPreviewType extends JavaClass(
  'brightspot.example.headless_preview.CustomPreviewType',
  PreviewType
) {
  [`shouldDisplay(com.psddev.cms.db.Preview)`](preview: Preview): boolean {
    return true
  }
  [`display(com.psddev.cms.db.Preview)`](preview: Preview): string {
    return '<h1>hello world</h1>'
  }

  getDisplayName(): string {
    return 'test'
  }
}
