# File Uploads
This example demonstrates uploading files from a front-end application to Brightspot using the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api). This example uses a [Content Management API (CMA)](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/hello-content-management-api) endpoint. 

## What you will learn
1. [Create content with fields for uploading files to Brightspot.](#1-Create-content-with-fields-for-uploading-files-to-Brightspot)
2. [Use MIME Type annotations for limiting file upload types.](#2-Use-MIME-Type-annotations-for-limiting-file-upload-types)
3. [Upload files to Brightspot from a front-end application.](#3-Upload-files-to-Brightspot-from-a-front-end-application)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `brightspot-routing/app` directory:

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

### Start the React app

```sh
$ yarn start
```

```
Compiled successfully!
```

The React app opens automatically in the browser.

## Using the example application
The front-end application displays **Image** items stored in Brightspot. 

Once you have the front-end application running, select an image to upload. 
1. Click **Upload Image** in the browser. 
2. You should see your image appear. If you select a file that is not an image, Brightspot returns an error in the browser. You can delete uploaded images by clicking the **X** on the top right of the image card. 
3. Click on the information icon on the top left of the image card to view metadata for the image.
 
## How everything works

### 1. Create content with fields for uploading files to Brightspot

To upload files to Brightspot, use the `StorageItem` field type for the respective `JavaField`: 

[Image.tsx](./brightspot/src/brightspot/example/file_uploads/Image.ts)

```typescript
  @JavaField(StorageItem)
  @MimeTypes({ value: '+image/' })
  file: StorageItem
```

### 2. Use MIME Type annotations for limiting file upload types 

To specify the MIME Type for a file upload, use the `@MimeTypes` annotation:

[Image.tsx](./brightspot/src/brightspot/example/file_uploads/Image.ts)

```typescript
  @JavaField(StorageItem)
  @MimeTypes({ value: '+image/' })
  file: StorageItem
```

This annotation specifies valid MIME types for the target StorageItem field using the [SparseSet](https://artifactory.psdops.com/psddev-releases/com/psddev/dari-util/3.3.607-xe0f27a/dari-util-3.3.607-xe0f27a-javadoc.jar!/com/psddev/dari/util/SparseSet.html) representation.

### 3. Upload files to Brightspot from a front-end application

To enable file uploads, this example uses `createUploadLink`. This function is provided from the package [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client), and creates a terminating Apollo Link for Apollo Client that fetches a [GraphQL multipart request](https://github.com/jaydenseric/graphql-multipart-request-spec) if the GraphQL variables contain files. 

[index.tsx](./app/src/index.tsx)

```typescript
const link = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  headers: {
    'X-Client-ID': process.env.REACT_APP_CLIENT_ID,
    'X-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
  },
}) as unknown as ApolloLink
```

You can refer to the [Brightspot Documentation](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/uploading-files-in-brightspot-content-management-api) for an example of uploading a file with a CMA endpoint without using Apollo Client.

> **_Note_** This is purely an example application. In your production environment, it is important to hide API Keys that are used for the CMA endpoint. 

## Try it yourself
The following is a suggestion for learning more about file uploads with JS Classes and Brightspot:

- Try uploading a file that is not an image and observe the result. 
- Create a File class instead of a Image class, and limit the StorageItem to only accept certain file types. Refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for possible MIME types to use (hint: your `@MimeTypes` annotation should look something like: `@MimeTypes({ value: '+application/pdf +application/txt' })`).

## Troubleshooting
Refer to the [Common Issues](/README.md) section in the respository README for assistance.



(this is information I am not sure is needed or not)
#### Points to note in JS Classes files:

- `metadata`: You can view metadata fields two different ways. 
  1. To view the available metadata fields, use the GraphQL Explorer. Go to the navigation menu &rarr; **GraphQLExplorer** , then select the **File Uploads Endpoint** to query for Images. 
  2. Make sure **Query** is selected on the bottom left pane (the default). Below is a sample query to view all metadata keys and values:

```graphql
query MyQuery {
  brightspot_example_file_uploads_ImageQuery {
    items {
      name
      file {
        metadata {
          entries {
            key
            value
          }
        }
      }
    }
  }
}
```

You can also select specified metadata fields. For example, if you want to query for `originalFilename`:
```graphql
query MyQuery($keys: [String!]) {
  brightspot_example_file_uploads_ImageQuery {
    items {
      file {
        metadata {
          entries(keys: $keys) {
            value
          }
        }
      }
      name
    }
  }
}
```

  3. Select the first `keys` field nested under `metadata/entries` on the left panel of the GraphQL Explorer. Click the `$` symbol to use query variables. Add the following arguments in the variables section in the bottom of the middle pane:

```json
{
  "keys": ["originalFilename"]
}
```

Your result looks similar to the following:
```graphql
{
  "data": {
    "brightspot_example_file_uploads_ImageQuery": {
      "items": [
        {
          "file": {
            "metadata": {
              "entries": [
                {
                  "value": "test.jpg"
                }
              ]
            }
          },
          "name": "test.jpg"
        }
      ]
    }
  }
}
```

You can also view metadata for an Image by selecting a published Image item from the dashboard, then clicking on the ellipsis icon (**•••**) on the top right of the image, then selecting **Source Data**. 

Finally, you can choose to display fetch metadata as one large JSON output. The metadata shown in the front end for this application uses the JSON data.