import ArrayList from 'brightspot-types/java/util/ArrayList'
import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaSet from 'brightspot-types/java/util/Set'
import List from 'brightspot-types/java/util/List'

import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'
import DirectoryData from 'brightspot-types/com/psddev/cms/db/Directory$Data'
import Ignored from 'brightspot-types/com/psddev/dari/db/Recordable$Ignored'
import JavaField from 'brightspot-types/JavaField'
import Modification from 'brightspot-types/com/psddev/dari/db/Modification'
import Notification from 'brightspot-types/com/psddev/dari/notification/Notification'
import Path from 'brightspot-types/com/psddev/cms/db/Directory$Path'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import Topic from 'brightspot-types/com/psddev/dari/notification/Topic'

import BlogPostTopic from './BlogPostTopic'
import BlogPost from '../models/BlogPost'
import BlogPostPayload from './BlogPostPayload'
import BlogPostPayloadPath from './BlogPostPayloadPath'

export default class BlogPostTrigger extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostTrigger',
  Modification.Of(BlogPost)
) {
  @Ignored
  @JavaField(BlogPost)
  oldObject?: BlogPost

  beforeCommit() {
    super.beforeCommit()

    this.oldObject = Query.from(BlogPost.getClass())
      .where('_id = ?', this)
      .noCache()
      .first()
  }

  afterSave(): void {
    super.afterSave()

    let BlogPostPayload = ClassFinder.getClass(
      'brightspot.example.ssg_with_webhooks.notification.BlogPostPayload'
    )
    let payload = new BlogPostPayload() as BlogPostPayload

    let paths = this.getAllPaths()

    payload.paths = this.convertPathsToPayloadPaths(paths)

    Notification.publish(BlogPostTopic.getClass() as Class<Topic<any>>, payload)
  }

  getAllPaths(): JavaSet<Path> {
    let paths = new ArrayList<Path>()
    
    paths.addAll(this.as(DirectoryData.class).getPaths())
    paths.addAll(
      this.oldObject?.as(DirectoryData.class).getPaths() ||
        new ArrayList<Path>()
    )

    return paths
  }

  convertPathsToPayloadPaths(paths: JavaSet<Path>): List<BlogPostPayloadPath> {
    let payloadPaths = new ArrayList<BlogPostPayloadPath>()

    let BlogPostPayloadPath = ClassFinder.getClass(
      'brightspot.example.ssg_with_webhooks.notification.BlogPostPayloadPath'
    )

    for (const path of paths) {
      let payloadPath = new BlogPostPayloadPath() as BlogPostPayloadPath

      payloadPath.path = path.getPath()
      payloadPath.siteUrls = path.getSite()?.getUrls()
      payloadPath.type = path.getType().toString()

      payloadPaths.add(payloadPath)
    }

    return payloadPaths
  }
}
