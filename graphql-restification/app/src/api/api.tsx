const GET_HELLO = () =>
  fetch('http://localhost/articles/hello-world').then((res) => res.json())

const POST_BRIGHTSPOT = async (input: string) => {
  const formData = new FormData()
  formData.append('path', input)
  return fetch('http://localhost/articles/brightspot', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json())
}

export { GET_HELLO, POST_BRIGHTSPOT }
