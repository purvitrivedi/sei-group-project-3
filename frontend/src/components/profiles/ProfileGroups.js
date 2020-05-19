import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../../lib/auth'


class ProfileGroups extends React.Component {

  state = {
    group: [],
    memberId: ''
  }

  async componentDidMount() {
    const groupId = this.props.id
    const res = await axios.get(`/api/groups/${groupId}`)
    this.setState({ group: res.data })
  
    this.matchMember()
  }

  matchMember = () => {
    const userId = getUserId()
    const members = this.state.group.members
    let memberId
    if (members) {
      members.filter(member => {
        if(member.user === userId) 
        memberId = member._id
        return member._id
      })
      this.setState({memberId})
    }
  }




  render() {
    const { group } = this.state
    const edit = this.props.edit
    return (

      <div className="column is-full fav-comp">
        <Link to={`/groups/${group._id}`}>
          <div className="columns">
            <img className="column is-three-fifths" src={group.headerImage} alt="hikeImage" />
            <p className="column">{group.name}</p>
          </div>
        </Link>
        {edit &&
          <button
            className="button remove column"
            onClick={this.props.handleClick}
            value={group._id}
            name={this.state.memberId}
          >Leave Group</button>}
      </div>

    )
  }

}

export default ProfileGroups