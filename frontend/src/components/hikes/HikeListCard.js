import React from 'react'

import { Link } from 'react-router-dom'

const HikeListCard = ({ name, description, difficulty, location, timeToComplete, seasons, images, _id }) => {
  return (
    <Link to={`/hikes/${_id}`} className="box">
      <img src={images[0]} alt={name} />
      <h1>Name of Hike: {name}</h1>
      <h1>Difficulty: {difficulty}</h1>
      <h1>Description: {description}</h1>
      <h1>Country: {location.country}</h1>
      <h1>Time the hike takes: {timeToComplete}</h1>
      <h1>Suitable in the following seasons: {seasons[0]}</h1>
      <hr />
    </Link>
  )
}

export default HikeListCard