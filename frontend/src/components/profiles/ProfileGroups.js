import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../../lib/auth'
import { getSingleGroup } from '../../lib/api'


class ProfileGroups extends React.Component {

  state = {
    group: [],
    memberId: ''
  }

  async componentDidMount() {
    const groupId = this.props.id
    const res = await getSingleGroup(groupId)
    this.setState({ group: res.data })

    this.matchMember()
  }

  matchMember = () => {
    const userId = getUserId()
    const members = this.state.group.members
    let memberId
    if (members) {
      members.filter(member => {
        if (member.user.id === userId || member.user === userId)
          memberId = member._id
        return member._id
      })
      this.setState({ memberId })
    }
  }




  render() {
    const { group } = this.state
    const edit = this.props.edit
    return (

        <div className="columns">
          <Link to={`/groups/${group._id}`}> <img className="column is-three-fifths group-image" src={group.headerImage} alt="hikeImage" /></Link>
          <div className="column">
            <div>
            <Link to={`/groups/${group._id}`}><p >{group.name}</p></Link>
              {edit &&
                <button
                  className="button remove column"
                  onClick={this.props.handleClick}
                  value={group._id}
                  name={this.state.memberId}
                >Leave Group</button>}
            </div>
          </div>
        </div>

    )
  }

}

export default ProfileGroups