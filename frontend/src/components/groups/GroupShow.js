import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId } from '../../lib/auth'

import GroupShowNavbar from './GroupShowNavbar'
import GroupShowBody from './GroupShowBody'

class GroupShow extends React.Component {
  state = {
    group: '',
    showInfo: true,
    showMembers: false,
    showPictures: false,
    showEvents: false,
    showChat: false
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

  // handleViewChange = event => {
  //   event.preventDefault()
  //   if (event.target.name === 'showInfo') {
  //     this.setState({ hideList: false, hideGrid: true, hideMap: true })
  //   } else if (event.target.name === 'hideGrid') {
  //     this.setState({ hideList: true, hideGrid: false, hideMap: true })
  //   } else {
  //     this.setState({ hideList: true, hideGrid: true, hideMap: false })
  //   }
  //   showInfo: true,
  //   showMembers: false,
  //   showPictures: false,
  //   showEvents: false,
  //   showChat: false
  // }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    // const group = this.state.group
    return(
      'hey'
    //   <div class="GroupShow">
    //     <section class="GroupShow hero">
    //       <div class="hero-body">
    //         <div class="container"><figure className="image is-2by1"><img src={group.headerImage} alt={group.name} /></figure></div>
    //       </div>
    //     </section>

    //     <div class="columns">
    //       <div class="buttons column">
    //         <button class="button" name="show.,..." onClick={this.handleViewChange}>Information</button>
    //         <button class="button" name="" onClick={this.handleViewChange}>Members</button>
    //         <button class="button" name="" onClick={this.handleViewChange}>Pictures</button>
    //         {isGroupMember() && <button class="button" name="" onClick={this.handleViewChange}>Events</button> }
    //         {isGroupMember() && <button class="button" name="" onClick={this.handleViewChange}>Chat</button> }
    //       </div>

    //       <div className="buttons is-right column">
    //         { isAuthenticated() && <Link to={`/groups/${group._id}/join`}><a className="button is-primary"><strong>Join the Group!</strong></a></Link>}
    //         { isAdmin() && <Link to={`/groups/${group._id}/edit`}><a className="button is-light">Edit</a></Link>}
    //       </div>
    //     </div>

    //     <a className="navbar-item" name="Information" href=".Information">Information</a>
    //     <a className="navbar-item" name="Members" href=".Members">Members</a>
    //     <a className="navbar-item" name="Pictures" href=".Pictures">Pictures</a>
    //     {isGroupMember() && <a className="navbar-item" name="Events" href=".Event">Events</a> }
    //     {isGroupMember() && <a className="navbar-item" name="Chat" href=".Chat">Chat</a> }
    //     <button
    //             className="button"
    //             name="hideList"
    //             onClick={this.handleViewChange}
    //           >
    //             List
    //             </button>
    //     <GroupShowNavbar 
    //       key={group._id}
    //       group={ group }
    //       isGroupMember={ this.isGroupMember } 
    //       isAdmin={ this.isAdmin }
    //     />
    //     <GroupShowBody  key={group._id} { ...group } isGroupMember={ this.isGroupMember } isAdmin={ this.isAdmin } />
    //     { this.isGroupMember && <div class="column is-full"><button class="button is-small is-right" onClick={this.handleUnsubscribe}>Unsubscribe</button></div>}
    //   </div>
    )
  }
}

export default GroupShow