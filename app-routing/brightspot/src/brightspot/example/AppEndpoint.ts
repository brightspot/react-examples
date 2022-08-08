import ObjectType from '../../../brightspot-types/com/psddev/dari/db/ObjectType'
import JavaClass from '../../../brightspot-types/JavaClass'
import Singleton from '../../../brightspot-types/com/psddev/dari/db/Singleton'
import ContentDeliveryApiAccessOption from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption'
import ContentDeliveryApiAccessOptionImplicit from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit'
import ContentDeliveryApiEndpoint from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint'
import ContentDeliveryApiSchemaOptions from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiSchemaOptions'
import ContentDeliveryEntryPointField from '../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField'
import RecordableDeliveryEntryPointField from '../../../brightspot-types/com/psddev/graphql/cda/rda/RecordableDeliveryEntryPointField'
import GraphQLCorsConfiguration from '../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration'
import ArrayList from '../../../brightspot-types/java/util/ArrayList'
import List from '../../../brightspot-types/java/util/List'

export default class AppEndpoint extends JavaClass(
  'brightspot.example.AppEndpoint',
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPathSuffix(): string {
    return '/app'
  }

  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    let fields = new ArrayList<ContentDeliveryEntryPointField>()
    fields.add(
      new RecordableDeliveryEntryPointField(
        ObjectType.getInstance('brightspot.example.App')
      )
    )
    fields.add(
      new RecordableDeliveryEntryPointField(
        ObjectType.getInstance('brightspot.example.Article')
      )
    )
    fields.add(
      new RecordableDeliveryEntryPointField(
        ObjectType.getInstance('brightspot.example.Page')
      )
    )
    return fields
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }

  getOptions(): ContentDeliveryApiSchemaOptions {
    let options = new ContentDeliveryApiSchemaOptions()
    options.enable('inverseIndexes')
    return options
  }
}
