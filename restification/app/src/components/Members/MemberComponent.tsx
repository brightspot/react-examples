import { useState } from 'react'
import { debounce, getMember } from '../../utils/utils'

interface MembersData {
  members?: Member[]
  errors?: string[]
}

interface Member {
  displayName: string
  email: string
}

const MemberComponent = () => {
  const [data, setData] = useState<MembersData>()

  const handleOnChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    return debounce(
      () =>
        getMember(e?.target?.value).then((res) =>
          setData({
            members: res?.data?.ListOfMembers?.members,
            errors: res?.errors,
          })
        ),
      1000
    )()
  }

  return (
    <div className="member member-center">
      <h1>This will make a GET Request with Parameters</h1>
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
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
    </div>
  )
}

export default MemberComponent
