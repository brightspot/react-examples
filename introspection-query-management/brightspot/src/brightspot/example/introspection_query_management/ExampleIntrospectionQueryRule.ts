import JavaClass from 'brightspot-types/JavaClass'
import Object from 'brightspot-types/java/lang/Object'

import IntrospectionQueryRule from 'brightspot-types/com/psddev/graphql/IntrospectionQueryRule'
import JavaField from 'brightspot-types/JavaField'
import WebRequest from 'brightspot-types/com/psddev/dari/web/WebRequest'

export default class ExampleIntrospectionQueryRule extends JavaClass(
  'brightspot.example.introspection_query_management.ExampleIntrospectionQueryRule',
  Object,
  IntrospectionQueryRule
) {
  @JavaField(String)
  introspectionKey?: string

  [`isAllowed()`](): boolean {
    return WebRequest.getCurrent().getHeader('Introspection-Key') === this.introspectionKey
  }
}
