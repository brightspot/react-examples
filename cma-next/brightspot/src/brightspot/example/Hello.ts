import BrightspotClass from "../../../brightspot-types/BrightspotClass";
import Singleton from "../../../brightspot-types/com/psddev/dari/db/Singleton";
import ContentManagementEntryPointField from "../../../brightspot-types/com/psddev/graphql/cma/ContentManagementEntryPointField";
import ArrayList from "../../../brightspot-types/java/util/ArrayList";
import List from "../../../brightspot-types/java/util/List";
import ObjectType from "../../../brightspot-types/com/psddev/dari/db/ObjectType";
import ContentManagementApiEndpoint from "../../../brightspot-types/com/psddev/graphql/cma/ContentManagementApiEndpoint";
import GraphQLCorsConfiguration from "../../../brightspot-types/com/psddev/graphql/GraphQLCorsConfiguration";


const T = BrightspotClass.extend(ContentManagementApiEndpoint.class)
.implement(Singleton.class)
.build({})


export default class extends T {
    getPathSuffix(): string {
        return '/hello'
    }
    getEntryFields(): List<ContentManagementEntryPointField> {
        let fields = new ArrayList<ContentManagementEntryPointField>()
        fields.add(new ContentManagementEntryPointField(ObjectType.getInstance('brightspot.example.HelloWorld'), true))
        fields.add(new ContentManagementEntryPointField(ObjectType.getInstance('com.psddev.cms.db.ToolUser'), true))
        return fields
    }
    updateCorsConfiguration(corsConfiguration: GraphQLCorsConfiguration): void {
        corsConfiguration.addAllowedOrigin("localhost")
    }
}

