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
        <section className="GroupIndex hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Welcome to Group Pages
              </h1>
              <h2 className="subtitle">
                Find your groups and join today!
              </h2>
            </div>
          </div>
        </section>

        <section className="GroupIndex section">
          <div className="container">
            <div className="columns is-multiline">
              {this.state.groups.map(group => (
                <GroupCard key={group._id} {...group}/>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default GroupIndex