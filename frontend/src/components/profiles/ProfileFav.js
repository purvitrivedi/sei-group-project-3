import React from 'react'
import { Link } from 'react-router-dom'

const ProfileFav = (props) => {
  const { edit } = props

  return (
        <div className="columns">
        <Link to={`/hikes/${props.hike._id}`}><img className="column is-three-fifths group-image" src={props.hike.images[0]} alt="hikeImage" /></Link>
          <div className="column">
            <div>
            <Link to={`/hikes/${props.hike._id}`}><p>{props.hike.name}</p></Link> 
            {
              edit && <button
                className="button remove column"
                onClick={props.handleClick}
                value={props._id}
                name="favorites"
              >Remove</button>
            }
            </div>
          </div>
        </div>

  )
}

export default ProfileFav