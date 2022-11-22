Each component and its supporting files will go into a folder matching the component name.

```
- components
|   - HelloWorld
|   | - HelloWorldComponent.tsx
|   | - HelloWorldContainer.tsx
|   | - HelloWorldQuery.tsx
```

Typical pattern will follow an MVC flow where the `*Container.tsx` is the controller, `*Query.graphql` is the model, and `*Component.tsx` is the view.

Example files:

_HelloWorldComponent.tsx_

```typescript
type HelloWorldProps = {
  helloWorldContent: {
    HelloWorld: {
      title: string
      text: string
    }
  }
}

const HelloWorld: React.FC<HelloWorldProps> = ({ helloWorldContent }) => {
  if (!helloWorldContent.HelloWorld) return <div>404</div>

  const { text } = helloWorldContent.HelloWorld

  return <h1 className="hello-world">{text}</h1>
}

export default HelloWorld
```

_HelloWorldContainer.tsx_

```typescript
import HelloWorld from './HelloWorldComponent'
import HelloWorldQuery from './HelloWorldQuery'
import { useQuery } from '@apollo/client'

const HelloWorldContainer: React.FC = () => {
  const { loading, error, data } = useQuery(HelloWorldQuery, {
    variables: {
      path: '/hello-world',
    },
  })

  if (loading) return <div>'Loading...'</div>
  if (error) return <div>`Error! ${error.message}`</div>

  return (
    <div className="hello-world-container">
      <HelloWorld helloWorldContent={data} />
    </div>
  )
}

export default HelloWorldContainer
```

_HelloWorldQuery.tsx_

```graphql
import { gql } from '@apollo/client'

const HelloWorldQuery = gql`
query HelloWorld($path: String = "") {
    HelloWorld(path: $path) {
        title
    }
}
`

export default HelloWorldQuery;
```
