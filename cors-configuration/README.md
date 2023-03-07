# Cors Configuration

"Cross-Origin Resource Sharing ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources." - MDN Web Docs

CORS adds security against [Cross Site Request Forgery](https://owasp.org/www-community/attacks/csrf) when configured correctly. The configuration relaxes the [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) to ensure that a trusted domain is whitelisted to grant access to data from an API placed on another domain and/or port.

However, if the CORS configuration is not set up as intended, the front-end application will run into errors and will be blocked from retrieving or sending data to the server.

This example uses JS Classes and the [Brightspot GraphQL Content Delivery API (CDA) endpoint](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to demonstrate how to easily manage and debug common [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues in an app to streamline development and better secure production applications.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `cors-configuration` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front end, run the following commands from the `cors-configuration/app` directory:

```
cd app
yarn
yarn start
```

The front-end application opens automatically in the browser.

## Using the example application

The front-end app on start up displays **Loading...**. Open the developer console in your browser to see the following CORS error:

**Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.**

This is a common error that occurs when a server and a front-end application are hosted on different domains and the front-end application’s domain has not been added to the server’s allowed origins list.

There are two ways two fix this with Brightspot:

1. Programmatically, editing the JS classes files.
2. Editorially, via the local [Brightspot]('http://localhost/cms') instance.

## Via JS Classes

Edit the following file:
`brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts`

1. Uncomment the code `graphQLCorsConfiguration.addAllowedOrigin('localhost')`.
2. Save the file.
3. Upload types again: `npx brightspot types upload src` from the brightspot/src directory.
4. Open the local [Brightspot]('http://localhost/cms') instance in the web browser.
5. Via the Navigation menu, click under **Admin**, **APIs**.
6. Click on **CORS Configuration Endpoint** and save.

## Via Brightspot

1. Open the local [Brightspot]('http://localhost/cms') instance in the web browser.
2. Via the Navigation menu, click under **Admin** &rarr; **APIs**.
3. Click on **CORS Configuration Endpoint**.

At this stage, you see a form. Under **Cors Configuration** there is a dropdown with two options:

1. **Set:**, which is selected by default.
2. **None**.

Add 'localhost' to the **Allowed Origins** list. Then click save.

> **Note**: You could change this selection to **None** but then you would not be able to fix these issues via Brightspot. This setting is for applications where the front end and server are hosted on the same domain and therefore will not run into CORS errors.

## Going back to the front end

Start up your front-end application or refresh if it is still running.

**Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field foo is not allowed by Access-Control-Allow-Headers in preflight response.**

The same origin error no longer appears, showing the same origin issue is resolved. However, there is another issue to address: the front-end application’s request header is being blocked.

Now the front-end application's request header is being blocked. Follow the steps below to resolve the issue:

## Via JS Classes

Edit the following file:
`brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts`

1. Uncomment the code `graphQLCorsConfiguration.addAllowedHeader('foo')`.
2. Save the file.
3. Upload types again: `npx brightspot types upload src` from the brightspot/src directory.
4. Open the local [Brightspot]('http://localhost/cms') instance in the web browser.
5. Via the Navigation menu, click under **Admin**, **APIs**.
6. Click on **CORS Configuration Endpoint** and save.

## Via Brightspot

1. Open the local [Brightspot]('http://localhost/cms') instance in the web browser.
2. Via the Navigation menu, click under **Admin**, **APIs**.
3. Click on **CORS Configuration Endpoint**.
4. Add 'foo' to the **Allowed Headers** list. Then click save.

## Going back to the front end

Start up your front-end application again or refresh if it is still running. Open up the developer console, you no longer see any CORS errors.

## How everything works

`brightspot/src/examples/cors-configuration`: This directory contains the JS Classes that are uploaded to Brightspot.

`CorsConfigurationEndpoint.ts`: This file is the endpoint used for this example.

- The `JavaField` expects expects a class of `CustomGraphQLCorsConfiguration`. For this example a display name of `CORS Configuration` is given for the form that controls the CORS settings.
- `getCorsConfiguration` gets the current CORS settings to place in the form.
- `setCorsConfiguration` updates the values in the current form.
- `updateCorsConfiguration` updates the CORS settings to what has been put in the form. It also can be edited to update the settings programmatically.
- `afterSave` is called when the form is saved. This then calls `updateCorsConfiguration` to update the CORS settings.

## Preflight Requests

When the browser makes a request, it first sends a check request to the server called a [preflight request](‘https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request’).

If the preflight request fails, you run into the CORS errors listed above. Either the origin was not on the allowed origins list, or headers that are present in the request are not permitted.

## Performance

Making two requests everytime a front-end app sends an API call to the server will affect performance.

Open the developer console and navigate to the network tab. Under name, there will be four **cors-configuration** requests. After the first two POST requests made, there are two GET requests made. These are the preflight requests that are sending a request method of 'OPTIONS' with the headers and origin information. The POST requests will not be sent until the server responds approving the request.

## Access Control Max Age

To avoid having to make preflight requests when making the same requests, Brightspot offers another CORS configuration option. [Access Control Max Age]('https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age') which can once again be set programmatically or via your Brightspot instance:

## Via JS Classes

Edit the following file:
`brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts`

1. Uncomment the code `graphQLCorsConfiguration.setMaxAge(30)`.
2. Save the file.
3. Upload types again: `npx brightspot types upload src` from the brightspot/src directory.
4. Open the local [Brightspot]('http://localhost/cms') instance in the web browser.
5. Via the Navigation menu, click under **Admin**, **APIs**.
6. Click on **CORS Configuration Endpoint** and save.

## Via Brightspot

1. Open the local [Brightspot]('http://localhost/cms') instance in the web browser.
2. Via the Navigation menu, click under **Admin**, **APIs**.
3. Click on **CORS Configuration Endpoint**.
4. Under **Max Age** add '30' to the space available. Then save.

## Going back to the front end

Start up your front-end application again or refresh if it is still running. Open up the developer console and look at the network tab. There will be four requests like the first time around but for the next thirty delta seconds, refresh the page and see that there is no longer a need for the pre-flight requests. After thirty seconds, it will need to make another pre-flight request. This is due to the '30' delta seconds placed in this example.

## Try it yourself

- Add your own custom headers to the front-end application. Edit the `cors-configuration/app/src/App.tsx` file and under the code below, add your own custom headers. It will trigger a CORS error; fix it either using JS classes or Brightspot:

```js
myHeaders.append('Foo', 'Bar')
// Add custom headers here
```

- Update the code via JS classes to accept a max age of your choice to test pre-flight requests. Bare in mind browsers have different limits to the amount of time that can be entered to cache pre-flight requests.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
