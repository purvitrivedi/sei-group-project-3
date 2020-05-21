import React from 'react'
import axios from 'axios'
import GroupCard from './GroupCard'
// import { getAllGroups } from '../../lib/api'

class GroupIndex extends React.Component {
  state = {
    groups: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/groups')
      this.setState({ groups: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className="GroupIndex">
        <div className="hero is-medium">
          <div className="hero-body">
            <h1 className="title has-text-centered">The Hikr Groups</h1>
          </div>
        </div>
        <div>
          <section className="section">
              <div className="columns is-multiline">
                {this.state.groups.map(group => (
                  <GroupCard key={group._id} {...group} />
                ))}
              </div>
          </section>
        </div>
      </div>
    )
  }
}
export default GroupIndex