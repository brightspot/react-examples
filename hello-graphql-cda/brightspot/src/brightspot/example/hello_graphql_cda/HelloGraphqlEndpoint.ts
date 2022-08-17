import JavaClass from "../../../../brightspot-types/JavaClass";
import Singleton from "../../../../brightspot-types/com/psddev/dari/db/Singleton";
import ContentDeliveryApiAccessOption from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption";
import ContentDeliveryApiAccessOptionImplicit from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit";
import ContentDeliveryApiEndpoint from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint";
import ContentDeliveryEntryPointField from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField";
import GraphQLCorsConfiguration from "../../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration";
import ArrayList from "../../../../brightspot-types/java/util/ArrayList";
import List from "../../../../brightspot-types/java/util/List";
import HelloWorld from "./HelloWorld";
import HelloWorldViewModel from "./HelloWorldViewModel";
// import HelloWorldViewModel from "./HelloWorldViewModel";

export default class HelloGraphqlEndpoint extends JavaClass(
  "brightspot.example.hello_graphql_cda.HelloGraphqlEndpoint",
  ContentDeliveryApiEndpoint,
  Singleton
) {
  getPathSuffix(): string {
    return "/app";
  }

  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    let fields = new ArrayList<ContentDeliveryEntryPointField>();
    let item = new ContentDeliveryEntryPointField(
      HelloWorldViewModel.class,
      "HelloWorld",
      "Say Hello World"
    );
    fields.add(item);
    return fields;
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin("localhost");
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit();
  }
}
