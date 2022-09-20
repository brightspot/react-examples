const GET_HELLO = () =>
  fetch('http://localhost/articles/hello-world').then((res) => res.json())

const GET_HELLO_WITH_PARAMS = (params: string) =>
  fetch(`http://localhost/articles/article?path=${params}`).then((res) =>
    res.json()
  )

const POST_ARTICLE = async (input: string) => {
  const formData = new FormData()
  formData.append('path', input)
  return fetch('http://localhost/articles/success', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json())
}

export { GET_HELLO, GET_HELLO_WITH_PARAMS, POST_ARTICLE }
