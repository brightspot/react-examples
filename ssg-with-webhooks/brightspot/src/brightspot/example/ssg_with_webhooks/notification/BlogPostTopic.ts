import JavaClass from 'brightspot-types/JavaClass'

import AbstractTopic from 'brightspot-types/com/psddev/dari/notification/AbstractTopic'
import Subscriber from 'brightspot-types/com/psddev/dari/notification/Subscriber'

import BlogPostPayload from './BlogPostPayload'

export default class BlogPostTopic extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostTopic',
  AbstractTopic.Of(BlogPostPayload)
) {
  toStringFormat(subscriber: Subscriber, payload: BlogPostPayload): string {
    return payload.getLabel()
  }
}
