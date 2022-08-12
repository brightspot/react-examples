import ObjectType from "../../../../brightspot-types/com/psddev/dari/db/ObjectType";
import JavaClass from "../../../../brightspot-types/JavaClass";
import Singleton from "../../../../brightspot-types/com/psddev/dari/db/Singleton";
import ContentDeliveryApiAccessOption from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption";
import ContentDeliveryApiAccessOptionImplicit from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit";
import ContentDeliveryApiEndpoint from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint";
import ContentDeliveryEntryPointField from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField";
import RecordableDeliveryEntryPointField from "../../../../brightspot-types/com/psddev/graphql/cda/rda/RecordableDeliveryEntryPointField";
import GraphQLCorsConfiguration from "../../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration";
import ArrayList from "../../../../brightspot-types/java/util/ArrayList";
import List from "../../../../brightspot-types/java/util/List";
import HelloWorld from "./HelloWorld";

export default class AppEndpoint extends JavaClass(
  "brightspot.example.apollo_app.AppEndpoint",
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPathSuffix(): string {
    return "/app";
  }

  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    let fields = new ArrayList<ContentDeliveryEntryPointField>();
    fields.add(
      new RecordableDeliveryEntryPointField(
        ObjectType.getInstance(HelloWorld.class)
      )
    );
    return fields;
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin("localhost");
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit();
  }
}
