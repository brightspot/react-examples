import ArrayList from 'brightspot-types/java/util/ArrayList'
import JavaClass from 'brightspot-types/JavaClass'
import JavaDate from 'brightspot-types/java/util/Date'

import ApiClient from 'brightspot-types/com/psddev/cms/api/ApiClient'
import ApiEndpoint from 'brightspot-types/com/psddev/cms/api/ApiEndpoint'
import ApiKey from 'brightspot-types/com/psddev/cms/api/ApiKey'
import Modification from 'brightspot-types/com/psddev/dari/db/Modification'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import UuidUtils from 'brightspot-types/com/psddev/dari/util/UuidUtils'

import ClientAuthSsrEndpoint from './ClientAuthSsrEndpoint'

export default class ClientAuthApiClient extends JavaClass(
  'brightspot.example.client_authentication_ssr.ClientAuthApiClient',
  Modification.Of(ClientAuthSsrEndpoint)
) {
  afterSave(): void {
    let original = this.getOriginalObject()

    let name = original.getClass().getName()
    let displayName = original.getState().getType().getDisplayName()
    let clientId = UuidUtils.createVersion3Uuid(name)

    let client = Query.findById(ApiClient.class, clientId)
    if (client === null) {
      client = new ApiClient()
      client.getState().setId(clientId)
      client.setName(displayName + ' Client')
    }

    if (!client.getEndpoints().contains(this)) {
      let endpoints = new ArrayList<ApiEndpoint>(client.getEndpoints())
      endpoints.add(original)

      client.setEndpoints(endpoints)
      client.saveImmediately()
    }

    let clientSecret = 'abcdefghijklmnopqrstuvwxyz0123456789'

    let key = Query.from(ApiKey.class)
      .where('value = ?', clientSecret)
      .or('value = ? && cms.content.trashed = ?', clientSecret, true)
      .first()

    if (key === null) {
      key = new ApiKey()
      key.setClient(client)
      key.setName(displayName + ' Key')
      key.setValue(clientSecret)
      key.setCreatedOn(new JavaDate())
      key.saveImmediately()
    }
  }
}
