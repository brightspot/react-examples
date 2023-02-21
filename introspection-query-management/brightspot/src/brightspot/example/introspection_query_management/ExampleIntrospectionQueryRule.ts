import JavaClass from 'brightspot-types/JavaClass'
import Object from 'brightspot-types/java/lang/Object'

import IntrospectionQueryRule from 'brightspot-types/com/psddev/graphql/IntrospectionQueryRule'
import WebRequest from 'brightspot-types/com/psddev/dari/web/WebRequest'

export default class ExampleIntrospectionQueryRule extends JavaClass(
  'brightspot.example.introspection_query_management.ExampleIntrospectionQueryRule',
  Object,
  IntrospectionQueryRule
) {
  [`isAllowed()`](): boolean {
    return WebRequest.getCurrent().getHeader('Introspection-Key') === 'correct-value'
  }
}
