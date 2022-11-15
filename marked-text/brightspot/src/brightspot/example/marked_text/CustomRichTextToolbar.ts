import ArrayList from 'brightspot-types/java/util/ArrayList'
import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaObject from 'brightspot-types/java/lang/Object'
import List from 'brightspot-types/java/util/List'

import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'
import RichTextElement from 'brightspot-types/com/psddev/cms/db/RichTextElement'
import RichTextToolbar from 'brightspot-types/com/psddev/cms/rte/RichTextToolbar'
import RichTextToolbarAction from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarAction'
import RichTextToolbarItem from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarItem'
import RichTextToolbarSeparator from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarSeparator'
import RichTextToolbarStyle from 'brightspot-types/com/psddev/cms/rte/RichTextToolbarStyle'

import ImageRichTextElement from './ImageRichTextElement'

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

      RichTextToolbarSeparator.BLOCK,
      RichTextToolbarAction.TABLE,

      RichTextToolbarSeparator.INLINE,
      RichTextToolbarAction.KEYBOARD,

      RichTextToolbarItem.ELEMENTS,
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
