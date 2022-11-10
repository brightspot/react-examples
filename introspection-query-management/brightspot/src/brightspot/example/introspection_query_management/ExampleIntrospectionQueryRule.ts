import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Object from 'brightspot-types/java/lang/Object'

import GraphQLApiRequest from 'brightspot-types/com/psddev/graphql/GraphQLApiRequest'
import IntrospectionQueryRule from 'brightspot-types/com/psddev/graphql/IntrospectionQueryRule'
import WebRequest from 'brightspot-types/com/psddev/dari/web/WebRequest'

export default class ExampleIntrospectionQueryRule extends JavaClass(
  'brightspot.example.introspection_query_management.ExampleIntrospectionQueryRule',
  Object,
  IntrospectionQueryRule
) {
  @JavaField(String)
  introspectionKey: string;

  [`isAllowed()`](): boolean {
    let request = WebRequest.getCurrent()

    if (request.as(GraphQLApiRequest.class).isExplorerQuery()) {
      return true
    }

    return this.introspectionKey === request.getHeader('Introspection-Key')
  }
}
