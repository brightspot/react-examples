import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaMap from 'brightspot-types/java/util/Map'
import LinkedHashMap from 'brightspot-types/java/util/LinkedHashMap'

import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import IconName from 'brightspot-types/com/psddev/cms/db/ToolUi$IconName'
import Tag from 'brightspot-types/com/psddev/cms/db/RichTextElement$Tag'
import RichTextElement from 'brightspot-types/com/psddev/cms/db/RichTextElement'

@DisplayName({ value: 'Link' })
@Tag({
  value: 'a',
  inclusive: false,
  position: -70.0,
  tooltip: 'Link',
})
@IconName({ value: 'link' })
export default class LinkRichTextElement extends JavaClass(
  'brightspot.example.marked_text_advanced.rich_text.elements.LinkRichTextElement',
  RichTextElement
) {
  @JavaField(String)
  static TAG_NAME: string = 'bsp-link'

  @JavaField(String)
  static HREF_ATTRIBUTE: string = 'href'

  static TARGET: string = 'target'

  @JavaField(String)
  url: string

  @JavaField(String)
  target: string

  setUrl(url: string): void {
    this.url = url
  }

  setTarget(target: string): void {
    this.target = target
  }

  [`toAttributes()`](): JavaMap<string, string> {
    let attributes: JavaMap<string, string> = new LinkedHashMap<
      string,
      string
    >()

    attributes.put(LinkRichTextElement.HREF_ATTRIBUTE, this.url)
    attributes.put(LinkRichTextElement.TARGET, this.target)

    return attributes
  }

  [`fromAttributes(java.util.Map)`](attributes: JavaMap<string, string>): void {
    if (attributes !== null) {
      this.setUrl(attributes.get(LinkRichTextElement.HREF_ATTRIBUTE))
      this.setTarget(attributes.get(LinkRichTextElement.TARGET))
    }
  }
}
