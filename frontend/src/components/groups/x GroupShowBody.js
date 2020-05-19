import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isAuthenticated, getUserId } from '../../lib/auth'

class GroupShowBody extends React.Component {
  state = {

  }

  //! edit/delete the group to edit page
  handleDelete = async () => {
    try {
      const groupId = this.props.match.params.id
      const confirm = window.confirm('Are you sure you want to delete this group?')
      if (confirm) await axios.delete(`/api/groups/${groupId}`)
      this.props.history.push('/groups')
    } catch (err) {
      console.log(err.response)
    }
  }


  render(props) {
    console.log(this.props)
    const group = this.props
    return (
      'hey'
      // <>
      //   <div class="Information">
      //     <section class="section">
      //       <div class="container">
      //         <h1 class="title"><strong>{group.name}</strong></h1>
      //         <p class="title">Description</p>
      //         <div class="content">{group.description}</div>
      //       </div>
      //     </section>
      //   </div>

      //   // same format for admin and members?
      //   <div class="Members">
      //     <section class="section">
      //       <div class="container">

      //         <div className="Admin box">
      //           <article className="media">
      //             <div className="media-left">
      //               <figure className="image is-64x64"><img src= {group.createdMember.profileImage}  alt={group.createdMember.username} /></figure> *
      //             </div>
      //             <div className="media-content">
      //               <div className="content">
      //                 <p>
      //                   <strong>{group.createdMember.username.toUpperCase()}</strong> <small>{group.createdMember.email}</small>
      //                   <br />
      //                   {group.createdMember.bio}
      //                 </p>
      //                 <Link to={`/profile/${group.createdMember._id}`}><i className="fas fa-address-card"></i></Link>
      //               </div>
      //             </div>
      //           </article>
      //         </div>

      //         <p class="subtitle">Members</p>
      //         <div class="content">
      //           {group.members.map( member => (
      //             <div key={member._id}>
      //               <figure className="image is-64x64"><img src= {member.user.profileImage} alt={member.user.username} /></figure>
      //               {member.user.username}
      //               <Link to={`/profile/${member.user._id}`}><i className="fas fa-address-card"></i></Link>
      //             </div>
      //           ))}
      //         </div>
            
      //       </div>
      //     </section>
      //   </div>

      //   <div class="Pictures">
      //     <section class="section">
      //       <div class="container">
      //         <h1 class="title">Group Pics</h1>
      //         <div class="columns is-multi">
      //           {group.userAddedImages.map( img => (
      //             <div class="column is-1" key={img._id}>
      //               <figure className="image is-square"><img src={img.images} alt={group.name} /></figure>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     </section>
      //   </div>

      //   <div class="Events">
      //     <section class="section">
      //       <div class="container">
      //         <h1 class="title">Events</h1>
      //         <div class="columns is-multi">
      //           {group.userAddedImages.map( img => (
      //             <div class="column is-1" key={img._id}>
      //               <figure className="image is-square"><img src={img.images} alt={group.name} /></figure>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     </section>
      //   </div>

      //   <div class="Chat">
      //     <section class="section">
      //       <div class="container">
      //         <h1 class="title">Chat Board</h1>
      //         <div class="columns is-multi">
      //           {group.messages.map( msg => (
      //             <div class="column is-1" key={msg._id}>{msg.text}</div>
      //           ))}
      //         </div>
      //       </div>
      //     </section>
      //   </div>
      //   </>
    )
  }
}

export default GroupShowBody