# Cors Configuration

Cross Origin Resource Sharing ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is an HTTP-header based mechanism that enhances security by allowing a server to specify which origins can access its resources. It relaxes the [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) and prevents [Cross Site Request Forgery](https://owasp.org/www-community/attacks/csrf). Improper CORS configuration can lead to errors and block frontend applications from retrieving or sending data to the server.

This example demonstrates debugging CORS issues and effective configuration for streamlined development and enhanced production application security.

## What you will learn

1. [Debug common CORS issues](#1-debug-common-cors-issues)
2. [Configure CORS programmatically](#2-configure-cors-programmatically)

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

```sh
yarn
yarn start
```

The front-end application opens automatically in the browser.

#### 1. Debug common CORS issues

The front-end app on start up displays **Loading...**. Open the developer console in your browser to see the following CORS error:

> **Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.**

This is a common error that occurs when a server and a front-end application are hosted on different domains and the front-end application’s domain has not been added to the server’s allowed origins list.

Update the [CORS Configuration](brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts) endpoint by adding the following code under the `Allowed origins` comment or uncomment the code within the file:

```js
graphQLCorsConfiguration.addAllowedOrigin('localhost')
```

Save the file and upload your Brightspot types.

Start up your front-end application or refresh if it is still running.

> **Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field foo is not allowed by Access-Control-Allow-Headers in preflight response.**

The same origin error no longer appears, the same origin issue is resolved. However, the front-end application’s request header is being blocked.

Update the [CORS Configuration](brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts) endpoint once again by adding the following code under the `Allowed headers` comment or uncomment the code within the file:

```js
graphQLCorsConfiguration.addAllowedHeader('foo')
```

Save the file and upload your Brightspot types.

Visit your front-end application. Refresh and open up the developer console. There are no longer any CORS errors.

#### Preflight Requests

When the browser makes a request, it first sends a [preflight request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request).

If the preflight request fails, you will run into the CORS errors listed above. Either the origin was not on the allowed origins list, or headers that are present in the request are not permitted.

Making two requests everytime a front-end app sends an API call to the server will affect performance.

Open the developer console and navigate to the network tab. Under name, there will be two **cors-configuration** requests. After the first POST request is made, there is a preflight request sent with the [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS#preflighted_requests_in_cors) method. The POST requests will not be sent until the server responds approving the request.

| CORS Configuration Network Tab                                      |
| ------------------------------------------------------------------- |
| <img alt="pre-flight-requests" src="images/pre-flight-request.png"> |

To avoid having to make preflight request when making the same request, Brightspot offers another CORS configuration option. [Access Control Max Age]('https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age') which can be set programmatically.

Edit the following file the Edit the [CORS configuration endpoint](brightspot/src/brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts):

Update the [CORS Configuration](brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts) endpoint one last time by adding the following code under the `Set max age` comment or uncomment the code within the file:

```js
graphQLCorsConfiguration.setMaxAge(30)
```

Save the file and upload your Brightspot types.

Start up your front-end application again or refresh if it is still running. Open up the developer console and look at the network tab. There will be two requests like the first time around but for the next thirty delta seconds, refresh the page and see that there is no longer a need for the pre-flight request. After thirty seconds, it will need to make another pre-flight request.

## How everything works

#### 2. Configure CORS programmatically

`brightspot/src/examples/cors-configuration`:

[CORS configuration endpoint](brightspot/src/brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts): The endpoint file used in this example.

- `updateCorsConfiguration` This method is used to update the CORS settings programmatically:

  - Within the method you have access to the class `GraphQLCorsConfiguration` stored in `graphQLCorsConfiguration` which has the method `addAllowedOrigin`. You can use this method to add a string of a allowed origin here.
  - Another method within `graphQLCorsConfiguration` is `addAllowedHeader`. You can use this method to add a string of a allowed header here.
  - Another method within `graphQLCorsConfiguration` is `setMaxAge`. You can use this method to add a number representing delta seconds. This number is the length of time you want to cache the users pre-flight request.

  ```js
  updateCorsConfiguration(
      graphQLCorsConfiguration: GraphQLCorsConfiguration
  ): void {
      super.updateCorsConfiguration(graphQLCorsConfiguration)

      // Add allowed origins here:
      // graphQLCorsConfiguration.addAllowedOrigin('localhost')

      // Add allowed headers here:
      // graphQLCorsConfiguration.addAllowedHeader('foo')

      // Set max age to thirty seconds here:
      // graphQLCorsConfiguration.setMaxAge(30)
  }
  ```

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
