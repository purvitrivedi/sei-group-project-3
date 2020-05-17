import React from 'react'
import { Link } from 'react-router-dom'

const ProfilesList = (props) => {
  return (
    <div className="column is-full">
      <div className="columns">
        <img src={props.profileImage} className="column is-one-quarter is-mobile" />
        <div className="column columns is-multiline">
          <div className="column is-full">
            <Link to={`/profiles/${props._id}`}><div className="subtitle">{props.fullName}</div></Link>
          </div>
          <div className="column is-full">{props.bio}</div>
          {props.completedHikes.length !== 0 &&
            <div className="column"> Hikes Completed ⛰: {props.completedHikes.length}</div>}
        </div>
      </div>
    </div>
  )
}

export default ProfilesList