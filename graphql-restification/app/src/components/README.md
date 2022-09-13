Each component and its supporting files will go into a folder matching the component name.

```
- components
|   - Example
|   | - ExampleComponent.tsx
|   | - ExampleContainer.tsx
|   | - ExampleQuery.graphql
```

Typical pattern will follow an MVC flow where the `*Container.tsx` is the controller, `*Query.graphql` is the model, and `*Component.tsx` is the view.

Example files:

_ExampleComponent.tsx_

```typescript
interface Props {
  title: string | null | undefined
}

const ExampleComponent: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export default ExampleComponent
```

_ExampleContainer.tsx_

```typescript
import ExampleComponent from './ExampleComponent'
import { useExampleQuery } from '../../generated'

const ExampleContainer: React.FC = () => {
  const { loading, error, data } = useExampleQuery({
    variables: {
      path: '/example',
    },
  })

  if (loading) return <div>'Loading...'</div>
  if (error) return <div>`Error! ${error.message}`</div>
  const title = data?.Example?.title
  return (
    <div>
      <ExampleComponent title={title} />
    </div>
  )
}

export default ExampleContainer
```

_ExampleQuery.graphql_

```graphql
query Example($path: String) {
  Example(path: $path) {
    title
  }
}
```
