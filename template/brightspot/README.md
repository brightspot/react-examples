To initialize a project from scratch:

```
npm init -y
yarn add --dev typescript
yarn add --dev @brightspot/cli
npx tsc --init
```

To compile an existing project:

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download

# create some files in src/brightspot/example directory

npx brightspot types upload src
```

Place your Brightspot classes (`*.ts` files) in the `src/brightspot/example` folder. Use `PascalCase` for file names and `camelCase` for field names. Ex.

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
