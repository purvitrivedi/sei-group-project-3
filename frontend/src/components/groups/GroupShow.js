import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId } from '../../lib/auth'

import GroupShowNavbar from './x GroupShowNavbar'
import GroupShowBody from './GroupShowBody'

class GroupShow extends React.Component {
  state = {
    group: '',
    display: {
      Information : true,
      Members: false,
      Pictures: false,
      Events: false,
      Chat: false
    }
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
    let members
    if (group.members) members = group.members.some( member => member.user._id === userId ) ? true : false
    return members
  }
  isAdmin = () => {
    const group = this.state.group
    const userId = getUserId()
    let admin
    if (group.createdMember) admin = group.createdMember._id === userId ? true : false
    return admin
  }

  // control views
  handleViewChange = event => {
    event.preventDefault()
    const display = { ...this.state.display }
    display[ Object.keys(display)[Object.values(display).indexOf(true)] ] = false
    display[event.target.name] = true
    this.setState({ display })
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    console.log(isAuthenticated())
    console.log(this.isGroupMember())
    console.log(this.isAdmin())
    
    const group = this.state.group

    let members
    if (group.members) {
      members = group.members.map( member => (
        <article class="media" key={member._id}>
        <div class="media-left">
          <figure class="image is-64x64">
            <img src={member.profileImage} alt={member.username} />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
            <strong>{member.username}</strong><small>{member.email}</small>
              <br />
              {member.bio}
            </p>
          </div>

          <nav class="level is-mobile">
          <div class="level-left">

            <a class="level-item" aria-label="1.profile">
              <span class="icon is-small">
                <Link to={`/profile/${member.user._id}`}><i class="fas fa-address-card"></i></Link>
              </span>
            </a>

            <a class="level-item" aria-label="2.reply">
              <span class="icon is-small">
                //! link to message sent w populated field
                <i class="fas fa-reply" aria-hidden="true"></i>
              </span>
            </a>

              <a class="level-item" aria-label="3.favHike">
                <span class="icon is-small">
                { member.favoriteHikes ? 
                  <Link to={`/hikes/${member.favoriteHikes[0]._id}`}><i class="fas fa-heart" aria-hidden="true"></i></Link>
                  : ''
                }
              </span>
            </a>
          </div>
        </nav>

        </div>
      </article>
      ))
    }

    let pictures
    if (group.userAddedImages) {
      pictures = group.userAddedImages.map( img => (
        <div class="column is-1" key={img._id}>
          <figure className="image is-square"><img src={img.images} alt={group.name} /></figure>
        </div>
      ))
    }

    let events
    if (group.events) {
      events = group.events.map( event => (
        <div class="section box" key={event._id}>
          
          <figure className="image is-square"><img src={img.images} alt={group.name} /></figure>
        </div>

eventName: { type: String, required: true }, 
startDate: { type: Date, required: true },
endDate: { type: Date, required: true },
description: { type: String, required: true },
hike: { type: mongoose.Schema.ObjectId, ref: 'Hike' },
participants: { type: mongoose.Schema.ObjectId, ref: 'User' },
createdMember: { type: mongoose.Schema.ObjectId, ref: 'User' }
      ))
    }

    return (
      <div class="GroupShow">
        <section class="GroupShow hero">
          <div class="hero-body">
            <div class="container"><figure className="image is-2by1"><img src={group.headerImage} alt={group.name} /></figure></div>
          </div>
        </section>

        <div class="columns">
          <div class="buttons column is-8">
            <button class="button is-active" name="Information" onClick={this.handleViewChange}>Information</button>
            <button class="button is-active" name="Members" onClick={this.handleViewChange}>Members</button>
            <button class="button is-active" name="Pictures" onClick={this.handleViewChange}><i class="fas fa-image" aria-hidden="true"></i>&nbsp;Pictures</button>
            {this.isGroupMember() && <button class="button is-active" name="Events" onClick={this.handleViewChange}>Events</button> }
            {this.isGroupMember() && <button class="button is-active" name="Chats" onClick={this.handleViewChange}>Chat</button> }
          </div>

          <div class="buttons is-right column">
            { !this.isGroupMember() && <Link to={`/groups/${group._id}/join`}><a class="button is-primary"><strong>Join the Group!</strong></a></Link>}
            { this.isAdmin() && <Link to={`/groups/${group._id}/edit`}><a class="button is-light">Edit</a></Link>}
          </div>
        </div>

        {/* <GroupShowBody  key={group._id} { ...group } isGroupMember={ this.isGroupMember } isAdmin={ this.isAdmin } /> */}


        <div class={`${this.state.display.Information ? "Information" : "is-hidden" }`} >
          <section class="section">
            <div class="container">
              <h1 class="title"><strong>Welcome to {group.name}! </strong></h1>
              <p class="subtitle">Description</p>
              <div class="content">{group.description}</div>
            </div>
          </section>
        </div>

        <div class={`${this.state.display.Members ? "Members" : "is-hidden" }`}>
          <h1 class="subtitle">Group Members</h1>
          { members }
        </div>

        <div class={`${this.state.display.Pictures ? "Pictures" : "is-hidden" }`}>
          <section class="section">
            <div class="container">
              <h1 class="subtitle">Group Pics</h1>
              <div class="columns is-multi">
                { pictures }
              </div>
            </div>
          </section>
        </div>
      
        <div class={`${this.state.display.Events ? "Events" : "is-hidden" }`}>
           <section class="section">
             <div class="container">
               <h1 class="subtitle">Events</h1>
               <div class="columns is-multi">
                 { events }
               </div>
             </div>
           </section>
         </div>
      
  
  
        { this.isGroupMember && <div class="column is-full"><button class="button is-small is-right" onClick={this.handleUnsubscribe}>Unsubscribe</button></div>}
      </div>
      )
  }
    
}


export default GroupShow