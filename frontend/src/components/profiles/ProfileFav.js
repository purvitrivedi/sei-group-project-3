import React from 'react'

const ProfileFav = (props) => {
  const { edit } = props
  return (
    <div className="column is-full fav-comp">
      <div className="columns">
        <img className="column" src={props.hike.images[0]} alt="hikeImage" />
        <p className="column">{props.hike.name}</p></div>
      {edit && <button
        className="button remove column"
        onClick={props.handleClick}
        value={props._id}
      >Remove</button>}
    </div>
  )
}

export default ProfileFav