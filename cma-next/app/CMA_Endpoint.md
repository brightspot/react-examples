# CMA Endpoint Creation

Instructions on creating a CMA Endpoint editorially in Brightspot.

## Create Endpoint

From the hamburger menu in the top left corner, navigate to Admin → APIs.

You will see on the left, a rail where you can Create a GraphQL Delivery API or GraphQL Management API. For the purpose of this tutorial create a Management API endpoint.

Select GraphQL Management API and Click on New.

A form will appear titled New GraphQL Management API. Name the endpoint hello-world for the purpose of this tutorial.

select Hello World For Read Types and Read/Write Types. Leave CORS Configuration as None. Click Save at the bottom of the page.

_NOTE: If you run into CORS errors in the browser, set the CORS Configuration to http://localhost:3000 (the URL for the front end application)._

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


### Query for HelloWord items
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
| <img width="721" alt="All Hello World Queries" src="https://user-images.githubusercontent.com/58481829/180990975-1aba81bd-834a-4aab-b112-b1dc607722a0.png"> |

You can also select an individual Hello World item by adding the `id`  To use variables, select the `$` next to the `" "` that appears next to id when selected. Add the id variable in the bottom of the middle rail in the `Query Variables` section.

```
query MyQuery($id: ID = "") {
  brightspot_example_HelloWorldQuery(id: $id) {
    items {
      title
      text
      _id
    }
  }
}
```
| HelloWorld GraphQL Query by ID Result |
| --- |
| <img width="1435" alt="Query by Id" src="https://user-images.githubusercontent.com/58481829/180991511-b5ef3791-3efb-4755-9ba1-968bad5f846c.png"> |

### Create a new Hello World

On the bottom of the left rail of the GraphQL Explorer, choose Mutation (don't forget the + button!). You will see a mutation in the left rail. Delete the query from the middle rail to focus on the Mutation query. Click on the arrow icon next to brightspot_example_HelloWorldSave. To make a new HelloWorld, you will select the diffs field, brightspot_example_HelloWorldDiff, then select `text` and `title`. You will dynamically pass in those values. You will not need to select id since that will be generated if not provided (The Brightspot GraphQl API will know this is a new HelloWorld since no id was provided). Test your query by once again clicking the Play button.

```
mutation MyMutation($text: String = "", $title: String = "") {
  brightspot_example_HelloWorldSave
  (diffs: {brightspot_example_HelloWorldDiff: 
    {text: $text, title: $title}}) {
    text
    title
    _id
  }
}
```

| New Hello World |
| --- |
| <img width="1435" alt="New Hello World" src="https://user-images.githubusercontent.com/58481829/180992969-3e4b3335-871a-4589-80de-c29422630472.png"> |

### Update a Hello World

You will use the same mutation option, but this time use an id parameter. Click on the arrow icon next to brightspot_example_HelloWorldSave. Select the diffs field, brightspot_example_HelloWorldDiff, then select `text` and `title`. You will dynamically pass in those values. You will select `_id` (note that you need to select `_id` in both the diffs and the brightspot_example_HelloWorldDiff. The id parameter will be the same). Test your query by once again clicking the Play button.

```
mutation MyMutation($text: String = "", $title: String = "", $id: DiffId = "") 
{
  brightspot_example_HelloWorldSave(diffs: 
    {brightspot_example_HelloWorldDiff: 
      {text: $text, title: $title}, id: $id}, id: $id) {
    text
    title
    _id
  }
}
```

| Update Hello World |
| --- |
|<img width="1433" alt="Update Hello World" src="https://user-images.githubusercontent.com/58481829/180994337-cc76ab1e-4100-466b-9c84-63aae5930e0a.png">|


### Delete Hello World

Back in GraphQL Explorer, select Mutation from the bottom of the left rail, and select brightspot_example_HelloWorldDelete. The only variable needed for this query is id. To delete permanently, select true for that field. Select `_id`,` `text`, and `title` as values that the query will return. You can test your delete query by using the Query Variables section (bottom of the middle rail) or pasting in an id directly in the id field in the left rail. 

```
mutation MyMutation($id: ID = "") {
  brightspot_example_HelloWorldDelete(id: $id, permanently: true) {
    _id
    text
    title
  }
}
```

| Delete Hello World |
| --- |
| <img width="1433" alt="Delete Hello World" src="https://user-images.githubusercontent.com/58481829/180995204-c3c270a6-bd7d-4e2a-8b1b-c2525d30e1cd.png">|
