import JavaClass from "../../../../brightspot-types/JavaClass";
import Singleton from "../../../../brightspot-types/com/psddev/dari/db/Singleton";
import ContentManagementEntryPointField from "../../../../brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField";
import ArrayList from "../../../../brightspot-types/java/util/ArrayList";
import List from "../../../../brightspot-types/java/util/List";
import ObjectType from "../../../../brightspot-types/com/psddev/dari/db/ObjectType";
import ContentManagementApiEndpoint from "../../../../brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpoint";
import GraphQLCorsConfiguration from "../../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration";
import Note from "./Note";

export default class AppEndpoint extends JavaClass(
  "brightspot.example.cma_next.AppEndpoint",
  ContentManagementApiEndpoint,
  Singleton
) {
  getPathSuffix(): string {
    return "/app";
  }
  getEntryFields(): List<ContentManagementEntryPointField> {
    let fields = new ArrayList<ContentManagementEntryPointField>();
    fields.add(
      new ContentManagementEntryPointField(
        ObjectType.getInstance(Note.class),
        true
      )
    );
    fields.add(
      new ContentManagementEntryPointField(
        ObjectType.getInstance("com.psddev.cms.db.ToolUser"),
        true
      )
    );
    return fields;
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin("localhost");
  }
}
