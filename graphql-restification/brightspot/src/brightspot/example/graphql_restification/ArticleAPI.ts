import ArrayList from "../../../../brightspot-types/java/util/ArrayList";
import ContentDeliveryApiAccessOption from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOption";
import ContentDeliveryApiAccessOptionImplicit from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiAccessOptionImplicit";
import ContentDeliveryApiEndpoint from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryApiEndpoint";
import ContentDeliveryEntryPointField from "../../../../brightspot-types/com/psddev/graphql/cda/ContentDeliveryEntryPointField";
import GraphQLCorsConfiguration from "../../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration";
import JavaClass from "../../../../brightspot-types/JavaClass";
import List from "../../../../brightspot-types/java/util/List";
import ObjectType from "../../../../brightspot-types/com/psddev/dari/db/ObjectType";
import RecordableDeliveryEntryPointField from "../../../../brightspot-types/com/psddev/graphql/cda/rda/RecordableDeliveryEntryPointField";
import Singleton from "../../../../brightspot-types/com/psddev/dari/db/Singleton";
import Article from "./Article";


export default class ArticleAPI extends JavaClass('brightspot.example.graphql_restification.ArticleAPI', ContentDeliveryApiEndpoint, Singleton) {

  getPathSuffix(): string {
    return "/article-api"
  }

  getQueryEntryFields(): List<ContentDeliveryEntryPointField> {
    let fields = new ArrayList<ContentDeliveryEntryPointField>()
    fields.add(new RecordableDeliveryEntryPointField(ObjectType.getInstance(Article.class)))
    return fields
  }

  updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
    corsConfiguration.addAllowedOrigin('localhost')
  }

  getAccessOption(): ContentDeliveryApiAccessOption {
    return new ContentDeliveryApiAccessOptionImplicit()
  }
}