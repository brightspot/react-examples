# Static Site Generation with Webhooks

Static web pages are faster and lighter than dynamic sites, resulting in better performance and load times. They are typically used for content that rarely changes because updating static pages requires lengthy rebuilds of the entire site. However, newer front-end frameworks allow for on-demand updates to individual pages, providing fast and up-to-date pages without the limitation of frequent site rebuilds.

This example demonstrates how to leverage Brightspot's [Notifications](https://www.brightspot.com/documentation/brightspot-cms-user-guide/latest/notifications) feature to trigger web page regeneration when content is published or updated.

## What you will learn

1. [Create an endpoint to manage webhooks](#1-create-and-endpoint-to-manage-webhooks)
2. [Define a webhook payload](#2-define-a-webhook-payload)
3. [Configure a webhook notification trigger](#3-configure-a-webhook-notification-trigger)
4. [Define a Next.js webhook handler](#4-define-a-nextjs-webhook-handler)
5. [Create static Next.js pages](#5-create-static-nextjs-pages)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `ssg-with-webhooks/app` directory:

### Install dependencies

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

### Generate types

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

### Create a webhook

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

### Generate production build

```sh
$ yarn build
```

```
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
✨  Done in 3.97s.
```

### Start the Next.js app production build

```sh
$ yarn start
```

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Using the example application

The Next.js app is a simple news site with content consisting of **Sections** and **Articles**. They are set up to automatically generate permalinks as shown in the [Brightspot Routing](https://github.com/brightspot/react-examples/tree/main/brightspot-routing) example.

Publish one or more **Sections** and/or **Articles** in Brightspot and then navigate through the React app to find the published content. When viewing a specific section or article, note that the React app URL path matches the permalink in Brightspot. The React app is using the URL path to query for the matching content in Brightspot.

Publish one or more **Sections** and/or **Articles** in Brightspot. After a few seconds, refresh the web page and navigate through the Next.js app to find the published content. Note that the content appears on the app without having to rebuild.

## How everything works

### 1. Create and endpoint to manage webhooks

> **_Note_** TODO

### 2. Define a webhook payload

> **_Note_** TODO

### 3. Configure a webhook notification trigger

> **_Note_** TODO

### 4. Define a Next.js webhook handler

> **_Note_** TODO

### 5. Create static Next.js pages

> **_Note_** TODO

## Try it yourself

> **_Note_** TODO

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
