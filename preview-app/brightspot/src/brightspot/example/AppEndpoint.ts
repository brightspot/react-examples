// import ObjectType from '../../../brightspot-types/com/psddev/dari/db/ObjectType'
import JavaClass from '../../../brightspot-types/JavaClass'
import Singleton from '../../../brightspot-types/com/psddev/dari/db/Singleton'
import ContentDeliveryApiAccessOption from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption'
import ContentDeliveryApiAccessOptionImplicit from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit'
import ContentDeliveryApiEndpoint from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryEntryPointField from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
// import RecordableDeliveryEntryPointField from '../../../brightspot-types/com/psddev/graphql/cda/rda/RecordableDeliveryEntryPointField'
import GraphQLCorsConfiguration from '../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import ArrayList from '../../../brightspot-types/java/util/ArrayList'
import List from '../../../brightspot-types/java/util/List'
import HelloWorldViewModel from './HelloWorldViewModel'
import JavaMethodParameters from '../../../brightspot-types/JavaMethodParameters'
import JavaMethodReturn from '../../../brightspot-types/JavaMethodReturn'

export default class AppEndpoint extends JavaClass(
  'brightspot.example.AppEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPathSuffix(): string {
    return '/app'
  }
  @JavaMethodParameters()
  @JavaMethodReturn(List)
  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    let fields = new ArrayList<ContentDeliveryEntryPointField>()
    let item = new ContentDeliveryEntryPointField(
      HelloWorldViewModel.class,
      'HelloWorld',
      'Say Hello World'
    )
    console.log(item.getViewClass() + ' getViewClass! 🔥 🔥 🔥 🔥 🔥 🔥')
    fields.add(item)
    console.log('YOU ARE HERE: 🔥 🔥 🔥 🔥 🔥 🔥' + fields)
    return fields
  }

  @JavaMethodParameters(GraphQLCorsConfiguration)
  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin('http://localhost:3000')
  }

  @JavaMethodParameters()
  @JavaMethodReturn(ContentDeliveryApiAccessOption)
  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}
