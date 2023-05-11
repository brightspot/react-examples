import ArrayList from 'brightspot-types/java/util/ArrayList'
import Class from 'brightspot-types/java/lang/Class'
import JavaClass from 'brightspot-types/JavaClass'
import JavaField from 'brightspot-types/JavaField'
import JavaObject from 'brightspot-types/java/lang/Object'
import List from 'brightspot-types/java/util/List'

import ClassFinder from 'brightspot-types/com/psddev/dari/util/ClassFinder'
import DirectoryObjectModification from 'brightspot-types/com/psddev/cms/db/Directory$ObjectModification'
import JavaRecord from 'brightspot-types/com/psddev/dari/db/Record'
import Modification from 'brightspot-types/com/psddev/dari/db/Modification'
import Notification from 'brightspot-types/com/psddev/dari/notification/Notification'
import Path from 'brightspot-types/com/psddev/cms/db/Directory$Path'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import Topic from 'brightspot-types/com/psddev/dari/notification/Topic'

import Article from './Article'
import Section from './Section'
import SsgTopic from './SsgTopic'

const contentTypes = [
  Article.getClass(), 
  Section.getClass()
]

export default class SsgTrigger extends JavaClass(
  'brightspot.example.ssg_with_webhooks.SsgTrigger',
  Modification.Of(JavaObject)
) {
  @JavaField(JavaRecord)
  oldObject?: JavaRecord

  beforeCommit(): void {
    super.beforeCommit()

    let original = this.getState().getOriginalObjectOrNull()

    if (
      this.getState().getOriginalObjectOrNull() === null ||
      this.getState().isNew()
    ) {
      return
    }

    if (contentTypes.every((type) => !type.isInstance(original))) {
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

    if (contentTypes.every((type) => !type.isInstance(original))) {
      return
    }

    let SsgPayload = ClassFinder.getClass(
      'brightspot.example.ssg_with_webhooks.SsgPayload'
    )
    let payload = new SsgPayload()

    let paths: List<Path> = this.as(DirectoryObjectModification.class).getPaths()
    let oldPaths: List<Path>

    if (this.oldObject !== null) {
      oldPaths = this.oldObject.as(DirectoryObjectModification.class).getPaths()
    } else {
      oldPaths = new ArrayList<Path>()
    }

    paths.addAll(oldPaths)

    payload.paths = new ArrayList()

    for (const path of paths) {
      payload.paths.add({
        path: path.getPath() || null,
        site: path.getSite() ? path.getSite().getName() : null,
        type: path.getType().toString() || null,
      })
    }

    // gets references
    let references = Query.fromAll()
      .where('* matches ?', this)
      .and('_id != ?', this)
      .selectAll() as List<JavaRecord>

    // gets inverse references
    let indexes = this.getState().getIndexes()
    for (const index of indexes) {
      let newValue = this.getState().getValue(index.getField())

      if (newValue) {
        references.add(newValue)
      }

      let oldValue = this.oldObject?.getState().getValue(index.getField()) as JavaRecord

      if (oldValue) {
        references.add(oldValue)
      }
    }

    let referencePaths = new ArrayList()

    for (const reference of references) {
      let paths = reference.as(DirectoryObjectModification.class).getPaths()

      for (const path of paths) {
        referencePaths.add({
          path: path.getPath() || null,
          site: path.getSite() ? path.getSite().getName() : null,
          type: path.getType().toString() || null,
        })
      }
    }

    payload.referencePaths = new ArrayList(referencePaths)

    payload.values = this.getState().getSimpleValues()

    Notification.publish(SsgTopic.getClass() as Class<Topic<any>>, payload)
  }

  beforeDelete(): void {
    super.beforeDelete()

    if (this.getState().getOriginalObjectOrNull() === null) {
      return
    }

    let original = this.getOriginalObject()

    if (contentTypes.every((type) => !type.isInstance(original))) {
      return
    }

    let SsgPayload = ClassFinder.getClass(
      'brightspot.example.ssg_with_webhooks.SsgPayload'
    )
    let payload = new SsgPayload()

    let paths: List<Path> = this.as(DirectoryObjectModification.class).getPaths()

    payload.paths = new ArrayList()

    for (const path of paths) {
      payload.paths.add({
        path: path.getPath() || null,
        site: path.getSite() ? path.getSite().getName() : null,
        type: path.getType().toString() || null,
      })
    }

    let references = Query.fromAll()
      .where('* matches ?', this)
      .and('_id != ?', this)
      .selectAll() as List<JavaRecord>

    let referencePaths = new ArrayList()

    for (const reference of references) {
      let paths = reference.as(DirectoryObjectModification.class).getPaths()

      for (const path of paths) {
        referencePaths.add({
          path: path.getPath() || null,
          site: path.getSite() ? path.getSite().getName() : null,
          type: path.getType().toString() || null,
        })
      }
    }

    payload.referencePaths = new ArrayList(referencePaths)

    payload.values = this.getState().getSimpleValues()

    Notification.publish(SsgTopic.getClass() as Class<Topic<any>>, payload)
  }
}
