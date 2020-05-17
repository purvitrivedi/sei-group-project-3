import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

import GroupNavbar from './GroupNavbar'


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

  // edit/delete the group
  handleEdit = async () => {
    xxx
  }
  handleDelete = async () => {
    try {
      const groupId = this.props.match.params.id
      const confirm = window.confirm('Are you sure you want to delete this group?')
      if (confirm) await axios.delete(`/groups/${groupId}`)
      this.props.history.push('/groups')
    } catch (err) {
      console.log(err.response)
    }
  }

  // auth
  isGroupMember = () => {
    const group = this.state.group
    const userId = JSON.parse(window.atob(window.localStorage.getItem('token').split('.')[1])).sub
    if (isAuthenticated() && group.members.some( member => member.user._id === userId )) return true
    else return false
  }
  isAdmin = () => {
    const group = this.state.group
    const userId = JSON.parse(window.atob(window.localStorage.getItem('token').split('.')[1])).sub
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
        <GroupNavbar key={group._id} { ...group } isGroupMember={ this.isGroupMember } />
        <Body />
        { isGroupMember() && <div class="column is-full"><button class="button is-small is-right">Unsubscribe</button></div>}
      </div>
    )
  }
}

export default GroupShow


<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href={#}>Information</a>
      <a class="navbar-item" href={#}>Members</a>
      <a class="navbar-item" href={#}>Pictures</a>
      {isGroupMember() && <a class="navbar-item" href={#}>Events</a> }
      {isGroupMember() && <a class="navbar-item" href={#}>Chat</a> }
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          { isAuthenticated() && <a class="button is-primary"><strong>Join the Group!</strong></a>}
          { isAdmin() && <Link to={`/groups/${group._id}/edit`}><a class="button is-light">Edit</a></Link>}
        </div>
      </div>
    </div>
  </div>
</nav>


######

<section class="section" id="Information">
  <div class="container">
    <h1 class="title"><strong>{group.name}</strong></h1>
    <p class="title">Description</p>
    <div class="content">{group.description}</div>
  </div>
</section>

#####

<section class="section" id="Members">
  <div class="container">
    <div className="box">
        <article className="media">
          <div className="media-left">
            {/* <figure className="image is-64x64"><img src= {group.createdMember.profileImage}  alt={group.createdMember.username} /></figure> */}
          </div>
          <div className="media-content">
            <div className="content">
              {/* <p>
                <strong>{group.createdMember.username.toUpperCase()}</strong> <small>{group.createdMember.email}</small>
                <br />
                {group.createdMember.bio}
              </p>
              <Link to={`/profile/${group.createdMember._id}`}><i className="fas fa-address-card"></i></Link> */}
            </div>
          </div>
        </article>
      </div>
    </div>
    
    <p class="subtitle">Members</p>
    <div class="content">
      {group.members.map( member => (
        <div key={member._id}>
          <figure className="image is-64x64"><img src= {member.user.profileImage} alt={member.user.username} /></figure>
          {member.user.username}
          <Link to={`/profile/${member.user._id}`}><i className="fas fa-address-card"></i></Link>
        </div>
      ))}
    </div>
  </div>
</section>

<section class="section" id="Pictures">
  <div class="container">
    <h1 class="title">Group Pics</h1>
    <div class="columns is-multi">
      {group.userAddedImages.map( img => (
        <div class="column is-1" key={img._id}>
          <figure className="image is-square"><img src={img.images} alt={group.name} /></figure>
        </div>
      ))}
    </div>
  </div>
</section>

<section class="section" id="Events">
  <div class="container">
    <h1 class="title">Events</h1>
    <div class="columns is-multi">
      {/* {group.userAddedImages.map( img => (
        <div class="column is-1" key={img._id}>
          <figure className="image is-square"><img src={img.images} alt={group.name} /></figure>
        </div>
      ))} */}
    </div>
  </div>
</section>

<section class="section" id="Chat">
  <div class="container">
    <h1 class="title">Chat Board</h1>
    <div class="columns is-multi">
      {group.messages.map( msg => (
        <div class="column is-1" key={msg._id}>{msg.text}</div>
      ))}
    </div>
  </div>
</section>






// <div class="ShowMid tile is-ancestor">
// <div class="tile is-vertical is-8">
//   <div class="tile is-parent">
//     <article class="tile is-child notification box">
//     <h1 class="title"><strong>{group.name}</strong></h1>
//       <p class="title">Description</p>
//       <div class="content">{group.description}</div>
//     </article>
//   </div>
// </div>
<div class="tile is-parent">
  <article class="tile is-child notification box">
    <div class="content">
      <p class="title">Members</p>
      <p class="subtitle">Admin</p>
      <div class="content">
      
    </div>
  </article>
</div>
</div>

