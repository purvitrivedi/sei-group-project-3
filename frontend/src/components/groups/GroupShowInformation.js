import React from 'react'
import { Link } from 'react-router-dom'

const GroupShowInformation = ({ currentlyDisplayed, group }) => {
  return (
    <div className="container">
      <div className="Information" 
          style={{ 
            display: `${currentlyDisplayed === 'information' ? 'block' : 'none' }` 
          }}
      >
        <section className="section">
          <div className="container" style={{ minHeight: 500}}>
            <h1 className="title"><strong>Welcome to {group.name}! </strong></h1>
            <p className="subtitle">Description</p>
            <div className="content">{group.description}</div>
            <br />
            <p className="subtitle">Group Admin</p>
            <div className="column is-full">
              <div className="column is-full">
                <div className="box">
                  <article className="media">
                    <div className="media-left">
                      <figure className="image is-64x64"><img src= {group.createdMember.profileImage} alt={group.createdMember.username} /></figure>
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong>{group.createdMember.username}&nbsp;</strong><small>{group.createdMember.email}</small>
                          <br />
                          {group.createdMember.bio}
                        </p>
                        <Link to={`/profiles/${group.createdMember._id}`}><i className="fas fa-address-card"></i></Link>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )

}

export default GroupShowInformation 