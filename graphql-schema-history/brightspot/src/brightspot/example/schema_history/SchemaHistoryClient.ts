import JavaClass from 'brightspot-types/JavaClass'
import ArrayList from 'brightspot-types/java/util/ArrayList'
import JavaDate from 'brightspot-types/java/util/Date'
import JavaSet from 'brightspot-types/java/util/Set'

import ApiClient from 'brightspot-types/com/psddev/cms/api/ApiClient'
import ApiEndpoint from 'brightspot-types/com/psddev/cms/api/ApiEndpoint'
import ApiKey from 'brightspot-types/com/psddev/cms/api/ApiKey'
import Modification from 'brightspot-types/com/psddev/dari/db/Modification'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import UuidUtils from 'brightspot-types/com/psddev/dari/util/UuidUtils'

import SchemaHistoryEndpoint from './SchemaHistoryEndpoint'

export default class SchemaHistoryClient extends JavaClass(
  'brightspot.example.schema_history.SchemaHistoryClient',
  Modification.Of(SchemaHistoryEndpoint)
) {
  afterSave(): void {
    let original = this.getOriginalObject()

    let displayName = original.getState().getType().getDisplayName()
    let name = original.getClass().getName()
    let clientId = UuidUtils.createVersion3Uuid(name)
    let clientSecret = UuidUtils.createVersion3Uuid(clientId.toString())
    let client = Query.findById(ApiClient.class, clientId)
    if (client == null) {
      client = new ApiClient()
      client.getState().setId(clientId)
      client.setName(displayName + ' Client')
    }

    if (!client.getEndpoints().contains(this)) {
      let endpoints = new ArrayList<ApiEndpoint>(client.getEndpoints())
      endpoints.add(original)

      client.setEndpoints(endpoints as JavaSet<ApiEndpoint>)
      client.saveImmediately()
    }

    let key = Query.from(ApiKey.class).where('value = ?', clientSecret).first()
    if (key == null) {
      key = new ApiKey()
      key.setClient(client)
      key.setName(displayName + ' Key')
      key.setValue(clientSecret.toString())
      key.setCreatedOn(new JavaDate())
      key.saveImmediately()
    }
  }
}
