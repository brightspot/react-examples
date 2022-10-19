# File Uploads
This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to enable file uploads in a front-end application.

## What you will learn
1. How to use a Content Management API (CMA) Endpoint to enable file uploads from a front-end application to Brightspot
2. How to use MimeType Annotations for limiting file upload types
3. How to gracefully manage errors that occur when uploading a file to Brightspot from a front-end application

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `file-uploads` directory:

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
yarn start
```

The front-end application will open automatically in the browser.
## Using JS Classes
JS Classes make it possible to create and modify Brightspot CMS content with JavaScript (TypeScript).

Run the following commands in the `brightspot` directory (if there is already a `brightspot.json` file you can skip the `npx brightspot config server http://localhost/cms` command):

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download
npx brightspot types upload src
```
## Using the example application
The front-end application displays **Image** items stored in Brightspot. 

Once you have the front-end application running, select an image to upload. Click **Upload Image** in the browser. You should see your image appear. If you select a file that is not an image, you should see an error in the browser. You can also delete uploaded images by clicking the **X** on the top right of the image card. 

If you hover over the image card, you will see the file name. 
 
## How everything works
JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL. Navigate to `brightspot/src/examples/file_uploads`. This directory contains the JS Class files that are uploaded to Brightspot.

#### Points to note in JS Classes files:
- `StorageItem`: used in `Image.ts` as the type for the `file` field, `StorageItem` enables uploading files to Brightspot 
- `@MimeTypes`: also used in `Image.ts`, this annotation specifies valid MIME types for the target StorageItem field using the [SparseSet](https://artifactory.psdops.com/psddev-releases/com/psddev/dari-util/3.3.607-xe0f27a/dari-util-3.3.607-xe0f27a-javadoc.jar!/com/psddev/dari/util/SparseSet.html) representation
- `metadata`: You can view metadata fields two different ways. To view the available metadata fields you can either use the GraphQL Explorer by navigating to **GraphQLExplorer** from the left menu in Brightspot and selecting the **File Uploads Endpoint** to query for Images. Make sure **Query** is selected on the bottom left pane (the default). Here is a sample query to view all metadata keys and values:

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

Select the first `keys` field in nested under `metadata/entries` on the left panel of the GraphQL Explorer. Click the `$` symbol to use Query Variables. in the **Query Variables** section in the bottom of the middle pane add the following arguments:

```json
{
  "keys": ["originalFilename"]
}
```

Your result should look similar to the following:
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

You can also view metadata for an Image by selecting a published Image Item from the dashboard, then clicking on the three ellipsis (**•••**) on the top right of the image, then select **Source Data**. 
#### Points to note in the front-end application:
- `createUploadLink`: this function is provided from the NPM package [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client). This function creates a terminating Apollo Link for Apollo Client that fetches a [GraphQL multipart request](https://github.com/jaydenseric/graphql-multipart-request-spec) if the GraphQL variables contain files. 

You can refer to the [Brightspot Documentation](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/uploading-files-in-brightspot-content-management-api) for an example of uploading a file with a CMA endpoint without using Apollo Client.

> **_Note_** This is purely an example application! In production, it is important to hide API Keys that are used for the CMA Endpoint. 

## Try it yourself
The following is a suggestion for learning more about File Uploads with JS Classes and Brightspot:

- Try uploading a file that is not an image and observe the result. 
- Create a File class instead of a Image class, and limit the StorageItem to only accept certain file types refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for possible MIME types to use (hint: your `@MimeTypes` annotation should look something like: `@MimeTypes({ value: '+application/pdf +application/txt' })`).

## Troubleshooting
Refer to the [Common Issues](/README.md) section in the respository README for assistance.