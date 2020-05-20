import React from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import Moment from 'react-moment'
import 'moment-timezone'
import Popup from "reactjs-popup"
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId, getToken } from '../../lib/auth'
import GroupImgNew from './GroupImgNew'


class GroupShow extends React.Component {
  state = {
    group: '',
    display: {
      Information : true,
      Members: false,
      Pictures: false,
      Events: false,
      Chat: false
    },
    displayReplyForm: false,
    replyStatus: false,
  
    date: new Date(),
  
    member: false,
    admin: false,
    eventToParticipate: [],

    formData: {
      text: '',
      user:'',
      to: ''
    }
  }

  // fetch and status auth
  async componentDidMount() {
    try {
      const groupId = this.props.match.params.id
      const res = await axios.get(`/api/groups/${groupId}`)
     
      const userId = getUserId()
      let member
      if (res.data.members) member = res.data.members.some( member => member.user._id === userId ) ? true : false
      let admin
      if (res.data.createdMember) admin = res.data.createdMember._id === userId ? true : false
      
      this.setState({ group : res.data, member, admin })
    } catch (err) {
      console.log(err)
    }
  }

  // join the group
  handleJoinGroup = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      await axios.post(`/api/groups/${groupId}/members`, userId, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })

      const user = await axios.get(`/api/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      const group = await axios.get(`/api/groups/${groupId}`)
      this.setState({ group: group.data, member: true })

      window.alert(`Welcome ${user.data.username.toUpperCase()}!`)
    } catch (err) {
      console.log(err.response)
    }
  }
  // unsubs from group
  handleUnsubscribe = async () => {
    try {
      const groupId = this.props.match.params.id
      let group = await axios.get(`/api/groups/${groupId}`)

      const userId = getUserId()
      const memberToRemove = group.data.members.find( member => member.user._id === userId)
    
      const conf = window.confirm('Are you sure you want to unsubscribe?')
      if (conf && memberToRemove) await axios.delete(`/api/groups/${groupId}/members/${memberToRemove._id}`,{
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      group = await axios.get(`/api/groups/${groupId}`)
      this.setState({ group: group.data, admin: false, member: false })
    } catch (err) {
      console.log(err)
    }
  }

  // control views
  handleViewChange = event => {
    event.preventDefault()
    const display = { ...this.state.display }
    display[ Object.keys(display)[Object.values(display).indexOf(true)] ] = false
    display[event.target.name] = true
    this.setState({ display })
  }

  // send email
  triggerOutlook = () => {
    const body = escape(window.document.title + String.fromCharCode(13)+ window.location.href)     
    const subject = "Take a look at this group from Hikr.com!"
    window.location.href = "mailto:?body="+body+"&subject="+subject          
  }

  //event - calendar, delete event
  controlCalendar = date => this.setState({ date })
  handleEventDelete = async e => {
    e.preventDefault()
    try {
    const groupId = this.props.match.params.id
    const eventId = e.target.value
    await axios.delete(`/api/groups/${groupId}/events/${eventId}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
    const conf = window.confirm('Are you sure you want to delete the event?')
    const group = await axios.get(`/api/groups/${groupId}`)
    if (conf) this.setState({ group: group.data })
    console.log(group)
    } catch (err) {
      console.log(err)
    }
  }


  // userAddedImages
  handleUploadPhoto = async event => {
    try {
      const groupId = this.props.match.params.id
      await axios.post(`/api/groups/${groupId}/user-images`, {
          images: event.target.value,
          user: getUserId()
        },{
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      const group = await axios.get(`/api/groups/${groupId}`)
      this.setState({ group: group.data })
      console.log(group)
    } catch (err) {
      console.log(err)
    }
  }
  handleDeletePhoto = async event => {
    try {
      const groupId = this.props.match.params.id
      const userAddedImageId = event.target.value
      await axios.delete(`/api/groups/${groupId}/user-images/${userAddedImageId}`, {
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      const group = await axios.get(`/api/groups/${groupId}`)
      this.setState({ group: group.data })
    } catch (err) {
      console.log(err)
    }
  }
  
  handleMessageChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }
  handleMessageSubmit = async event => {
    try {
      const groupId = this.props.match.params.id
      await axios.post(`/api/groups/${groupId}/messages`, {
        text: this.state.formData.text,
        user: getUserId()
      }, {
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      
      const group = await axios.get(`/api/groups/${groupId}`)
      this.setState({ group: group.data })
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    const group = this.state.group
    const admin = group.createdMember ? { ...group.createdMember } : ''
    
    let members
    if (group.members) {
      members = group.members.map( member => (
        <article class="media" key={member.user._id}>
          <div class="media-left">
            <figure class="image is-64x64">
              <img src={member.user.profileImage} alt={member.user.username} />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
              <strong>{member.user.username.replace(member.user.username.charAt(0), member.user.username.charAt(0).toUpperCase())}&nbsp;</strong><small>{member.user.email}</small>
                <br />
                {member.user.bio}
              </p>
            </div>

            <nav class="level is-mobile">
              <div class="level-left">

                <a class="level-item" aria-label="1.profile">
                  <span class="icon is-small">
                    <Link to={`/profiles/${member.user._id}`}><i class="fas fa-address-card"></i></Link>
                  </span>
                </a>

                <a class="level-item" aria-label="2.reply">
                  <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>

                  <a class="level-item" aria-label="3.favHike">
                    <span class="icon is-small">
                    { member.user.favoriteHikes ? 
                      <Link to={`/hikes/${member.user.favoriteHikes[0]._id}`}><i class="fas fa-heart" aria-hidden="true"></i></Link>
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
      pictures = group.userAddedImages.map( (img, index) => (
        <div class="column is-4" key={index}>
          <figure className="image"><img src={img.images} alt={group.name} style={{height: 250}}/></figure>
          { (img.user._id === getUserId() ) && <button value={img._id} onClick={this.handleDeletePhoto}>x</button> }
        </div>
      ))
    }

    let events
    if (group.events) {
      events = group.events.map( item => {
        const hikeName = () => item.hike ? item.hike.name : ''
        const hikePage = () => item.hike ? item.hike._id : ''
        const numPar = (item) => item.participants.length
        const userId = getUserId()
        const eventId = item._id
        const handleJoinEvent = async () => {
          try {
            const groupId = this.props.match.params.id
            const userToAdd = await axios.get(`/api/profiles/${userId}`, {
              headers: { Authorization: `Bearer ${getToken()}`}
            })
            await axios.put(`/api/groups/${groupId}/events/${eventId}/participants`, {
              user: userToAdd.data
            }, {
              headers: { Authorization: `Bearer ${getToken()}`}
            })
            window.alert(`Thanks ${userToAdd.data.username} for joining!`)
            numPar(item)
            const eventToParticipate = [ ...this.state.eventToParticipate, eventId]

            const group = await axios.get(`/api/groups/${groupId}`)
            this.setState({ group: group.data, eventToParticipate })
          } catch (err) {
            console.log(err)
          }
        }
        const handleCancelEvent = async () => {
          try {
            const groupId = this.props.match.params.id
            // let parId
            // if (item.participants) parId = item.participants.find( par => par.user._id === userId)
            // console.log({parId})
            let group = await axios.get(`/api/groups/${groupId}`)
            const parId = item.participants.find( par => par.user._id === userId)
            const parToRemove = await axios.get(`/api/profiles/${userId}`, {
              headers: { Authorization: `Bearer ${getToken()}`}
            })
            await axios.delete(`/api/groups/${groupId}/events/${eventId}/participants/${parId}`, {
              headers: { Authorization: `Bearer ${getToken()}`}
            })
            window.confirm(`${parToRemove.data.username}, are you sure you want to cancel the event?`)
            numPar(item)
            const eventToParticipate = [ ...this.state.eventToParticipate ]
            eventToParticipate.splice( eventToParticipate.indexOf(eventId), 1)

            group = await axios.get(`/api/groups/${groupId}`)
            this.setState({ group: group.data, eventToParticipate })
          } catch (err) {
            console.log(err.response)
          }
        }

        let participants
        if (group.participants) {
          participants = item.participants.map( par => {
            return (
              <div class="column" key={par._id}>
                <figure class="image is-128x128">
                  <img class="is-rounded" src={par.user.profileImage} />
                </figure>
              </div>
          )})
        }
        return (
          <section class="section box" key={item._id}>
            <div class="container">
              { item.createdMember._id === getUserId() && 
              <div class="buttons is-right">
                <Link to={`/groups/${group._id}/events/${item._id}/edit`} {...item}><button class="button is-small">Edit event</button></Link>
                <button class="button is-small" value={item._id} onClick={this.handleEventDelete}>Delete</button>
              </div>
              }
              <h1 class="subtitle"><strong>{item.eventName}</strong></h1>
              
              <p>Course:&nbsp;{hikeName()} &nbsp;<Link to={`/hikes/${hikePage()}`}><i class="fas fa-flag"></i></Link></p>
              <p style={{fontSize: 12}}>&nbsp;&nbsp;&nbsp;<i class="fas fa-hiking"></i>&nbsp;{item.hike.difficulty}</p>
              <p style={{fontSize: 12}}>&nbsp;&nbsp;&nbsp;<i class="fas fa-globe"></i>&nbsp;{item.hike.country}</p>

                <br />
              <p style={{fontSize: 12}}> ~&nbsp;{item.description} ~</p>
                <hr />
              <p>Event Host:&nbsp;<strong>{item.createdMember.username.replace(item.createdMember.username[0], item.createdMember.username[0].toUpperCase())}</strong></p>
              <Link to={`/profiles/${item.createdMember._id}`}><figure class="image is-rounded is-64x64"><img class="is-rounded" src={item.createdMember.profileImage} alt={item.createdMember.username} /></figure></Link>
                <br />
              { numPar(item) > 1 ? <p style={{fontSize: 15}}>{`${numPar(item)} members will participate`}</p> : <p style={{fontSize: 15}}>Be the first participant!</p>}

              { numPar(item) > 1 ? <div class="columns"> { participants } </div> : '' }
              
              <div class="buttons is-right">
                { this.state.eventToParticipate.includes(item._id) &&
                  <button class="button is-danger" value={eventId} onClick={handleJoinEvent}><strong>Join</strong></button>
                }
                { !this.state.eventToParticipate.includes(item._id) &&
                  <button class="button is-small" value={eventId} onClick={handleCancelEvent}>Cancel</button>
                }
              </div>
            </div>
          </section>
        )
      })
    }

    let chat
    if (group.messages) {
      chat = group.messages.map( msg => {
        const groupId = this.props.match.params.id
        const messageId = msg._id
        let likedArray = msg.likes
        const handleMessageDelete = async () => {
          await axios.delete(`/api/groups/${groupId}/messages/${messageId}`, {
            headers: { Authorization: `Bearer ${getToken()}`}
          })
          const group = await axios.get(`/api/groups/${groupId}`)
          this.setState({ group: group.data })
        }
        const handleLikes = async () => {
          try {
            const userId = getUserId()
            if ( likedArray.length > 0 && likedArray.find( like => like.user._id === userId)) window.alert('You have already liked the comment')

            const resUser = await axios.get(`/api/profiles/${userId}`, {
              headers: { Authorization: `Bearer ${getToken()}`}
            })
            await axios.put(`/api/groups/${groupId}/messages/${messageId}/likes`, resUser.data, {
              headers: { Authorization: `Bearer ${getToken()}`}
            })
            const group = await axios.get(`/api/groups/${groupId}`)
            this.setState({ group: group.data })
          } catch (err) {
            console.log(err.response)
          }  
        }
       
        const handleReplyForm = () => {
          const displayReplyForm = true
          this.setState({ displayReplyForm })
        }
        const handleReplyMessage = event => {
          const formData = { ...this.state.formData, [event.target.name]: event.target.value, to: msg._id }
          console.log(formData)
          this.setState({ formData })
        }
  
        const handleReplySubmit = async event => {
          event.preventDefault()
          try {
            await axios.post(`/api/groups/${groupId}/messages`, this.state.formData, {
            headers: { Authorization: `Bearer ${getToken()}`}
            })
            const group = axios.get(`/api/groups/${groupId}`)
            this.setState({ group: group.data, replayStaus: true, displayReplyForm: false })
          } catch (err) {
            console.log(err)
          }
        }

        return (
          <div class="Chat" key={msg._id}>
            { getUserId() === msg.user._id && <div class="buttons is-right"><button class="button is-small" onClick={handleMessageDelete}>x</button></div> }
            <article class="media">
            
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src={msg.user.profileImage} alt={msg.user.username} />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{msg.user.username.replace(msg.user.username[0], msg.user.username[0].toUpperCase())}</strong>
                    <br />
                    {msg.text}
                    <br />
                    { likedArray.length >= 1 && <small><p>{likedArray.length}&nbsp;members liked this comment ❤︎</p></small> }

                    { msg.user._id !== getUserId() && 
                      <small>
                        <a onClick={handleLikes}>Like</a> · 
                        {/* <PopupReply /> */}
                        <a onClick={handleReplyForm}> Reply</a> · Posted <Moment fromNow ago>{msg.createdAt}</Moment> ago
                      </small> 
                    }
                     { msg.user._id === getUserId() &&<small>Posted <Moment fromNow ago>{msg.createdAt}</Moment> ago</small> }
                  </p>
                </div>


                <article class={this.state.displayReplyForm === true ? "Reply media" : "Reply media is-hidden"}>
                  <div class="media-content">
                    <div class="field">
                      <p class="control">
                        <textarea 
                            class="textarea" 
                            placeholder="Reply..." 
                            onChange={handleReplyMessage} 
                            name='text'
                            value={this.state.formData.text}
                        />
                      </p>
                    </div>
                    <div class="field">
                      <p class="control">
                        <button 
                          class="button is-small" 
                          onClick={handleReplySubmit}
                        >Reply</button>
                      </p>
                    </div>
                  </div>
                </article>

                <article class={this.state.replyStatus === true ? "media" : "media is-hidden"}>
                  <figure class="media-left">
                    <p class="image is-48x48">
                      <img src={msg.user.profileImage} alt={msg.user.username} />
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{msg.user.username.replace(msg.user.username[0], msg.user.username[0].toUpperCase())}</strong>
                        <br />
                        {msg.text}
                        <br />
                        { likedArray.length >= 1 && <small><p>{likedArray.length}&nbsp;members liked this comment ❤︎</p></small> }

                        { msg.user._id !== getUserId() && 
                          <small>
                            <a onClick={handleLikes}>Like</a> · 
                            {/* <PopupReply /> */}
                            <a onClick={handleReplyForm}> Reply</a> · Posted <Moment fromNow ago>{msg.createdAt}</Moment> ago
                          </small> 
                        }
                        { msg.user._id === getUserId() &&<small>Posted <Moment fromNow ago>{msg.createdAt}</Moment> ago</small> }
                      </p>
                    </div>
                    {/* <article class="media">
                      Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi eu lorem cursus ullamcorper sit amet nec massa.
                    </article> */}
                  </div>
                </article>
              </div>
            </article>
            <hr />
          </div>
        )
      })
    }


    return (
      <div class="GroupShow">
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <figure className="image">
                <img src={group.headerImage} alt={group.name} style={{
                  resizeMode: "cover",
                  height: 300
                }} />
              </figure>
            </div>
          </div>
        </section>

        <div class="container">
  
          <div class="columns">
            <div class="column">
              <div class="buttons is-left">
                <button class="button is-outlined" name="Information" onClick={this.handleViewChange}><i class="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Information</button>
                <button class="button is-outlined" name="Members" onClick={this.handleViewChange}><i class="fas fa-users" aria-hidden="true"></i>&nbsp;Members</button>
                <button class="button is-outlined" name="Pictures" onClick={this.handleViewChange}><i class="fas fa-image" aria-hidden="true"></i>&nbsp;Pictures</button>
                {this.state.member && <button class="button is-outlined" name="Events" onClick={this.handleViewChange}><i class="far fa-calendar-check" aria-hidden="true"></i>&nbsp;Events</button> }
                {this.state.member && <button class="button is-outlined" name="Chat" onClick={this.handleViewChange}><i class="fas fa-comments"></i>&nbsp;Chat</button> }
              </div>
            </div>
            <div class="column">
              <div class="buttons is-right">
                { this.state.member && <Link to={`/groups/${group._id}/events`}><button class="button is-info" onClick={this.handleCreateEvent}><strong>Create Event</strong></button></Link>}
                { this.state.member && <a class="button is-danger" onClick={this.triggerOutlook}><strong>Recommend to Your Friend</strong></a>}
                { this.state.admin && <Link to={`/groups/${group._id}/edit`}><a class="button is-light">Edit</a></Link>}
                { !this.state.member && <a class="button is-danger" onClick={this.handleJoinGroup}><strong>Join the Group!</strong></a>}
              </div>
            </div>
          </div>


          <div class={`${this.state.display.Information ? "Information" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section">
              <div class="container">
                <h1 class="title"><strong>Welcome to {group.name}! </strong></h1>
                <p class="subtitle">Description</p>
                <div class="content">{group.description}</div>
                <br />
                <p class="subtitle">Group Admin</p>
                <div className="column is-full">
                  <div className="column is-full">
                    <div className="box">
                      <article className="media">
                        <div className="media-left">
                          <figure className="image is-64x64"><img src= {admin.profileImage} alt={admin.username} /></figure>
                        </div>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>{admin.username}&nbsp;</strong><small>{admin.email}</small>
                              <br />
                              {admin.bio}
                            </p>
                            <Link to={`/profiles/${admin._id}`}><i className="fas fa-address-card"></i></Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class={`${this.state.display.Members ? "Members" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section" >
                <div class="container">
                  <h1 class="subtitle">Group Members</h1>
                  { members }
                </div>
            </section>
          </div>

          <div class={`${this.state.display.Pictures ? "Pictures" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section">
              <div class="container">
                <h1 class="subtitle">Group Pictures</h1>
                <div class="columns is-multiline">
                  { pictures }
                </div>
                { this.state.member && 
                  <GroupImgNew
                    onChange={this.handleUploadPhoto}
                    name="images"
                  />
                }
              </div>
            </section>
          </div>
        
          <div class={`${this.state.display.Events ? "Events" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section" >
              <div class="container">
                <h1 class="subtitle">Events</h1>

                <nav class="panel is-4">
                  <p class="panel-heading">Calendar Search</p>
                  <div class="panel-block">
                    <p class="control columns is-fullwidth is-multiline" style={{minHeight: 150}}>
                      <div class="column">
                        <label class="column is-2">From</label>
                        <input class="input column is-5" type="date" placeholder="From" />
                      </div>
                      <div class="column">
                      <label class="column is-2">To</label>
                      <input class="input column is-5" type="date" placeholder="To" />
                      </div>
                    </p>
                  </div>
                  
                  <Calendar
                      onChange={this.controlCalendar}
                      value={this.state.date} />
                  <div class="panel-block">
                    <button class="button is-link is-outlined is-fullwidth">Reset all filter</button>
                  </div>
                </nav>
                { events }
              </div>
            </section>
          </div>

          <div class={`${this.state.display.Chat ? "Chat" : "is-hidden" }`} style={{minHeight: 500}}>
            <section class="section" >
              <div class="container">
                <h1 class="subtitle">Chat Board</h1>
                { chat }
                <article class="media">
                  <div class="media-content">
                    <div class="field">
                      <p class="control">
                        <textarea 
                          class="textarea" 
                          placeholder="Add a comment..." 
                          onChange={this.handleMessageChange} 
                          name='text'
                          value={this.state.formData.text}
                        />
                      </p>
                    </div>
                    <div class="field">
                      <p class="control">
                        <button class="button" onClick={this.handleMessageSubmit}>Post comment</button>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>
    

          { this.state.member && <div class="buttons is-right"><button class="button is-small" onClick={this.handleUnsubscribe}>Unsubscribe</button></div>}
        </div>
      </div>
    )
  }
}

export default GroupShow