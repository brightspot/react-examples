import { Article } from '../generated/graphql'

interface ContainerData {
  article?: Article | undefined
  isClicked?: boolean | undefined
  errors?: string[]
}

const GET_HELLO = () =>
  fetch('http://localhost/articles/hello-world')
    .then((res) => res.json())
    .then((res) => handleResponse(res))
    .catch((error: Error) => handleError(error))

const POST_BRIGHTSPOT = async (isClicked: boolean) => {
  const formData = new FormData()
  formData.append('path', 'brightspot')
  return fetch('http://localhost/articles/brightspot', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => handleResponse(res, isClicked))
    .catch((error: Error) => handleError(error))
}

const handleResponse = (
  res: any,
  isClicked: boolean = false
): ContainerData => {
  let article: Article | undefined
  let errors: string[] = []

  if (res?.data?.Article) {
    article = {
      headline: res.data.Article.headline,
      subheadline: res.data.Article.subheadline,
    }
  }
  if (res.errors) {
    for (let error of res.errors) {
      errors.push(error.message)
    }
  }
  return {
    article,
    isClicked,
    errors,
  }
}

const handleError = (error: Error) => {
  return { errors: [error.message] }
}

export { GET_HELLO, POST_BRIGHTSPOT }
