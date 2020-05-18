import React from 'react'
import { isOwner, getUserId } from '../../lib/auth'

const ProfileComplete = (props) => {
const userId = getUserId()
  return (
    <div className="column is-full fav-comp">
      <div className="columns">
        <img className="column is-three-fifths" src={props.hike.images[0]} alt="hikeImage" />
        <div className="column columns is-multiline">
          <p className="column is-full">{props.hike.name}</p>
          {isOwner(userId) && <button
            className="button remove column is-full"
            onClick={props.handleClick}
            value={props._id}
          >Remove</button>}
        </div>

      </div>
    </div>
  )
}

export default ProfileComplete