import React from 'react'
import axios from 'axios'
import { getUserId } from '../../lib/auth'

class ProfileGroups extends React.Component {
  state = {
    groups: []
  }


  async componentDidMount() {
    const res = await axios.get('/api/groups')
    this.setState({ groups: res.data })
    this.checkUserInGroup()
  }

  checkUserInGroup = () => {
    const userId = getUserId()
    console.log(this.state.groups)
    const members = this.state.groups.map(group => ({users: group.members.map(member => member.user), id: group._id}))
  
// * Now check if the userId matches with userId in members, if yes, return the group ID

//* Check userIds match with UserID

console.log(members.map(member=> member.users))




  }


  render() {
    return (
      <h1 className="subtitle">I follow...</h1>
    )
  }
}

export default ProfileGroups