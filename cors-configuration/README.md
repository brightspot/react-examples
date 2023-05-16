# Cors Configuration

Cross Origin Resource Sharing ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is an HTTP-header based mechanism that enhances security by allowing a server to specify which origins can access its resources. It relaxes the [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) and prevents [Cross Site Request Forgery](https://owasp.org/www-community/attacks/csrf). Improper CORS configuration can lead to errors and block frontend applications from retrieving or sending data to the server.

This example demonstrates effective management and debugging of CORS issues for streamlined development and enhanced production application security.

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

## Using the example application

The front-end app on start up displays **Loading...**. Open the developer console in your browser to see the following CORS error:

**Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.**

This is a common error that occurs when a server and a front-end application are hosted on different domains and the front-end application’s domain has not been added to the server’s allowed origins list.

Edit the following file:
`brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts`

1. Uncomment the code `graphQLCorsConfiguration.addAllowedOrigin('localhost')`.
2. Save the file.
3. Upload types.

Start up your front-end application or refresh if it is still running.

**Access to fetch at 'http://localhost/graphql/delivery/cors-configuration' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field foo is not allowed by Access-Control-Allow-Headers in preflight response.**

The same origin error no longer appears, the same origin issue is resolved. However, the front-end application’s request header is being blocked.

Edit the [CORS configuration endpoint](brightspot/src/brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts) once again:

1. Uncomment the code `graphQLCorsConfiguration.addAllowedHeader('foo')`.
2. Save the file.
3. Upload types.

Visit your front-end application. Refresh and open up the developer console. There are no longer any CORS errors.

## How everything works

`brightspot/src/examples/cors-configuration`:

`CorsConfigurationEndpoint.ts`: This file is the endpoint used for this example.

- The `JavaField` expects expects a class of `CustomGraphQLCorsConfiguration`. For this example a display name of `CORS Configuration` is given for the form that controls the CORS settings.

  ```js
  @JavaField(CustomGraphQLCorsConfiguration)
  corsConfiguration: CustomGraphQLCorsConfiguration
  ```

- `updateCorsConfiguration` This method is used to update the CORS settings programmatically:

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

## Preflight Requests

When the browser makes a request, it first sends a [preflight request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request).

If the preflight request fails, you will run into the CORS errors listed above. Either the origin was not on the allowed origins list, or headers that are present in the request are not permitted.

## Performance

Making two requests everytime a front-end app sends an API call to the server will affect performance.

Open the developer console and navigate to the network tab. Under name, there will be two **cors-configuration** requests. After the first POST request is made, there is a preflight request sent with the [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS#preflighted_requests_in_cors) method. The POST requests will not be sent until the server responds approving the request.

| CORS Configuration Network Tab                                      |
| ------------------------------------------------------------------- |
| <img alt="pre-flight-requests" src="images/pre-flight-request.png"> |

## Access Control Max Age

To avoid having to make preflight request when making the same request, Brightspot offers another CORS configuration option. [Access Control Max Age]('https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age') which can be set programmatically.

Edit the following file the Edit the [CORS configuration endpoint](brightspot/src/brightspot/example/cors_configuration/CorsConfigurationEndpoint.ts):

1. Uncomment the code `graphQLCorsConfiguration.setMaxAge(30)`.
2. Save the file.
3. Upload types.

Start up your front-end application again or refresh if it is still running. Open up the developer console and look at the network tab. There will be two requests like the first time around but for the next thirty delta seconds, refresh the page and see that there is no longer a need for the pre-flight request. After thirty seconds, it will need to make another pre-flight request.

## Try it yourself

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
