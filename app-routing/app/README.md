# App Routing with Next.js and Brightspot

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Follow the instructions for running the Brightspot instance.

Run the development server. CD into `app-routing/app` and run the following commands:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Use ids for GraphQL queries with dynamic rouing

In the `app/pages` directory section you can see how section pages and their associated article pages are rendered dynamically. GraphQL queries use the id for the associated query item, but also use the `as` parameter to keep from showing the id argument in the url.

Example:

```
<Link href={`/${data.Page?.name}/${item.headline}?article=${item._id}`} as={`/${data.Page?.name}/${item.headline}`} key={item._id}>
```

Refer to the [Next/Router documentation](https://nextjs.org/docs/api-reference/next/router) and [Next/Link documentation](https://nextjs.org/docs/api-reference/next/link) for more information.
