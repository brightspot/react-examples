import JavaClass from 'brightspot-types/JavaClass'

import AbstractTopic from 'brightspot-types/com/psddev/dari/notification/AbstractTopic'
import Subscriber from 'brightspot-types/com/psddev/dari/notification/Subscriber'

import SsgPayload from './SsgPayload'

export default class SsgTopic extends JavaClass(
  'brightspot.example.ssg_with_webhooks.SsgTopic',
  AbstractTopic.Of(SsgPayload)
) {
  toStringFormat(subscriber: Subscriber, payload: SsgPayload): string {
    return payload.getLabel()
  }
}
