import JavaClass from 'brightspot-types/JavaClass'
import List from 'brightspot-types/java/util/List'
import Class from 'brightspot-types/java/lang/Class'
import RichTextElement from 'brightspot-types/com/psddev/cms/db/RichTextElement'
import ImageRichTextElement from './ImageRichTextElement'
import ArrayList from 'brightspot-types/java/util/ArrayList'
import JavaObject from 'brightspot-types/java/lang/Object'

import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'
import RichTextToolbar from 'brightspot-types/com/psddev/cms/rte/RichTextToolbar'
import RichTextToolbarAction from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarAction'
import RichTextToolbarItem from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarItem'
import RichTextToolbarSeparator from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarSeparator'
import RichTextToolbarStyle from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarStyle'

export default class CustomRichTextToolbar extends JavaClass(
  'brightspot.example.marked_text.CustomRichTextToolbar',
  JavaObject,
  RichTextToolbar
) {
  [`getItems()`](): List<RichTextToolbarItem> {
    return [
      RichTextToolbarStyle.BOLD,
      RichTextToolbarStyle.ITALIC,
      RichTextToolbarStyle.UNDERLINE,
      RichTextToolbarStyle.STRIKETHROUGH,
      RichTextToolbarStyle.SUPERSCRIPT,
      RichTextToolbarStyle.SUBSCRIPT,
      RichTextToolbarAction.CLEAR,

      RichTextToolbarSeparator.BLOCK,
      RichTextToolbarStyle.ALIGN_LEFT,
      RichTextToolbarStyle.ALIGN_CENTER,
      RichTextToolbarStyle.ALIGN_RIGHT,

      RichTextToolbarSeparator.BLOCK,
      RichTextToolbarStyle.UL,
      RichTextToolbarStyle.OL,
      RichTextToolbarAction.INDENT,
      RichTextToolbarAction.OUTDENT,

      RichTextToolbarSeparator.INLINE,
      RichTextToolbarStyle.HTML,
      RichTextToolbarStyle.LINK,
      RichTextToolbarItem.UPLOAD,

      RichTextToolbarSeparator.BLOCK,
      RichTextToolbarAction.TABLE,

      RichTextToolbarSeparator.INLINE,
      RichTextToolbarAction.KEYBOARD,

      RichTextToolbarSeparator.BLOCK,
      RichTextToolbarAction.TRACK_CHANGES,
      RichTextToolbarAction.TRACK_CHANGES_ACCEPT,
      RichTextToolbarAction.TRACK_CHANGES_REJECT,
      RichTextToolbarAction.TRACK_CHANGES_ACCEPT_ALL,
      RichTextToolbarAction.TRACK_CHANGES_REJECT_ALL,
      RichTextToolbarAction.TRACK_CHANGES_PREVIEW,

      RichTextToolbarSeparator.BLOCK,
      RichTextToolbarStyle.COMMENT,
      RichTextToolbarAction.COMMENT_COLLAPSE,
      RichTextToolbarAction.COMMENT_REMOVE,

      RichTextToolbarSeparator.INLINE,
      RichTextToolbarAction.UNDO,
      RichTextToolbarAction.REDO,
      RichTextToolbarSeparator.INLINE,
      RichTextToolbarAction.MODE,
      RichTextToolbarAction.FIND,
      RichTextToolbarAction.FULLSCREEN,
      RichTextToolbarItem.CUSTOM,
      RichTextToolbarItem.ELEMENTS,
      RichTextToolbarItem.UPLOAD,
    ] as unknown as List<RichTextToolbarItem>
  }

  [`getElementClasses()`](): List<Class<RichTextElement>> {
    let list = new ArrayList<Class<RichTextElement>>()

    let imageRichTextElement = ClassFinder.getClass(
      'brightspot.example.marked_text.ImageRichTextElement'
    ) as unknown as Class<ImageRichTextElement>

    list.add(imageRichTextElement)

    return list
  }
}
