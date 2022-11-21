# Images
This example application highlights the features available for displaying images in a front-end application powered by the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api).

## What you will learn
1. How to publish images in Brightspot and create various image sizes by creating a custom ImageSizeProvider
2. How to use a GraphQL Content Delivery API (CDA) endpoint to query for image data such as crops, focus points, sizes, and urls
3. How to use the ImageUrl module to generate an image url in a front-end application

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `images` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front-end:

```sh
cd app
yarn
yarn codegen
yarn mapping
yarn start
```

The front-end application will open automatically in the browser.
## Using the example application
Upload an image of your choice in Brightspot. For this example, select an image that is larger than 1080px x 1080px. [Unsplash](https://unsplash.com/) is a great place to download images.  

Once you have published the image, navigate to the front-end application. The front-end application has two pages:  Client-side Rendering and  Server-side Rendering. Click on either of the links on the home page (http://localhost:3000/) to see the image you uploaded in Brightspot. The server-side rendered image shows an image whose url was generated using the ImageUrl module. This url is generated server-side in a Next.js application to ensure the secret environment key for accessing the Apache module [Dynamic Image Manipulation Service](https://github.com/beetlebugorg/mod_dims) (DIMS) is kept hidden. There is a configuration object already created, and that configuration is passed to the ImageUrl module to generate an image url customized for your application. 

The Client-side Rendering page displays the image you uploaded to Brightspot in the various sizes created in the CustomImageSizeProvider. Refer to the documentation for further information on how to customize an [ImageSizeProvider](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/registering-image-sizes). 

## How everything works
Brightspot provides ease of content modeling and querying for content data with GraphQL, and a wealth of options for customizing images. Definitely check out the [Image documentation](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/images) to learn more about just how much you can do with images in Brightspot.

An `ImageGraphQLEndpoint` makes it possible to query for Images or a single Image. You can view all of the GraphQL data using the GraphQL Explorer (**Developer** &rarr; **GraphQL Explorer**, then select the **Images GraphQL** endpoint.)

This example uses a picture HTML element to ensure that the correct image size is used for various screen sizes. This has a large impact on website performance. 

## Try it yourself
The following is a suggestion for learning more about images with Brightspot:
1. Try customizing images in the CMS (change the filter method, add a crop, etc.) and then check your front-end application. Those changes will appear immediately. (TODO: the server-side rendered images will show changes after fixes are made in Brightspot).

2. View the network tab and refresh your browser. Notice how the image file size retrieved changes based on the screen size.

3. If you are using the Google Chrome browser, try running a [Lighthouse performance test](https://developer.chrome.com/docs/lighthouse/overview/) to verify the page performance (since this is a development environment you run the Lighthouse evaluation for desktop and not mobile. The mobile score will be significantly lower because other optimizations done in a production environment are not in place. )
## Troubleshooting
Refer to the [Common Issues](/README.md) section in the respository README for assistance.