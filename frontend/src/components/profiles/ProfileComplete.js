import React from 'react'
import { isOwner, getUserId } from '../../lib/auth'

const ProfileComplete = (props) => {
  const userId = getUserId()
  const { edit } = props
  return (
    <div className="column is-full fav-comp">
      <div className="columns">
        <img className="column is-three-fifths" src={props.hike.images[0]} alt="hikeImage" />
        <p className="column">{props.hike.name}</p>
      </div>
      {edit && <button
        className="button remove"
        onClick={props.handleClick}
        value={props._id}
      >Remove</button>}

    </div>
  )
}

export default ProfileComplete