import BrightspotClass from '../../../brightspot-types/BrightspotClass'
import Content from '../../../brightspot-types/com/psddev/cms/db/Content'

const T = BrightspotClass.extend(Content.class)
  .build({
    title: {
      type: 'text',
      indexed: {
        unique: true
      }
    },
    text: {
        type: 'text'
    }
  })

export default class extends T {}