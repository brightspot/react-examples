import BrightspotClass from "../../../brightspot-types/BrightspotClass"
import Content from "../../../brightspot-types/com/psddev/cms/db/Content"
import DirectoryItem from "../../../brightspot-types/com/psddev/cms/db/Directory$Item"

const T = BrightspotClass.extend(Content.class)
  .implement(DirectoryItem.class)
  .build({})

export default class extends T {}