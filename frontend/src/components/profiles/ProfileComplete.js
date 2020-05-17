import React from 'react'
// import {isOwner} from '../../lib/auth'

const ProfileComplete = (props) => {
  return (
    <div className="column is-full completed">
      <div className="columns">
        <img className="column" src={props.hike.images[0]} />
      <p className="column">{props.hike.name}</p></div> 
    </div>
  )
}

export default ProfileComplete