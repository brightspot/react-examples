import { useState, useEffect } from 'react'

import { GET_MEMBERS } from '../../api/api'
import { handleResponse } from '../../utils/utils'
import { Brightspot_Example_Restification_Member } from '../../generated'

interface MembersData {
  members?: Brightspot_Example_Restification_Member[] | undefined
  errors?: string[]
}

const Members = () => {
  const [data, setData] = useState<MembersData>()

  const getMembers = async () => await GET_MEMBERS()

  useEffect(() => {
    getMembers()
      .then((res) => handleResponse(res))
      .then((res) =>
        setData({
          members: res?.data?.ListOfMembers?.members,
          errors: res?.errors,
        })
      )
      .catch((error: Error) => setData({ errors: [error.message] }))
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
      {data?.members?.map((member: any, index: number) => (
        <div key={index}>
          <h1>{member.displayName}</h1>
        </div>
      ))}
    </div>
  )
}

export default Members