import DirectoryObjectModification from 'brightspot-types/com/psddev/cms/db/Directory$ObjectModification'
import Path from 'brightspot-types/com/psddev/cms/db/Directory$Path'
import Modification from 'brightspot-types/com/psddev/dari/db/Modification'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import JavaRecord from 'brightspot-types/com/psddev/dari/db/Record'
import Notification from 'brightspot-types/com/psddev/dari/notification/Notification'
import Topic from 'brightspot-types/com/psddev/dari/notification/Topic'
import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'
import Class from 'brightspot-types/java/lang/Class'
import JavaObject from 'brightspot-types/java/lang/Object'
import ArrayList from 'brightspot-types/java/util/ArrayList'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import Article from './Article'
import Section from './Section'
import SsgTopic from './SsgTopic'

export default class SsgTrigger extends JavaClass(
  'brightspot.example.ssg_with_webhooks.SsgTrigger',
  Modification.Of(JavaObject)
) {
  @JavaField(JavaRecord)
  oldObject?: JavaRecord

  beforeCommit(): void {
    super.beforeCommit()

    let original = this.getState().getOriginalObjectOrNull()

    if (this.getState().getOriginalObjectOrNull() === null || this.getState().isNew()) {
      return
    }

    if (!(Article.getClass().isInstance(original)
      || Section.getClass().isInstance(original))) {
      return
    }

    this.oldObject = Query.fromAll()
      .where('_id = ?', this)
      .noCache()
      .first() as JavaRecord
  }

  afterSave(): void {
    super.afterSave()
    
    if (this.getState().getOriginalObjectOrNull() === null) {
      return
    }

    let original = this.getOriginalObject()

    if (!(Article.getClass().isInstance(original)
      || Section.getClass().isInstance(original))) {
      return
    }
    
    let oldPaths

    if (this.oldObject !== null) {
      oldPaths = this.oldObject.as(DirectoryObjectModification.class).getPaths()
    } else {
      oldPaths = []
    }

    let newPaths = this.as(DirectoryObjectModification.class).getPaths()

    let allPaths: string[] = []

    for (const path of newPaths) {
      allPaths.push(path.getPath())
    }
    for (const path of oldPaths) {
      allPaths.push(path.getPath())
    }

    allPaths = [...new Set(allPaths)]

    let ssgPayload = ClassFinder.getClass('brightspot.example.ssg_with_webhooks.SsgPayload')
    let payload = new ssgPayload()
    payload.paths = new ArrayList<string>()

    allPaths.forEach((path) => payload.paths.add(path))

    Notification.publish(SsgTopic.getClass() as Class<Topic<any>>, payload)
  }
}
