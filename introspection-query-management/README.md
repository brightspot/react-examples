# Introspection Query Management

GraphQL has an [introspection system](https://graphql.org/learn/introspection) that allows users to ask a schema for information about the queries it supports. GraphQL introspection queries can be useful for developers using code-generation tools or for implementing build pipelines. However, enabling introspection queries can expose sensitive information, so it is best practice to [disable such queries in production](https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/).

You can create custom logic that allows or blocks introspection queries. This example demonstrates how to create an introspection query rule that allows access only if a specific HTTP header is passed.

## What you will learn

1. [Create an introspection query rule.](#step-1-create-an-introspection-query-rule)
2. [Apply the rule to an endpoint.](#step-2-apply-the-rule-to-an-endpoint)
3. [Configure the build pipeline to factor in the rule.](#step-3-configure-the-build-pipeline-to-factor-in-the-rule)

## Running the example application

> **_Note_:** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications. 

### Install dependencies

Run the following command from the `introspection-query-management/app/` directory:

```sh
yarn
```

Wait until a message similar to `✨ Done in 5.03s` appears.

## Using the example application

The front-end application uses types generated by the [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen) as part of the build pipeline. The GraphQL Code Generator is set up to run introspection queries on the `Introspection Query Management` endpoint.

The introspection queries fail if they do not include an `Introspection-Key` HTTP header with a value that matches the same field on the endpoint. To demonstrate this, run `yarn codegen` from the `introspection-query-management/app/` directory. An error message will appear saying the command failed.

Modify the instrospection key by doing the following:

1. In Brightspot, navigate to ☰ **> Admin >APIs > Endpoints > Introspection Query Management**, and enter any string value (such as `abcd1234`) in the `Introspection Key` field. 
1. In the `introspection-query-management/app/.env` file, change the value of the `INTROSPECTION-KEY` environment variable  to match the value you used in Brightspot.
1. Run the command `yarn codegen` again.

The GraphQL Code Generator runs the introspection queries, and creates the files, types, and hooks that the front-end application needs in order to start.

You can run the front-end application with the following command.

```sh
yarn start
```

## How everything works

### Step 1. Create an introspection query rule

An introspection query rule is a class that implements the `IntrospectionQueryRule` abstract class and provides the body of the `isAllowed()` method. The `isAllowed()` method returns `true` or `false` based on whether a particular request should be allowed.

> **_Note_:** By default, GraphQL Introspection is disabled in production mode.

```ts
[`isAllowed()`](): boolean {
  return true // allows all introspection queries
}
```

In this example, the [introspection query rule](./brightspot/src/brightspot/example/introspection_query_management/ExampleIntrospectionQueryRule.ts) only allows requests that contain a specific HTTP request header's key and value.

### Step 2. Apply the rule to an endpoint

For an introspection query rule to take effect, it must be applied to an endpoint by overriding the endpoint's `getIntrospectionQueryRule()` method and returning a new instance of the introspection query rule class.

```ts
getIntrospectionQueryRule(): IntrospectionQueryRule {
  const ExampleIntrospectionQueryRule = ClassFinder.getClass(
    'brightspot.example.introspection_query_management.ExampleIntrospectionQueryRule'
  )

  return new ExampleIntrospectionQueryRule()
}
```

This example adds a field to the [endpoint](./brightspot/src/brightspot/example/introspection_query_management/IntrospectionQueryManagementEndpoint.ts) so that the key can be set through the Brightspot UI. The code passes the value of the key to the introspection query rule where the value can be checked against the request header.

### Step 3. Configure the build pipeline to factor in the rule

The specific configuration of a build pipeline that leverages introspection queries depends on the front-end framework, build tools, and the business logic of the introspection rule. The pipeline in this example is one of many possible options.

This example uses GraphQL Code Generator to create types and hooks. It is configured with a `codegen.yml` file that defines the HTTP headers included in the requests it makes. It includes a script in the `package.json` file to run the code generator and the associated introspection queries.

[`codegen.yml`](./app/codegen.yml):

```yml
schema:
  - ${REACT_APP_GRAPHQL_URL}:
      headers:
        Introspection-Key: ${INTROSPECTION_KEY}
```

[`.env`](./app/.env):

```sh
REACT_APP_GRAPHQL_URL=http://localhost/graphql/delivery/introspection-query-management
INTROSPECTION_KEY=your-introspection-key-here
```

[`package.json`](./app/package.json):

```json
"scripts": {
    "codegen": "graphql-codegen --require dotenv/config --config codegen.yml",
  }
```

The end result is a GraphQL API with introspection available to those clients who know the required value of the configured introspection key.

## Try it yourself

Consider a use case in which each developer needs a separate introspection key. Try changing the endpoint and introspection query rule to support multiple keys.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the repository README for assistance.