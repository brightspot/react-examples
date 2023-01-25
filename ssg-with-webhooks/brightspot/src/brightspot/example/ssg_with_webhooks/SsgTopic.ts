import AbstractTopic from 'brightspot-types/com/psddev/dari/notification/AbstractTopic'
import Subscriber from 'brightspot-types/com/psddev/dari/notification/Subscriber'
import JavaClass from 'brightspot-types/JavaClass'
import SsgPayload from './SsgPayload'

export default class SsgTopic extends JavaClass(
  'brightspot.example.ssg_with_webhooks.SsgTopic',
  AbstractTopic.Of(SsgPayload)
) {
  // TODO: add fields to serve as configuration

  toStringFormat(subscriber: Subscriber, payload: SsgPayload): string {
    // TODO: add a better string format for the payload. This is really only for display / debugging purposes.
    return payload.getLabel()
  }
}
