import BrightspotClass from "../../../brightspot-types/BrightspotClass";
import ObjectType from "../../../brightspot-types/com/psddev/dari/db/ObjectType";
import Singleton from "../../../brightspot-types/com/psddev/dari/db/Singleton";
import ContentDeliveryApiAccessOption from "../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption";
import ContentDeliveryApiAccessOptionImplicit from "../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit";
import ContentDeliveryApiEndpoint from "../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint";
import ContentDeliveryApiSchemaOptions from "../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiSchemaOptions";
import ContentDeliveryEntryPointField from "../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField";
import RecordableDeliveryEntryPointField from "../../../brightspot-types/com/psddev/graphql/cda/rda/RecordableDeliveryEntryPointField";
import GraphQLCorsConfiguration from "../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration";
import ArrayList from "../../../brightspot-types/java/util/ArrayList";
import List from "../../../brightspot-types/java/util/List";

const T = BrightspotClass.extend(ContentDeliveryApiEndpoint.class)
  .implement(Singleton.class)
  .build({})

export default class extends T {
  getPathSuffix(): string {
    return '/page'
  }
  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    let fields = new ArrayList<ContentDeliveryEntryPointField>()
    fields.add(new RecordableDeliveryEntryPointField(ObjectType.getInstance('brightspot.example.Article')))
    fields.add(new RecordableDeliveryEntryPointField(ObjectType.getInstance('brightspot.example.Section')))
    fields.add(new RecordableDeliveryEntryPointField(ObjectType.getInstance('brightspot.example.Page')))
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
