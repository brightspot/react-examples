import { GET_MEMBER_WITH_PARAMS, POST_MEMBER } from '../api/api'

let timeoutId: ReturnType<typeof setTimeout>
const debounce = (fn: Function, ms = 300) => {
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const getMember = async (input: string | null) => {
  if (input) {
    return GET_MEMBER_WITH_PARAMS(input).then((res) => handleResponse(res))
  }
}

const postMember = async (input: string | null) => {
  if (input) {
    return POST_MEMBER(input).then((res) => handleResponse(res))
  }
}

const handleResponse = async (res: Response) => {
  const json = await res.json()
  let errors: string[] = []

  if (json.errors) {
    for (let error of json.errors) {
      errors.push(error.message)
    }
  }
  return { data: json.data, errors }
}

export { debounce, getMember, postMember, handleResponse }
