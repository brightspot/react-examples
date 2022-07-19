Place your Brightspot classes (`*.ts` files) in this folder. Use `PascalCase` for file names and `camelCase` for field names. Ex.

_Ticket.ts_

```typescript
import BrightspotClass from '@brightspot/types/BrightspotClass'
import Content from '@brightspot/types/com/psddev/cms/db/Content'

const T = BrightspotClass.extend(Content.class)
  .build({
    title: {
      type: 'text',
    },
    dueDate: {
      type: 'date',
    }
  })

export default class extends T {
  getLabel() {
    return this.getTitle()
  }
}
```
