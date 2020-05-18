import React from 'react'
import { Link } from 'react-router-dom'

class GroupCard extends React.Component {
 
  render() {
    const group = this.props
    return(
      <Link to={`/groups/${group._id}`}>
        <div className="columns is-multiline box is-3">
          <div className="column is-full">
            <p><strong>{group.name}</strong></p>
          </div>
          <div className="column is-full">
            <figure className="image is-2by1"><img src={group.headerImage} alt={`pic ${group.name}`} /></figure>
          
          </div>
          <div className="column is-full">
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64"><img src= {group.createdMember.profileImage}  alt={group.createdMember.username} /></figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{group.createdMember.username.toUpperCase()}</strong> <small>{group.createdMember.email}</small>
                      <br />
                      {group.createdMember.bio}
                    </p>
                    <Link to={`/profiles/${group.createdMember._id}`}><i className="fas fa-address-card"></i></Link>
                  </div>
                </div>
              </article>
            </div>

          </div>
          <div className="column is-full">
            <i className="fas fa-users"> </i> {group.members.length} members
            <br />
            <hr />
            {group.description}
          </div>
        </div>
      </Link>
    )
  }
}

export default GroupCard