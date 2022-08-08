# App Routing with Next.js and Brightspot

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Follow the [instructions](https://github.com/brightspot/react-examples/tree/feature/cma-next) for running the Brightspot instance.

Run the development server. CD into `app-routing/app` and run the following commands:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Publish CMS content

Publish at a minimum the following content to display material in your front-end application:

1. App: for this tutorial, use the title 'News' (that will generate a `/news` permalink used in `app/pages/index.tsx`).
2. Page: publish four or more different pages that are linked to the News app.
3. Article: publish at least two articles per page. Make sure to add the correct page in the page section of the article (example: a world article would be linked to the world page).

## Use ids for GraphQL queries with dynamic rouing

In the `app/pages` directory section you can see how section pages and their associated article pages are rendered dynamically. GraphQL queries use the id for the associated query item, but also use the `as` parameter to keep from showing the id argument in the url.

Example (`/app/components/List.tsx`):

```
<Link
    key={i}
    href={`/${article?.page?.name}/${article?.headline}?article=${article?._id}`}
    as={`/${article?.page?.name}/${article?.headline}`}
>
```

Refer to the [Next/Router documentation](https://nextjs.org/docs/api-reference/next/router) and [Next/Link documentation](https://nextjs.org/docs/api-reference/next/link) for more information.
