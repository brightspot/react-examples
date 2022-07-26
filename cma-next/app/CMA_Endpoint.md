# CMA Endpoint Creation

Instructions on creating a CMA Endpoint editorially in Brightspot.

## Create and Enpoint

From the hamburger menu in the top left corner, navigate to Admin → APIs.

You will see on the left, a rail where you can Create a GraphQL Delivery API or GraphQL Management API. For the purpose of this tutorial create a Management API endpoint.

Select GraphQL Management API and Click on New.

A form will appear titled New GraphQL Management API. Name the endpoint hello-world for the purpose of this tutorial.

select Hello World For Read Types and Read/Write Types. Leave CORS Configuration as None. Click Save at the bottom of the page.

_NOTE: If you run into CORS errors in the browser, set the CORS Configuration to http://localhost:3000 (the URL for the front end application).

| New GraphQL Management API |
| --- |
| <img width="1781" alt="GraphQL Management API" src="https://user-images.githubusercontent.com/58481829/175982466-a085f06f-ea4f-4a8a-929b-a190ccf6defc.png">|


## Publish Hello World Content

Next, publish HelloWorld content that can be used to test the endpoint.
Click on the `+` sign at the top of the home page and select Hello World.

A small form will pop up with a required Title field and a Text field. Fill in accordingly.

On the right you will see a small rail labeled URLs which will contain a permalink URL based off of the value of the Title field. This can be used later to reference this content. However, if you choose not to generate a permalink, you can click the check box to unselect that option.

Click Publish on the top right to save.

| Publish HelloWorld |
| --- |
|<img width="1781" alt="Publish HelloWorld" src="https://user-images.githubusercontent.com/58481829/175983343-6d8f7ab5-efda-4990-9e41-fd323f3780e7.png">|

## GraphQL HelloWorld

Click on the hamburger menu in the top left corner and navigate to Developer → GraphQL Explorer.

At the top of the page you will see a dropdown for Select GraphQL Endpoint.
Select the previously created `hello-world (CMA)` endpoint.


To query all HelloWorld content, click `com_brightspot_tutorial_HelloWorldQuery`, then `items`, then check the fields you want the query to return.

The final query should look similar to the following query. For more information on creating GraphQL queries visit [graphql.org/learn/queries/](graphql.org/learn/queries/)

```
query MyQuery {
  brightspot_example_HelloWorldQuery {
    items {
      title
      text
      _id
    }
  }
}
```

| HelloWorld GraphQL Query Result |
| --- |
|  |

You can also select an individual Hello World item by adding the `id`  To use variables, select the `$` next to the `" "` that appears next to id when selected. Add the id variable in the bottom of the middle rail in the `Query Variables` section.

```
query MyQuery($id: ID) {
  brightspot_example_HelloWorldQuery(id: $id) {
    items {
      _id
      _type
      text
      title
    }
  }
}

```

