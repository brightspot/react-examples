# File Uploads
Because the official GraphQL specification does not address file uploading, Brightspot's [Content Management API (CMA)](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/hello-content-management-api) implements the [GraphQL multipart request specification](https://github.com/jaydenseric/graphql-multipart-request-spec), a multipart form-field structure for GraphQL requests used in various file upload client-server implementations.

This example demonstrates uploading files from a front-end application to Brightspot using a CMA endpoint. (Uploading files is a GraphQL mutation [an update or deletion of data], so the CMA endpoint is required). This example uses the [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client) package.

## What you will learn

1. [Upload files to Brightspot using GraphQL](#step-1-upload-files-to-brightspot-using-graphql).
1. [Brightspot's Storage Item GraphQL fields](#step-2-brightspots-storage-item-graphql-fields).
1. [MIME Type annotations for limiting file upload types](#step-3-use-mime-type-annotations-for-limiting-file-upload-types).

## Running the example application

**Note** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `file-uploads/app/` directory:

### Install dependencies

```sh
yarn
```

### Start the React app

```sh
yarn start
```

The React app opens automatically in the browser.

## Using the example application

### Create an API Client###

1. Navigate to  **&#x2630; > Admin > APIs > Clients > New API Client**.
1. In the **Name** field, enter a name.
1. Under **Endpoints**, click &#x2295; and select **File Uploads Endpoint**.
1. Copy the **Client ID**, and add it to the `REACT_APP_CLIENT_ID` field in the `file-uploads/app/.env` file.
1. Click **Add API Key**, copy the key that is generated, and add it to the `REACT_APP_CLIENT_SECRET` in the same `.env` file. 
1. Click **Save**.

### Upload images from the front-end

1. In the front-end app, add an image file by clicking on **Upload Image File** or **Add Image URL**.
1. Click **X** on the top-right of the image card to delete the uploaded image.
1. Click on the information icon at the top-left of the image card to view metadata for the image.

## How everything works

### Step 1. Upload files to Brightspot using GraphQL

To upload files to Brightspot, use the `StorageItem` field type for the respective `JavaField`, as in the file [Image.tsx](./brightspot/src/brightspot/example/file_uploads/Image.ts).

```typescript
@JavaField(StorageItem)
file: StorageItem
```

Any field that is a `StorageItem` has `url` and `file` GraphQL input fields, making it possible to upload files using the file URL or by uploading directly. 

In the front-end application, use the `createUploadLink` function provided from the apollo-upload-client package. This function creates a [terminating Apollo Link](https://www.apollographql.com/docs/react/api/link/introduction/#the-terminating-link) for Apollo Client that fetches a GraphQL multipart request if the GraphQL variables contain files. See the file [index.tsx](./app/src/index.tsx).

```typescript
const link = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  headers: {
    'X-Client-ID': process.env.REACT_APP_CLIENT_ID,  //  client id and secret are required for any CMA endpoint
    'X-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
  },
}) 
```

Refer to the [Brightspot Documentation](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/uploading-files-in-brightspot-content-management-api) for an example of uploading a file with a CMA endpoint without using Apollo Client.

**Note** Using environment variables does not hide API keys, because they can be retrieved from the browser's developer tools via the API fetch request. In a production environment, it is important to hide API keys that are used for the CMA endpoint. 

### Step 2. Brightspot's Storage Item GraphQL fields

To view the available fields provided with the `StorageItem` field type, use the GraphQL Explorer. 

1. Navigate to **&#x2630; > Developer > GraphQL Explorer**.
1. Select **File Uploads Endpoint**. The GraphQL Explorer opens for image queries.
1. Verify **Query** is selected in the **Add new** field in the bottom-left pane.
1. Under `items`, expand `file`. The following fields are available: 

| Storage Item GraphQL Fields                                            |
| -------------------------------------------------------- |
| <img  alt="Storage Item GraphQL Fields" src="docs/images/storage-item-fields.png"> |

You can view `metadata` by `key` and `value` pairs or in JSON format:

```graphql
query MyQuery {
  brightspot_example_file_uploads_ImageQuery {
    items {
      file {
        metadata {
          entries {
            key
            value
          }
          json
        }
      }
    }
  }
}
```

You can select specific metadata keys:

```graphql
query MyQuery {
  brightspot_example_file_uploads_ImageQuery {
    items {
      file {
        metadata {
          entries(keys: "originalFilename") {
            value
          }
        }
      }
    }
  }
}

```

You can also view metadata for an image by selecting a published Image item from the dashboard, then clicking **&#x22EF;** on the top right of the image, then selecting **Source Data**. 

**Note** Metadata for an image is only provided when the image is uploaded using the `file` input field. 

### Step 3. Use MIME type annotations for limiting file upload types

To specify the MIME type for a file upload in Brightspot, use the `@MimeTypes` annotation, as in the file [Image.tsx](./brightspot/src/brightspot/example/file_uploads/Image.ts).

```typescript
@JavaField(StorageItem)
@MimeTypes({ value: '+image/' })
file: StorageItem
```

This annotation specifies valid MIME types for the target `StorageItem` field using the [SparseSet](https://artifactory.psdops.com/psddev-releases/com/psddev/dari-util/3.3.607-xe0f27a/dari-util-3.3.607-xe0f27a-javadoc.jar!/com/psddev/dari/util/SparseSet.html) representation.

## Try it yourself
The following is a suggestion for learning more about file uploads with JavaScript classes and Brightspot:

- Try uploading a file that is not an image and observe the result. 
- Create a `File` class instead of an `Image` class, and limit the `StorageItem` to only accept certain file types. Refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for possible MIME types to use. (Hint: your `@MimeTypes` annotation should look something like `@MimeTypes({ value: '+application/pdf +application/txt' })`.)

## Troubleshooting
Refer to the [Common Issues](/README.md) section in the repository README for assistance.
