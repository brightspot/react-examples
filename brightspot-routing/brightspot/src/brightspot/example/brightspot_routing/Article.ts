import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'

import Content from 'brightspot-types/com/psddev/cms/db/Content'
import DirectoryItem from 'brightspot-types/com/psddev/cms/db/Directory$Item'
import DisplayName from 'brightspot-types/com/psddev/dari/db/Recordable$DisplayName'
import Indexed from 'brightspot-types/com/psddev/dari/db/Recordable$Indexed'
import Optional from 'brightspot-types/java/util/Optional'
import Required from 'brightspot-types/com/psddev/dari/db/Recordable$Required'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import Utils from 'brightspot-types/com/psddev/dari/util/Utils'

import Section from './Section'

@DisplayName({ value: 'Brightspot Routing Article' })
export default class Article extends JavaClass(
  'brightspot.example.brightspot_routing.Article',
  Content,
  DirectoryItem
) {
  @JavaField(String)
  @Required
  headline?: string

  @JavaField(String)
  body?: string

  @JavaField(Section)
  @Indexed
  section?: Section

  createPermalink(site: Site): string {
    const sectionSlug = Utils.toNormalized(Optional.ofNullable(this.section?.name).orElse(''))
    const headlineSlug = '/' + Utils.toNormalized(Optional.ofNullable(this.headline).orElse(''))

    return sectionSlug + headlineSlug
  }
}
