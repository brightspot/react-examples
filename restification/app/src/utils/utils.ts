import { Brightspot_Example_Restification_MemberQueryResult } from '../generated'
import { GET_MEMBER_WITH_PARAMS, POST_MEMBER } from '../api/api'

let timeoutId: ReturnType<typeof setTimeout>
const debounce = (fn: Function, ms = 300) => {
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const getMember = async (input: string | null, setData: Function) => {
  if (input) {
    GET_MEMBER_WITH_PARAMS(input)
      .then((res) => handleResponse(res, setData))
      .catch((error: Error) => handleError(error, setData))
  }
}

const postMember = async (input: string | null, setData: Function) => {
  if (input) {
    POST_MEMBER(input)
      .then((res) => handleResponse(res, setData))
      .catch((error: Error) => handleError(error, setData))
  }
}

const handleResponse = (res: any, setData: Function): void => {
  let errors: string[] = []
  let members: Brightspot_Example_Restification_MemberQueryResult

  if (res?.data?.ListOfMembers) {
    members = {
      items: res.data.ListOfMembers.members,
    }
    if (res.errors) {
      for (let error of res.errors) {
        errors.push(error.message)
      }
    }
    return setData({ members, errors })
  }
}

const handleError = (error: Error, setData: Function): void => {
  setData({ errors: [error.message] })
}

export { debounce, getMember, postMember, handleResponse, handleError }
