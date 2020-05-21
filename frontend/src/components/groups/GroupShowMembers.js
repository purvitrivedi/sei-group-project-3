import React from 'react'
import { Link } from 'react-router-dom'

const GroupShowMembers = ({group, currentlyDisplayed}) => {
  return (
    <section class="section" >
      <div class="container"
      style={{ 
        minHeight: 500,
        display: `${currentlyDisplayed === 'members' ? 'block' : 'none' }` 
      }}>
      <h1 class="subtitle">Group Members</h1>
      {group.members.map(member => {
        return (
          <article className="media" key={member.user._id}>
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={member.user.profileImage} alt={member.user.username} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                <strong>{member.user.username.replace(member.user.username.charAt(0), member.user.username.charAt(0).toUpperCase())}&nbsp;</strong><small>{member.user.email}</small>
                  <br />
                  {member.user.bio}
                </p>
              </div>

              <nav className="level is-mobile">
                <div className="level-left">

                  <Link to={`/profiles/${member.user._id}`} className="level-item" aria-label="1.profile">
                    <span className="icon is-small">
                      <i className="fas fa-address-card"></i>
                    </span>
                  </Link>

                  <a className="level-item" aria-label="2.reply">
                    <span className="icon is-small">
                      <i className="fas fa-reply" aria-hidden="true"></i>
                    </span>
                  </a>

                  <a className="level-item" aria-label="3.favHike">
                    <span className="icon is-small">
                      { member.user.favoriteHikes ? 
                        <Link to={`/hikes/${member.user.favoriteHikes[0]._id}`}>
                          <i className="fas fa-heart" aria-hidden="true"></i>
                        </Link>
                        : 
                        ''
                      }
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        )})}
      </div>
    </section>
  )
}

export default GroupShowMembers