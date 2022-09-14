const GET_HELLO = () =>
  fetch('http://localhost/articles/hello-world').then((res) => res.json())

const POST_BRIGHTSPOT = async () => {
  const formData = new FormData()
  formData.append('path', 'brightspot')
  return fetch('http://localhost/articles/brightspot', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json())
}

export { GET_HELLO, POST_BRIGHTSPOT }
