import React from 'react'

const ProfileFav = (props) => {
  return (
    <div className="column is-full fav-comp">
      <div className="columns">
        <img className="column" src={props.hike.images[0]} alt="hikeImage" />
      <p className="column">{props.hike.name}</p></div> 
    </div>
  )
}

export default ProfileFav