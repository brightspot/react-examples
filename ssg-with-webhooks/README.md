# Static Site Generation with Webhooks

Static web pages are faster and lighter than dynamic sites, resulting in better performance and load times. They are typically used for content that rarely changes because updating static pages requires lengthy rebuilds of the entire site. However, newer front-end frameworks allow for on-demand updates to individual pages, providing fast and up-to-date pages without the limitation of frequent site rebuilds.

This example demonstrates how to leverage Brightspot's Notification and Webhooks features to trigger web page regeneration when content is published or updated.

## What you will learn

1. [Create a notification payload and topic](#1-create-a-notification-payload-and-topic)
2. [Create a notification trigger](#2-create-a-notification-trigger)
3. [Configure the REST Management API](#3-configure-the-rest-management-api)
4. [Create a webhook](#4-create-a-webhook)
5. [Create a Next.js webhook handler](#5-create-a-nextjs-webhook-handler)
6. [Create view models to get URL paths and data fields](#6-create-view-models-to-get-url-paths-and-data-fields)
7. [Create static Next.js pages](#7-create-static-nextjs-pages)
8. [Handle permalink updates and deletions](#8-handle-permalink-updates-and-deletions)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

<details>
<summary>
<span>
<b>Configure a REST Management API</b>
</span>
</summary>
In Brightspot, navigate to **☰** &rarr; **Admin** &rarr; **APIs** &rarr; **Create** &rarr; **REST Management API** &rarr; **New**, enter a name, and click **Save**.

```
✅ Saved
```

</details>

<details>
<summary>
<span>
<b>Create an API Client</b>
</span>
</summary>

In Brightspot, navigate to **☰** &rarr; **Admin** &rarr; **APIs** &rarr; **Clients** &rarr; **New API Client** and add a name, add your newly created REST Management API to the `Endpoints` field, and add an API Key. Then copy the Client ID and API Key into the matching variables in the `app/.env` file. Finally, click **Save**.

```
✅ Saved
```

> **_Note_** See {TODO: add link here} for detailed instructions on creating an API Client and API Keys.

</details>

<details>
<summary>
<span>
<b>Create a Site</b>
</span>
</summary>

In Brightspot, navigate to **☰** &rarr; **Admin** &rarr; **Sites & Settings** &rarr; **New Site** and enter a name, add `http://localhost:3000` to the `URLs` field, and click **Save**

</details>

Run the following commands from the `ssg-with-webhooks/app` directory:

<details>
<summary>
<span>
<b>Install dependencies</b>
</span>
</summary>

```sh
$ yarn
```

```
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
[4/4] 🔨 Building fresh packages...
✨ Done in 6.03s.
```

</details>

<details>
<summary>
<span>
<b>Generate types</b>
</span>
</summary>

```sh
$ yarn codegen
```

```
✔ Parse Configuration
❯ Generate outputs
  ❯ Generate ./src/generated.ts
✔ Parse Configuration
✔ Generate outputs
✨ Done in 2.05s.
```

</details>

<details>
<summary>
<span>
<b>Create a webhook</b>
</span>
</summary>

```sh
$ yarn webhook
```

```
{
  status: 'ok',
  result: {
    url: 'http://host.docker.internal:3000/api/revalidate',
    topic: {
      _type: '4e62e084-d74f-3c1c-a35c-458c92f3886c',
      _id: '00000188-0ad5-d0c9-affd-aaf73b8f0000'
    },
    _id: '00000188-0ad5-d0c9-affd-aaf73b860000',
    _type: '46915378-efd2-3fc0-a308-5c03ca4d8fd6'
  }
}
✨  Done in 0.46s.
```

</details>

<details>
<summary>
<span>
<b>Generate Next.js app production build</b>
</span>
</summary>

```sh
$ yarn build
```

```
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
✨  Done in 3.97s.
```

</details>

<details>
<summary>
<span>
<b>Start the Next.js app production server</b>
</span>
</summary>

```sh
$ yarn start
```

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

</details>

## Using the example application

The Next.js app is a simple blog site with content consisting of **Blog Posts**. They are set up to automatically generate permalinks as shown in the [Brightspot Routing](https://github.com/brightspot/react-examples/tree/main/brightspot-routing) example.

Publish one or more **Blog Posts**. After a few seconds, refresh the Next.js web page and navigate through the app to find the published content. Note that the content appears on the app without needing to rebuild.

### 1. Create a notification payload and topic

In this context, a payload is the data structure that is sent from Brightspot to the front-end app. The app needs to know which pages to regenerate, so the payload should include a list of unique identifiers for those pages.

A payload is created by extending the `JavaRecord` class and adding fields that represent the desired data structure.

This example uses a data structure that mirrors the [Brightspot Routing](https://github.com/brightspot/react-examples/tree/main/brightspot-routing) example. The payload includes a `paths` field to store a list of URL paths (and associated metadata) of new or updated content.

[BlogPostPayload.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/notification/BlogPostPayload.ts)

```ts
export default class BlogPostPayload extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostPayload',
  JavaRecord
) {
  @JavaField(List.Of(BlogPostPayloadPath))
  paths?: List<BlogPostPayloadPath>
}
```

The `paths` field is defined as a list of objects so that the URL path metadata is packaged together with the path itself. Since this type is an object, it is defined as a separate class extending `JavaRecord`. The `@Embedded` annotation is added so that the values of the subfields are added to the payload.

[BlogPostPayloadPath.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/notification/BlogPostPayloadPath.ts)

```ts
@Embedded
export default class BlogPostPayloadPath extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostPayloadPath',
  JavaRecord
) {
  @JavaField(String)
  path?: string

  @JavaField(List.Of(String))
  siteUrls?: List<string>

  @JavaField(String)
  type?: string
}
```

A topic bundles the payload together and allows for its delivery. It is created with a class that extends the `AbstractTopic<P>` abstract class where `P` is the payload class. Topics can optionally store additional configuration fields.

The topic in this example does not use any configuration fields and only overrides the `toStringFormat()` class method for debugging purposes.

[BlogPostTopic.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/notification/BlogPostTopic.ts)

```ts
export default class BlogPostTopic extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostTopic',
  AbstractTopic.Of(BlogPostPayload)
) {
  toStringFormat(subscriber: Subscriber, payload: BlogPostPayload): string {
    return payload.getLabel()
  }
}
```

### 2. Create a notification trigger

To keep the front-end app up-to-date at all times, it should receive a notification every time content is created or updated. One way to capture these moments is by overriding the `afterSave()` method. Doing so will serve as the trigger to send the notification.

This example separates the notification trigger from the data model by using a [Modification](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/modifications) of the `BlogPost` model.

Within the overridden `afterSave()` method, the payload can be created, filled with the relevant URL path data, and sent as a notification.

Within the `afterSave()` method, a payload is created and its `paths` field is populated with the URL path data from the published content. Then a notification is published using the matching topic and the newly instantiated payload.

[BlogPostTrigger.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/notification/BlogPostTrigger.ts)

```ts
export default class BlogPostTrigger extends JavaClass(
  'brightspot.example.ssg_with_webhooks.notification.BlogPostTrigger',
  Modification.Of(BlogPost)
) {
  afterSave(): void {
    super.afterSave()

    let BlogPostPayload = ClassFinder.getClass(
      'brightspot.example.ssg_with_webhooks.notification.BlogPostPayload'
    )

    // Creates a new payload
    let payload = new BlogPostPayload() as BlogPostPayload

    // Gets the raw URL path data for this published content
    let paths = this.getAllPaths()

    // Converts the raw URL path objects into strings and stores them on the payload's path field
    payload.paths = this.convertPathsToPayloadPaths(paths)

    // Publishes a notification with the blog post topic and payload attached
    Notification.publish(BlogPostTopic.getClass() as Class<Topic<any>>, payload)
  }

  /***
   * Helper method that returns the URL path data for this published content
   ***/
  getAllPaths(): JavaSet<Path> {
    return this.as(DirectoryData.class).getPaths()
  }

  /***
   * Helper method that takes raw URL path data and converts it into strings to
   * match the BlogPostPayloadPath fields.
   ***/
  convertPathsToPayloadPaths(paths: JavaSet<Path>): List<BlogPostPayloadPath> {
    // ... implementation
  }
}
```

### 3. Configure the REST Management API

The previous step determines when notifications are sent, but not their delivery method. This step configures the REST Management API and allows developers to create webhooks that point to their front-end app.

To configure the REST Management API in Brightspot, navigate to **☰** &rarr; **Admin** &rarr; **APIs** &rarr; **Create** &rarr; **REST Management API** &rarr; **New**, enter a name, specify a path (or use the default), and click **Save**.

<details>
<summary>
<span>
<b>Configure REST Management API</b>
</span>
</summary>
<img  height="400px" src="./brightspot/documentation/images/restManagementApi.png" alt="Configure REST Management API in Brightspot">
</details>

> **_Note_** The REST Management API requires client credentials to be accessed outside of the Brightspot UI. See {TODO: add link here} for detailed instructions on creating an API Client and API Keys.

### 4. Create a webhook

A webhook can be created through the Brightspot UI or through an external HTTP request.

This example uses a Node.js script to create a webhook. It uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to send an HTTP request to the `/webhooks` route of the REST Management API with a body containing the webhook configuration. The configuration includes the desired notification topic (defined in step 1) and a recipient URL.

[createWebhook.mjs](./app/createWebhook.mjs)

```js
const postWebhook = async () => {
  fetch(`${process.env.REST_MANAGEMENT_ENDPOINT}/webhooks`, {
    method: 'POST',
    headers: {
      'X-Client-Id': process.env.CLIENT_ID,
      'X-Client-Secret': process.env.CLIENT_API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
}

postWebhook()
```

The body of the request must be structured like the code snippet below. The `url` is the full recipient URL for the webhook and the `topic._type` is the full class name of the webhook topic defined in step 1.

```js
const body = {
  url: process.env.NEXTJS_WEBHOOK_ROUTE,
  topic: {
    _type: 'brightspot.example.ssg_with_webhooks.notification.BlogPostTopic',
  },
}
```

> **_Note_** The script is mapped to the `yarn webhook` command defined in the `package.json` file. In this example the command should only be run once. Separate scripts could be used to create, modify, or delete webhooks.

### 5. Create a Next.js webhook handler

This example uses Next.js [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) and [On-Demand Revalidation](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation) to handle the webhooks coming from Brightspot.

The Next.js webhook handler API route must match the URL destination defined in step 4. This example uses `pages/api/revalidate`.

The body of the incoming webhook will be structured like the webhook payload defined in step 1. The list of URL path data is extracted from the request and the corresponding Next.js app pages are revalidated.

[revalidate.ts](./app/pages/api/revalidate.ts)

```ts
// data structure matches the payload defined in step 1
type Path = {
  path: string
  siteUrls?: string[]
  type: string
  _id: string
  _type: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // extract URL path data from incoming webhook
  let paths: Path[] = req.body.data.paths || []

  // filter out paths that belong to other Sites
  paths = paths.filter((path) =>
    path.siteUrls?.some(
      (siteUrl) => siteUrl === process.env.NEXT_PUBLIC_BSP_SITE_URL
    )
  )

  // revalidate each individual path
  for (const directoryPath of paths) {
    try {
      await res.revalidate(directoryPath.path)
    } catch (err) {
      console.log(err)
    }
  }

  // additionally, revalidate the 'Home' page
  if (paths.length > 0) {
    try {
      await res.revalidate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return res.json({ revalidated: true })
}
```

### 6. Create view models to get URL paths and data fields

To build static pages, the Next.js app needs to be able to fetch all of the URL paths for relevant content and then use those paths to get the data fields for each.

Since this example has a single data model, it uses a view model that queries for all objects of that type ([AllBlogPostsViewModel.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/api/AllBlogPostsViewModel.ts)). Then the Next.js app uses that view model in a GraphQL query that gets the relevant URL path metadata ([AllPaths.graphql](./app/queries/AllPaths.graphql)).

For each individual object, it uses the [BlogPostViewModel.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/api/BlogPostViewModel.ts) and [BlogPost.graphql](./app/queries/BlogPost.graphql) query to fetch relevant data.

### 7. Create static Next.js pages

Since the **Blog Post** content URL paths depend on CMS data, the corresponding Next.js page filename must use [Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes) and [Catch-all Segments](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments) to map out the paths.

```
pages/[...path.tsx]
```

Then, to define the list of page paths to be statically generated during the site build, the [getStaticPaths](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) function is defined inside the page.

It uses Apollo Client and the query defined in step 6 to get the list of all URL paths to the relevant content and then returns that list.

> **_Note_** The `getStaticPaths` function in this example only adds paths with the `Permalink` type. Other path types are ignored.

[[...path.tsx]](./app/pages/%5B...path%5D.tsx)

```ts
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GetAllPathsDocument,
  })

  let paths: { params: ParsedUrlQuery }[] = []

  data.AllBlogPosts.blogPosts.forEach((blogPost: BlogPost) => {
    blogPost.paths?.forEach((path) => {
      if (path?.type === 'Permalink') {
        paths.push({ params: { path: path?.path?.split('/') } })
      }
    })
  })

  paths.forEach((path: any) => path.params.path.shift())

  return {
    paths,
    fallback: true,
  }
}
```

Next, the props for each static page are fetched using [getStaticProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props). The `context` parameter contains a field that lists the URL route segments (e.g. `[my, example, path]`). The segments are joined to form a URL path string that serves as a query variable for the GraphQL query that gets a single matching **Blog Post**. If the query returns an object, it passes the data as props for the Next.js page to use.

```ts
export const getStaticProps: GetStaticProps = async (context) => {
  let subdirectories = context.params?.path as string[]
  let path = subdirectories.join('/')

  const { data } = await client.query({
    query: GetBlogPostDocument,
    variables: {
      path,
    },
  })

  if (data.BlogPost) {
    return {
      props: { blogPost: data.BlogPost },
    }
  }

  return {
    notFound: true,
  }
}
```

Lastly, the page uses the props to render out the component.

```ts
const Content: NextPage<Props> = ({ blogPost }) => {
  // return ...
}
```

### 8. Handle permalink updates and deletions

The notification trigger used in step 2 captures the URL paths of the content _after_ it is saved. This creates a potential problem when a permalink is updated or deleted. The resulting webhook will send the new permalink path(s), but not the old one(s), potentially creating dead links on the front-end app. Although it is generally discouraged, editors may still choose to delete permalinks.

This step modifies the notification trigger to include the old URL paths in the payload so the front-end app will regenerate those pages as well.

First, an `oldObject` field is added to the trigger with the `@Ignored` annotation so that it does not appear on the **Blog Post** content edit page. The `oldObject` field is populated within the `beforeCommit()` method and its value is set using the [Query API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/querying). Since this happens `beforeCommit()`, all of the object's previous values, including the URL paths, are stored for later use.

[BlogPostTrigger.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/notification/BlogPostTrigger.ts)

```ts
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
```

Then the `getAllPaths()` helper method is updated to add the URL paths from the `oldObject` as well.

```ts
getAllPaths(): JavaSet<Path> {
  let paths = new ArrayList<Path>()

  paths.addAll(this.as(DirectoryData.class).getPaths())
  paths.addAll(
    this.oldObject?.as(DirectoryData.class).getPaths() ||
      new ArrayList<Path>()
  )

  return paths
}
```

## Try it yourself

The following is a suggestion for learning more about Static Site Generation and Webhooks with Brightspot:

1. Consider a case where the app needs to serve 3xx status codes on redirect URLs. Try updating the `getStaticProps` function to check if the path is a permalink and return a `Redirect` object if so.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
