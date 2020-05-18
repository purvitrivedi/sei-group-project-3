import React from 'react'
import axios from 'axios'
import { getUserId } from '../../lib/auth'

class ProfileGroups extends React.Component {

  state = {
    group: []
  }

  async componentDidMount() {
    const groupId = this.props.id
    const res = await axios.get(`/api/groups/${groupId}`)
    this.setState({ group: res.data })
  }

  render() {
    const { group } = this.state
    const edit = this.props.edit
    return (
      <div className="column is-full fav-comp">
        <div className="columns">
          <img className="column is-three-fifths" src={group.headerImage} alt="hikeImage" />
          <p className="column">{group.name}</p>
          </div>
          {edit && <button
            className="button remove column is-full"
          >Remove</button>}

        
      </div>
    )
  }

}

export default ProfileGroups