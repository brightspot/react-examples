import List from 'brightspot-types/java/util/List'

import JavaClass from 'brightspot-types/JavaClass'
import RichTextToolbar from 'brightspot-types/com/psddev/cms/rte/RichTextToolbar'
import RichTextToolbarItem from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarItem'
import RichTextToolbarStyle from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarStyle'
import RichTextToolbarAction from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarAction'
import RichTextToolbarSeparator from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarSeparator'

export default class CustomRichTextToolbar extends JavaClass(
  'brightspot.example.marked_text.CustomRichTextToolbar',
  null,
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
      RichTextToolbarItem.ELEMENTS,
      RichTextToolbarItem.CUSTOM,

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
    ] as unknown as List<RichTextToolbarItem>
  }
}
