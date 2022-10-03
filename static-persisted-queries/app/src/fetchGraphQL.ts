// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text: string) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(process.env.REACT_APP_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
    }),
  })

  // Get the response as JSON
  return await response.json()
}

export default fetchGraphQL
