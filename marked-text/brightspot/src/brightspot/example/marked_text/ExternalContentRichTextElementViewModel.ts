import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'

import JavaInteger from 'brightspot-types/java/lang/Integer'
import JavaString from 'brightspot-types/java/lang/String'

import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'
import RteMarkedTextViewModel from 'brightspot-types/com/psddev/cms/mark/view/RteMarkedTextViewModel'
import ExternalContentCache from 'brightspot-types/com/psddev/cms/rte/ExternalContentCache'
import ExternalContentRichTextElement from 'brightspot-types/com/psddev/cms/rte/ExternalContentRichTextElement'
import RteMarkedText from 'brightspot-types/com/psddev/cms/mark/RteMarkedText'
import RteMarkDataView from 'brightspot-types/com/psddev/cms/mark/view/RteMarkDataView'
import ObjectUtils from 'brightspot-types/com/psddev/dari/util/ObjectUtils'
import MarkedText from 'brightspot-types/com/psddev/dari/mark/MarkedText'
import Integer from 'brightspot-types/java/lang/Integer'

@ViewInterface
export default class ExternalContentRichTextElementViewModel extends JavaClass(
  'brightspot.example.marked_text.ExternalContentRichTextElementViewModel',
  ViewModel.Of(ExternalContentRichTextElement),
  RteMarkDataView
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getType(): string {
    return this.getString('type')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getVersion(): string {
    return this.getString('version')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getTitle(): string {
    return this.getString('title')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAuthorName(): string {
    return this.getString('author_name')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getAuthorUrl(): string {
    return this.getString('author_url')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getProviderName(): string {
    return this.getString('provider_name')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getProviderUrl(): string {
    return this.getString('provider_url')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaInteger)
  getCacheAge(): Integer {
    return this.getInteger('cache_age')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getThumbnailUrl(): string {
    return this.getString('thumbnail_url')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaInteger)
  getThumbnailWidth(): Integer {
    return this.getInteger('thumbnail_width')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaInteger)
  getThumbnailHeight(): Integer {
    return this.getInteger('thumbnail_height')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getUrl(): string {
    return this.getString('url')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getHtml(): string {
    return this.getString('html')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(RteMarkedTextViewModel)
  getMarkedHtml(): RteMarkedTextViewModel {
    const html = this.getHtml()

    if (!html) {
      return null
    }

    return this.createView(
      RteMarkedTextViewModel.class,
      new RteMarkedText(null, new MarkedText(html))
    )
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaInteger)
  getWidth(): Integer {
    return this.getInteger('width')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaInteger)
  getHeight(): Integer {
    return this.getInteger('height')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getOriginalUrl(): string {
    return this.model.getUrl()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaInteger)
  getMaximumWidth(): Integer {
    return this.model.getMaximumWidth()
  }

  @JavaMethodParameters()
  @JavaMethodReturn(JavaInteger)
  getMaximumHeight(): Integer {
    return this.model.getMaximumHeight()
  }

  getString(key: string): string {
    return ObjectUtils.to(
      JavaString.class,
      ExternalContentCache.get(
        this.model.getUrl(),
        this.model.getMaximumWidth(),
        this.model.getMaximumHeight()
      ).get(key)
    ) as unknown as string
  }

  getInteger(key: string): Integer {
    return ObjectUtils.to(
      JavaInteger.class,
      ExternalContentCache.get(
        this.model.getUrl(),
        this.model.getMaximumWidth(),
        this.model.getMaximumHeight()
      ).get(key)
    ) as unknown as Integer
  }
}
