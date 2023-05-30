import JavaClass from 'brightspot-types/JavaClass'

import ToolUi from 'brightspot-types/com/psddev/cms/db/ToolUi'
import GlobalObjectTypeProcessor from 'brightspot-types/com/psddev/dari/db/GlobalObjectTypeProcessor'
import ObjectType from 'brightspot-types/com/psddev/dari/db/ObjectType'

export default class ArticleBodyFieldToolbarObjectTypeProcessor extends JavaClass(
  'brightspot.example.marked_text_advanced.model.ArticleBodyFieldToolbarObjectTypeProcessor',
  null,
  GlobalObjectTypeProcessor
) {
  [`process(com.psddev.dari.db.ObjectType)`](type: ObjectType): void {
    const typeName = 'brightspot.example.marked_text_advanced.model.Article'
    const fieldName = 'body'
    const tb =
      'brightspot.example.marked_text_advanced.rich_text.toolbar.CustomRichTextToolbar'

    if (typeName === type.getInternalName()) {
      Array.from(type.getFields()).forEach((field) => {
        if (fieldName === field.getInternalName()) {
          field.as(ToolUi.class).setRichTextToolbarClassName(tb)
          return
        }
      })
    }
  }
}
