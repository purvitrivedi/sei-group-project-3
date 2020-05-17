import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId } from '../../lib/auth'

import GroupShowNavbar from './GroupShowNavbar'
import GroupShowBody from './GroupShowBody'

class GroupShow extends React.Component {
  state = {
    group: ''
  }

  // fetch
  async componentDidMount() {
    try {
      const groupId = this.props.match.params.id
      const res = await axios.get(`/api/groups/${groupId}`)
      this.setState({ group : res.data })
    } catch (err) {
      console.log(err)
    }
  }

  // unsubs from group
  handleUnsubscribe = async () => {
    try {
      const groupId = this.props.match.params.id
      const group = await axios.get(`/api/groups/${groupId}`)
      const userId = getUserId()
     
      const conf = window.confirm('Are you sure you want to unsubscribe?')
      if (conf) group = await axios.delete(`/api/groups/${groupId}/members/${userId}`)
      this.setState({ group })
      this.props.history.push('/groups')
    } catch (err) {
      console.log(err.response)
    }
  }

  // auth
  isGroupMember = () => {
    const group = this.state.group
    const userId = getUserId()
    if (isAuthenticated() && group.members.some( member => member.user._id === userId )) return true
    else return false
  }
  isAdmin = () => {
    const group = this.state.group
    const userId = getUserId()
    if (isAuthenticated() && group.createdMember._id === userId ) return true
    else return false
  }


  render() {
    // console.log(this.state)
    // console.log(this.props)
    const group = this.state.group
    return(
      <div class="GroupShow">
        <section class="GroupShow hero">
          <div class="hero-body">
            <div class="container"><figure className="image is-2by1"><img src={group.headerImage} alt={group.name} /></figure></div>
          </div>
        </section>
        <GroupShowNavbar key={group._id} { ...group } isGroupMember={ this.isGroupMember } isAdmin={ this.isAdmin } />
        <GroupShowBody  key={group._id} { ...group } isGroupMember={ this.isGroupMember } isAdmin={ this.isAdmin } />
        { this.isGroupMember && <div class="column is-full"><button class="button is-small is-right" onClick={this.handleUnsubscribe}>Unsubscribe</button></div>}
      </div>
    )
  }
}

export default GroupShow