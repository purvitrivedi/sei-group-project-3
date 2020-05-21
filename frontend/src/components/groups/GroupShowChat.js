import React from 'react'
import { getUserId } from '../../lib/auth'
import Moment from 'react-moment'
import 'moment-timezone'

const GroupShowChat = ({ group, messages, currentlyDisplayed, handleMessageChange, text, handleMessageSubmit, handleMessageDelete, handleLikes }) => {
  return(
    <section className="section" >
      <div className="container"
      style={{ 
        minHeight: 500,
        display: `${currentlyDisplayed === 'chat' ? 'block' : 'none' }` 
      }}>
        <h1 className="subtitle">Chat Board</h1>
        
        { messages.map( msg => {
          const numLikes = msg.likes.length
          const groupId = group._id

          return (
            <div className="Chat" key={msg._id}>
              { getUserId() === msg.user._id && 
                <div className="buttons is-right">
                  <button 
                    className="button is-small" 
                    onClick={() => handleMessageDelete(groupId, msg._id)}
                  >
                  x
                  </button>
                  
                </div>
              }
              <article className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={msg.user.profileImage} alt={msg.user.username} />
                  </p>
                </figure>

                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{msg.user.username.replace(msg.user.username[0], msg.user.username[0].toUpperCase())}</strong>
                      <br />
                      {msg.text}
                      <br />
                      { numLikes >= 1 && <small><p>{numLikes}&nbsp;members liked this comment ❤︎</p></small> }
                      { msg.user._id !== getUserId() && 
                        <small>
                          <a onClick={() => handleLikes(groupId, msg._id, msg.likes)}>Like</a> · 
                          {/* <a onClick={handleReplyForm}> Reply</a> ·  */}
                          Posted <Moment fromNow ago>{msg.createdAt}</Moment> ago
                        </small> 
                      }
                      { msg.user._id === getUserId() &&<small>Posted <Moment fromNow ago>{msg.createdAt}</Moment> ago</small> }
                    </p>
                  </div>
                </div>
                <hr />
              </article>
            </div>
          )})}
       
        <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea 
                  className="textarea" 
                  placeholder="Add a comment..." 
                  onChange={handleMessageChange} 
                  name='text'
                  value={text}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button" onClick={() => handleMessageSubmit(group._id, text)}>Post comment</button>
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
         
  )
}

export default GroupShowChat

// onClick={() => handleCancelEvent(item._id, participantId._id)}

// const messageId = msg._id
        //  let likedArray = msg.likes
        //  const handleMessageDelete = async () => {
        //    await axios.delete(`/api/groups/${groupId}/messages/${messageId}`, {
        //      headers: { Authorization: `Bearer ${getToken()}`}
        //    })
        //    const group = await axios.get(`/api/groups/${groupId}`)
        //    this.setState({ group: group.data })
        //  }
        //  const handleLikes = async () => {
        //    try {
        //      const userId = getUserId()
        //      if ( likedArray.length > 0 && likedArray.find( like => like.user._id === userId)) window.alert('You have already liked the comment')

        //      const resUser = await axios.get(`/api/profiles/${userId}`, {
        //        headers: { Authorization: `Bearer ${getToken()}`}
        //      })
        //      await axios.put(`/api/groups/${groupId}/messages/${messageId}/likes`, resUser.data, {
        //        headers: { Authorization: `Bearer ${getToken()}`}
        //      })
        //      const group = await axios.get(`/api/groups/${groupId}`)
        //      this.setState({ group: group.data })
        //    } catch (err) {
        //      console.log(err.response)
        //    }  
        //  }
   
        //  const handleReplyForm = () => {
        //    const displayReplyForm = true
        //    this.setState({ displayReplyForm })
        //  }
        //  const handleReplyMessage = event => {
        //    const formData = { ...this.state.formData, [event.target.name]: event.target.value, to: msg._id }
        //    console.log(formData)
        //    this.setState({ formData })
        //  }
  
        //  const handleReplySubmit = async event => {
        //    event.preventDefault()
        //    try {
        //      await axios.post(`/api/groups/${groupId}/messages`, this.state.formData, {
        //      headers: { Authorization: `Bearer ${getToken()}`}
        //      })
        //      const group = axios.get(`/api/groups/${groupId}`)
        //      this.setState({ group: group.data, replayStaus: true, displayReplyForm: false })
        //    } catch (err) {
        //      console.log(err)
        //    }
        //  }