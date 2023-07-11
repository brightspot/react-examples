import JavaClass from 'brightspot-types/JavaClass'
import JavaMethodParameters from 'brightspot-types/JavaMethodParameters'
import JavaMethodReturn from 'brightspot-types/JavaMethodReturn'
import List from 'brightspot-types/java/util/List'

import CurrentSite from 'brightspot-types/com/psddev/cms/page/CurrentSite'
import DirectoryStatic from 'brightspot-types/com/psddev/cms/db/Directory$Static'
import Query from 'brightspot-types/com/psddev/dari/db/Query'
import Site from 'brightspot-types/com/psddev/cms/db/Site'
import ViewInterface from 'brightspot-types/com/psddev/cms/view/ViewInterface'
import ViewModel from 'brightspot-types/com/psddev/cms/view/ViewModel'

import SsgWithWebhooksEndpoint from './SsgWithWebhooksEndpoint'
import BlogPostViewModel from './BlogPostViewModel'
import BlogPost from '../models/BlogPost'

@ViewInterface
export default class AllBlogPostsViewModel extends JavaClass(
  'brightspot.example.ssg_with_webhooks.api.AllBlogPostsViewModel',
  ViewModel.Of(SsgWithWebhooksEndpoint)
) {
  @CurrentSite
  site?: Site

  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(BlogPostViewModel))
  getBlogPosts(): List<BlogPostViewModel> {
    let query = Query.from(BlogPost.getClass())

    query.where(DirectoryStatic.hasPathPredicate())

    if (this.site) {
      query.and(this.site.itemsPredicate())
    }

    let blogPosts = query.selectAll()


    return this.createViews(BlogPostViewModel.getClass(), blogPosts)
  }
}
