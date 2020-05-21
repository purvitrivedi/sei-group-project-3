import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId, getToken } from '../../lib/auth'
import GroupShowInformation from './GroupShowInformation'
import GroupShowMembers from './GroupShowMembers'
import GroupShowPictures from './GroupShowPictures'
import GroupShowEvents from './GroupShowEvents'
import GroupShowChat from './GroupShowChat'
import { getSingleGroup, joinGroup, leaveGroup, deleteEvent, deletePic, uploadPic, joinEvent, leaveEvent, sendMsg} from '../../lib/api'

class GroupShow extends React.Component {
  state = {
    group: null,
    currentlyDisplayed: 'information',
    member: false,
    admin: false,
    displayReplyForm: false,
    replyStatus: false,
    formData: {
      text: '',
      user:'',
      to: ''
    }
  }

  // fetch
  getData = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      const res = await getSingleGroup(groupId)

      this.setState({ 
        group: res.data,
        member: res.data.members.some(member => member.user._id === userId), 
        admin: res.data.createdMember._id === userId
      })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }


  // join the group
  handleJoinGroup = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      await joinGroup(groupId, userId)
      this.getData()
    } catch (err) {
      console.log(err.response)
    }
  }

  // leave the group
  handleUnsubscribe = async () => {
    try {
      const groupId = this.props.match.params.id
      const userId = getUserId()
      const memberToRemove = this.state.group.members.find(member => member.user._id === userId)
      if (!memberToRemove) return

      await leaveGroup(groupId, memberToRemove._id)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }


  // control views
  handleViewChange = event => {
    this.setState({ currentlyDisplayed: event.target.name })
  }

  // send email
  triggerOutlook = () => {
    const body = escape(window.document.title + String.fromCharCode(13)+ window.location.href)     
    const subject = "Take a look at this group from Hikr.com!"
    window.location.href = "mailto:?body="+body+"&subject="+subject          
  }


  //events
  handleEventDelete = async e => {
    e.preventDefault()
    try {
      const groupId = this.props.match.params.id
      const eventId = e.target.value
      await deleteEvent(groupId, eventId)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleJoinEvent = async e => {
    try {
      const groupId = this.props.match.params.id
      const eventId = e.target.value
      await joinEvent(groupId, eventId)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleCancelEvent = async (eventId, parId) => {
    try {
      const groupId = this.props.match.params.id
      await leaveEvent(groupId, eventId, parId)
      this.getData()
    } catch (err) {
      console.log(err.response)
    }
  }


  // userAddedImages
  handleUploadPhoto = async event => {
    try {
      const groupId = this.props.match.params.id
      await uploadPic(groupId, { images: event.target.value, user: getUserId() })
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeletePhoto = async event => {
    try {
      const groupId = this.props.match.params.id
      const imageId = event.target.value
      await deletePic(groupId, imageId)
      this.getData()
    } catch (err) {
      console.log(err)
    }
  }
  
  
  // messages
  handleMessageChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleMessageSubmit = async () => {
    try {
      const groupId = this.props.match.params.id
      await axios.post(`/api/groups/${groupId}/messages`, {
        text: this.state.formData.text,
        user: getUserId()
      }, {
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      this.getData()
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  handleMessageDelete = async (groupId, messageId) => {
    try {
      await axios.delete(`/api/groups/${groupId}/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      this.getData()
    } catch (err) {
      console.log(err.response)
    }
  }

  handleLikes = async (groupId, messageId, likes) => {
    try {
      const userId = getUserId()
      if ( likes.length > 0 && likes.find( like => like.user._id === userId)) window.alert('You have already liked the comment')

      const resUser = await axios.get(`/api/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      await axios.put(`/api/groups/${groupId}/messages/${messageId}/likes`, resUser.data, {
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      this.getData()
    } catch (err) {
      console.log(err.response)
    }  
  }

  render() {
    const { group, member, admin, currentlyDisplayed, formData } = this.state
    if (!group) return null // not render until group is not null (null--render nothing, !null (second render) -render)

    return (
      <div className="GroupShow">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <figure className="image">
                <img src={group.headerImage} alt={group.name} style={{
                  resizeMode: "cover",
                  height: 300
                }} />
              </figure>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="buttons is-left">
                <button className="button is-outlined" name="information" onClick={this.handleViewChange}><i className="fas fa-info-circle" aria-hidden="true"></i>&nbsp;Information</button>
                <button className="button is-outlined" name="members" onClick={this.handleViewChange}><i className="fas fa-users" aria-hidden="true"></i>&nbsp;Members</button>
                <button className="button is-outlined" name="pictures" onClick={this.handleViewChange}><i className="fas fa-image" aria-hidden="true"></i>&nbsp;Pictures</button>
                {member && <button className="button is-outlined" name="events" onClick={this.handleViewChange}><i className="far fa-calendar-check" aria-hidden="true"></i>&nbsp;Events</button> }
                {member && <button className="button is-outlined" name="chat" onClick={this.handleViewChange}><i className="fas fa-comments"></i>&nbsp;Chat</button> }
              </div>
            </div>
            <div className="column">
              <div className="buttons is-right">
                {member && <Link to={`/groups/${group._id}/events`}><button className="button is-info" onClick={this.handleCreateEvent}><strong>Create Event</strong></button></Link>}
                {member && <a className="button is-danger" onClick={this.triggerOutlook}><strong>Recommend to Your Friend</strong></a>}
                {admin && <Link to={`/groups/${group._id}/edit`} className="button is-light">Edit</Link>}
                {!member && <a className="button is-danger" onClick={this.handleJoinGroup}><strong>Join the Group!</strong></a>}
              </div>
            </div>
          </div>
        </div>

        <GroupShowInformation  currentlyDisplayed={currentlyDisplayed} group={group} />
        <GroupShowMembers  currentlyDisplayed={currentlyDisplayed} group={group} />
        <GroupShowPictures 
          currentlyDisplayed={currentlyDisplayed}
          images={group.userAddedImages} 
          name={group.name}
          handleDeletePhoto={this.handleDeletePhoto}
          member={member}
          handleUploadPhoto={this.handleUploadPhoto}
        />
        <GroupShowEvents
          group={group}
          events={group.events}
          currentlyDisplayed={currentlyDisplayed}
          handleEventDelete={this.handleEventDelete}
          handleJoinEvent={this.handleJoinEvent}
          handleCancelEvent={this.handleCancelEvent}
         />
        <GroupShowChat
          group={group}
          messages={group.messages}
          text={formData.text}
          currentlyDisplayed={currentlyDisplayed}
          handleMessageChange={this.handleMessageChange}
          handleMessageSubmit={this.handleMessageSubmit}
          handleMessageDelete={this.handleMessageDelete}
          handleLikes={this.handleLikes}
        />

        {member && 
          <div className="buttons is-right">
            <button className="button is-small" onClick={this.handleUnsubscribe}>
              Leave Group
            </button>
          </div>
        }
      </div>
    )
  }
}
export default GroupShow
