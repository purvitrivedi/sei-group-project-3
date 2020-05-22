import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = ({ key, group, members} ) => {

  return (
    <Link to={`/groups/${group._id}`} className="box" key={key}>
      <div className="column is-full">

        <div className="columns">
          <img src={group.headerImage} alt={`pic ${group.name}`} className="column group-header-image" />
          <div className="column columns is-multiline">
            <div className="column is-full columns is-multiline">
              <h1 className="subtitle column is-full group-title">{group.name}</h1>
              { members.length > 1 &&
                <p className="column is-full"><i className="fas fa-users"></i>
                &nbsp;{members.length} hikrs</p> 
              }
              <Link to={`/profiles/${group.createdMember._id}`}>
                <figure className="column">
                  <img src={group.createdMember.profileImage} alt={group.createdMember.username} className="group-list-image" />
                  <div>
                    <p>
                      <strong>Created by</strong>: @{group.createdMember.username} </p>
                    <Link to={`/profiles/${group.createdMember._id}`}><p className="group-profile-link">See profile</p></Link>
                  </div>

                </figure>
              </Link>
              <p className="column is-full">{group.description}</p>
            </div>
          </div>
        </div>


        {/* <div className="column is-full">
          <div className="column is-full">
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64"><img src={group.createdMember.profileImage} alt={group.createdMember.username} /></figure>
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

        </div> */}
      </div>
    </Link>
  )
}

export default GroupCard