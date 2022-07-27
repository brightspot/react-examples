import BrightspotClass from "../../../brightspot-types/BrightspotClass"
import Content from "../../../brightspot-types/com/psddev/cms/db/Content"
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"
import ObjectType from "../../../brightspot-types/com/psddev/dari/db/ObjectType"
import Site from "../../../brightspot-types/com/psddev/cms/db/Site"

const T = BrightspotClass.extend(Content.class)
  .implement(DirectoryItem.class)
  .build({
    section: {
      type: 'record',
      indexed: true,
      valueTypes: [ ObjectType.getInstance('brightspot.example.Section') ],
    },
    headline: {
      type: 'text',
      isRequired: true
    },
    text: {
      type: 'text'
    },
    url: {
      type: 'text',
      'cms.ui.readOnly': true
    }
  })

export default class extends T {
  beforeCommit(): void {
    this.setUrl(this.getPermalink())
  }
  createPermalink(site: Site): string {
    const Utils = Java.type('com.psddev.dari.util.Utils')
    return Utils.toNormalized(this.getHeadline())
  }
}