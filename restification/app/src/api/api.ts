const ALL_MEMBERS = process.env.REACT_APP_ALL_MEMBERS_URL || ''

const MEMBER_URL = process.env.REACT_APP_MEMBER_URL || ''

const GET_MEMBERS = () => fetch(ALL_MEMBERS).then((res) => res.json())

const GET_MEMBER_WITH_PARAMS = (params: string) =>
  fetch(`${MEMBER_URL}?arguments=${params}`).then((res) => res.json())

const POST_MEMBER = async (input: string) => {
  const formData = new FormData()
  formData.append('arguments', input)
  return fetch(MEMBER_URL, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json())
}

export { GET_MEMBERS, GET_MEMBER_WITH_PARAMS, POST_MEMBER }
