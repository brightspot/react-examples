import Members from './MembersComponent'
import MemberComponent from './MemberComponent'
import MemberPost from './MemberPost'

const MembersContainer = () => {
  return (
    <div className="members-container">
      <Members />
      <MemberComponent />
      <MemberPost />
    </div>
  )
}

export default MembersContainer
