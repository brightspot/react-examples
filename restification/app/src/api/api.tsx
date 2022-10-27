const GET_MEMBERS = () =>
  fetch('http://localhost/members-api/all-members').then((res) => res.json())

const GET_MEMBER_WITH_PARAMS = (params: string) =>
  fetch(`http://localhost/members-api/member?arguments=${params}`).then((res) =>
    res.json()
  )

const POST_MEMBER = async (input: string) => {
  const formData = new FormData()
  formData.append('arguments', input)
  return fetch('http://localhost/members-api/member', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json())
}

export { GET_MEMBERS, GET_MEMBER_WITH_PARAMS, POST_MEMBER }
