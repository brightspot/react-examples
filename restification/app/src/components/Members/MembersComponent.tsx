import { useState, useEffect } from 'react'

import { GET_MEMBERS } from '../../api/api'
import { handleResponse, handleError } from '../../utils/utils'
import { Brightspot_Example_Restification_MemberQueryResult } from '../../generated'

interface MembersData {
  members?: Brightspot_Example_Restification_MemberQueryResult | undefined
  errors?: string[]
}

const Members = () => {
  const [data, setData] = useState<MembersData>()

  const getMembers = async () => await GET_MEMBERS()

  useEffect(() => {
    getMembers()
      .then((res) => handleResponse(res, setData))
      .catch((error: Error) => handleError(error, setData))
  }, [])

  return (
    <div className="members list-of-members">
      <h1>
        This makes a GET Request with the list of members, only their display
        name.
      </h1>
      {data?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
      {data?.members?.items.map((member, index) => (
        <div key={index}>
          <h1>{member.displayName}</h1>
        </div>
      ))}
    </div>
  )
}

export default Members
