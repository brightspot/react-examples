import ApiClient from 'brightspot-types/com/psddev/cms/api/ApiClient'
import ApiEndpoint from 'brightspot-types/com/psddev/cms/api/ApiEndpoint'
import ApiKey from 'brightspot-types/com/psddev/cms/api/ApiKey'
import ArrayList from 'brightspot-types/java/util/ArrayList'
import AppEndpoint from './NotesEndpoint'
import JavaClass from 'brightspot-types/JavaClass'
import JavaDate from 'brightspot-types/java/util/Date'
import Modification from 'brightspot-types/com/psddev/dari/db/Modification'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import UuidUtils from 'brightspot-types/com/psddev/dari/util/UuidUtils'
import JavaSet from 'brightspot-types/java/util/Set'

export default class NotesEndpointClient extends JavaClass(
  'brightspot.example.notes_cma.NotesEndpointClient',
  Modification.Of(AppEndpoint)
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
      //@ts-ignore
      let endpoints = new ArrayList<ApiEndpoint>(client.getEndpoints())
      endpoints['add(java.lang.Object)'](original)

      client.setEndpoints(endpoints as unknown as JavaSet<ApiEndpoint>)
      client.saveImmediately()
    }

    let key = Query.from(ApiKey.class)
      ['where(java.lang.String,java.lang.Object[])']('value = ?', clientSecret)
      .first()
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
