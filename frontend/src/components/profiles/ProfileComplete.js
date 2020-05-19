import React from 'react'
import { Link } from 'react-router-dom'

const ProfileComplete = (props) => {
  const { edit } = props
  return (
    <div className="column is-full fav-comp">
      <Link to={`/hikes/${props.hike._id}`}>
        <div className="columns">
          <img className="column is-three-fifths" src={props.hike.images[0]} alt="hikeImage" />
          <p className="column">{props.hike.name}</p>
        </div>
      </Link>
      {edit && <button
        className="button remove"
        onClick={props.handleClick}
        value={props._id}
        name="completed"
      >Remove</button>}
    </div>
  )
}

export default ProfileComplete