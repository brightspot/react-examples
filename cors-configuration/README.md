# Cors Configuration

This example will use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to generate a GraphQL Content Delivery API endpoint (CDA) to then connect to a front-end application and demonstrate how to easily manage and debug common [CORS]('https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS') issues in an app to streamline development and better secure production applications.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `cors-configuration` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front-end:

```
cd app
yarn
yarn start
```

The front-end application opens automatically in the browser.

## Using the example application

The front-end app on start up displays **Loading...**. Open the developer console in your browser to see the following CORS error:

**Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.**

This is a common error that usually happens when a server and a front-end application are hosted on different domains but the domain the front-end application is hosted on, has not been added to the servers' allowed origins list.

There are two ways two fix this with Brightspot, either the development side or via the local [Brightspot]('http://localhost/cms') instance.

## Via JS Classes

Edit the following file:
`brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts`

1. Remove the commented out code on line 63.
2. Save the file.
3. Upload files once again: `npx brightspot types upload src` from the brightspot directory.

## Via Brightspot

1. Open the local [Brightspot]('http://localhost/cms') instance in the browser.
2. Via the Navigation menu, click under **Admin**, **APIs**.
3. Click on **CORS Configuration Endpoint**.

At this stage, there is a form presented to you. Under **Cors Configuration** there is a dropdown with two options:

1. **Set:**, which is selected by default.
2. **None**.

You could change this selection to **None** but then you would not be able to fix these issues via Brightspot. This setting is intended when your application and server are hosted on the same domain and so will not run into CORS errors.

Under **Allowed Origins** lets add 'localhost' to the list. Then save.

## Going back to the front end

Start up your front-end again or refresh if it is still running.

We now hit a different error in the developer console:

**Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field foo is not allowed by Access-Control-Allow-Headers in preflight response.**

The same origin error is no longer showing. We know what we did worked.

Now the front-end application's request header is being blocked. Follow the steps below to resolve the issue:

## Via JS Classes

Edit the following file:
`brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts`

1. Remove the commented out code on line 66.
2. Save the file.
3. Upload files once again: `npx brightspot types upload src` from the brightspot directory.

## ## Via Brightspot

1. Open the local [Brightspot]('http://localhost/cms') instance in the browser.
2. Via the Navigation menu, click under **Admin**, **APIs**.
3. Click on **CORS Configuration Endpoint**.
4. Under **Allowed Headers** lets add 'foo' to the list. Then save.

## Going back to the front end

Start up your front-end again or refresh if it is still running. Open up the developer console, you will no longer see any CORS errors.

## How everything works

Navigate to `brightspot/src/examples/cors-configuration`. This directory contains the JS Classes files that are uploaded to Brightspot.

- `CorsConfigurationEndpoint.ts` This file is the endpoint used for this example.

The following code in this file, creates the form displayed when viewing the endpoint under available APIs in Brightspot and allows the user to update the form:

```js
  @DisplayName({ value: 'CORS Configuration' })
  @JavaField(CustomGraphQLCorsConfiguration)
  corsConfiguration: CustomGraphQLCorsConfiguration

  getCorsConfiguration(): CustomGraphQLCorsConfiguration {
    return this.corsConfiguration
  }

  setCorsConfiguration(
    corsConfiguration: CustomGraphQLCorsConfiguration
  ): void {
    this.corsConfiguration = corsConfiguration
  }
```

The following code within the endpoint file updates the endpoint when the CORS configuration form is saved with the users added allowed origins and/or headers:

```js
  updateCorsConfiguration(
    graphQLCorsConfiguration: GraphQLCorsConfiguration
  ): void {
    super.updateCorsConfiguration(graphQLCorsConfiguration)

    Array.from(this.corsConfiguration.getAllowedOrigins()).map((origin) => {
      graphQLCorsConfiguration.addAllowedOrigin(origin)
    })

    Array.from(this.corsConfiguration.getAllowedHeaders()).map((origin) => {
      graphQLCorsConfiguration.addAllowedHeader(origin)
    })

    // Add allowed origins here:
    // graphQLCorsConfiguration.addAllowedOrigin('localhost')

    // Add allowed headers here:
    // graphQLCorsConfiguration.addAllowedHeader('foo')
  }

  afterSave() {
    this.updateCorsConfiguration(new GraphQLCorsConfiguration())
  }
```

Reviewing the code above, you can see how to add allowed origins or headers vis JS classes.

<!-- Add info/code about preflight requests -->

## Preflight Requests

When a request is sent via a browser, there is a check request beforehand made to the server. This is a [preflight request]('https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request'). It sends a request to the server to check if the options included in the request such as headers along with the origin that is making the request, is the type of request the server expects to receive. If the server comes back with the information matching what is in the options of the request and approves of the origin, the original request will be sent.

If the check request fails, that is when you will run into the CORS errors listed above. Either the origin was not on the allowed origins list or headers that are present in the request are not permitted.

## Performance

Making two requests everytime a front-end app sends an API call to the server will affect performance.

Open the developer console and navigate to the network tab. Under name, there will be four **cors-configuration** requests. After the first two POST requests made, there are two GET requests made. These are the preflight requests that are sending a request method of 'OPTIONs' with the headers and origin information. The POST requests will not be sent until the server responds approving the request.

## Access Control Max Age

To avoid having to make preflight requests when making the same requests, there is another CORS configuration option available. [Access Control Max Age]('https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age')

<!-- ADD README info on this config option -->

## Try it yourself

- Add your own custom headers to the front-end application. Edit the `cors-configuration/app/src/App.tsx` file and under the code below, add your own custom headers. It will trigger a CORS error, fix it either via JS classes or Brightspot:

```js
myHeaders.append('Foo', 'Bar')
// Add custom headers here
```

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
