import React from 'react'
import { Link } from 'react-router-dom'

class GroupCard extends React.Component {
 
  render() {
    const group = this.props
    return(
      <div class="columns is-multiline box is-3">
        <div class="column is-full">
          <p><strong>{group.name}</strong></p>
        </div>
        <div class="column is-full">
          <figure class="image is-2by1"><img src={group.headerImage} alt={`pic ${group.name}`} /></figure>
        </div>
        <div class="column is-full">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64"><img src= {group.createdMember.profileImage}  alt={group.createdMember.username} /></figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{group.createdMember.username}</strong> <small>{group.createdMember.email}</small>
                    <br />
                    {group.createdMember.bio}
                  </p>
                  <Link to={`/profile/${group.createdMember._id}`}><i class="fas fa-address-card"></i></Link>
                </div>
              </div>
            </article>
          </div>

        </div>
        <div class="column is-full">
          <i class="fas fa-users"> </i> Members: {group.members.length}
          <br />
          <hr />
          {group.description}
        </div>
      </div>
    )
  }
}

export default GroupCard