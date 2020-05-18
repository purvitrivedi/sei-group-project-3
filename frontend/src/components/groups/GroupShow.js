import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId } from '../../lib/auth'

import GroupShowNavbar from './x GroupShowNavbar'
import GroupShowBody from './GroupShowBody'

class GroupShow extends React.Component {
  state = {
    group: '',
    displayController: { 
      Information: true,
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
    if (isAuthenticated() && group.members.some( member => member.user._id === userId )) return true
    else return false
  }
  isAdmin = () => {
    const group = this.state.group
    const userId = getUserId()
    if (isAuthenticated() && group.createdMember._id === userId ) return true
    else return false
  }

  // control views
  handleViewChange = event => {
    event.preventDefault()

    const displayController = { ...this.state.displayController }
    const source = `{ ${event.target.name} : true }`
    Object.assign(displayController, source)
    this.setState({ displayController })
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    const group = this.state.group
    return (
      <div class="GroupShow">
        <section class="GroupShow hero">
          <div class="hero-body">
            <div class="container"><figure className="image is-2by1"><img src={group.headerImage} alt={group.name} /></figure></div>
          </div>
        </section>

        <div class="columns">
          <div class="buttons column">
            <button class="button" name="Information" onClick={this.handleViewChange}>Information</button>
            <button class="button" name="Members" onClick={this.handleViewChange}>Members</button>
            <button class="button" name="Pictures" onClick={this.handleViewChange}>Pictures</button>
            {isGroupMember() && <button class="button" name="Events" onClick={this.handleViewChange}>Events</button> }
            {isGroupMember() && <button class="button" name="Chats" onClick={this.handleViewChange}>Chat</button> }
          </div>

          <div className="buttons is-right column">
            { isAuthenticated() && <Link to={`/groups/${group._id}/join`}><a className="button is-primary"><strong>Join the Group!</strong></a></Link>}
            { isAdmin() && <Link to={`/groups/${group._id}/edit`}><a className="button is-light">Edit</a></Link>}
          </div>
        </div>

        {/* <GroupShowBody  key={group._id} { ...group } isGroupMember={ this.isGroupMember } isAdmin={ this.isAdmin } /> */}


        <div class={`${this.state.displayController.Information ? "Information" : "is-hidden" }`} >
          <section class="section">
            <div class="container">
              <h1 class="title"><strong>{group.name}</strong></h1>
              <p class="title">Description</p>
              <div class="content">{group.description}</div>
            </div>
          </section>
        </div>

        <div class={`${this.state.displayController.Members ? "Members" : "is-hidden" }`}>
          {group.members.flatMap( member => (
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
                      <Link to={`/hikes/${member.favoriteHikes[0]._id}`}>
                       <i class="fas fa-heart" aria-hidden="true"></i></Link>
                    </span>
                  </a>
                </div>
              </nav>

             </div>
           </article>
          ))}
         
        </div>




        { this.isGroupMember && <div class="column is-full"><button class="button is-small is-right" onClick={this.handleUnsubscribe}>Unsubscribe</button></div>}
      </div>
    )
  }
}

export default GroupShow