import { useState } from 'react'

import { Brightspot_Example_Restification_MemberQueryResult } from '../../generated'
import { debounce, postMember } from '../../utils/utils'

interface MembersData {
  members?: Brightspot_Example_Restification_MemberQueryResult | undefined
  errors?: string[]
}

const MemberPost = () => {
  const [data, setData] = useState<MembersData>()

  const handleOnChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    return debounce(() => postMember(e?.target?.value, setData), 1000)()
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
      {data?.members?.items.map((member, index) => (
        <div key={index}>
          <h1>{member?.displayName}</h1>
          <h2>{member?.email}</h2>
        </div>
      ))}
    </div>
  )
}

export default MemberPost
