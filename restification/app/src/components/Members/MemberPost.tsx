import { useState } from 'react'

import { debounce, postMember } from '../../utils/utils'

interface MembersData {
  members?: Member[]
  errors?: string[]
}

interface Member {
  displayName: string
  email: string
}

const MemberPost = () => {
  const [data, setData] = useState<MembersData>()

  const handleOnChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    return debounce(
      () =>
        postMember(e?.target?.value).then((res) =>
          setData({
            members: res?.data.ListOfMembers.members,
            errors: res?.errors,
          })
        ),
      1000
    )()
  }

  return (
    <div className="member">
      <h1>This will make a POST Request</h1>
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
      <div className="input-wrapper">
        <label htmlFor="path">Enter Members' Display Name:</label>
        <input required name="path" onChange={handleOnChange} />
      </div>
      {data?.members?.map((member, index) => (
        <div key={index}>
          <h1>{member?.displayName}</h1>
          <h2>{member?.email}</h2>
        </div>
      ))}
    </div>
  )
}

export default MemberPost
