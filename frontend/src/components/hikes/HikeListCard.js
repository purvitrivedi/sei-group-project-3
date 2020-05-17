import React from 'react'

import { Link } from 'react-router-dom'

const HikeListCard = ({ name, description, difficulty, location, timeToComplete, seasons, images, _id }) => {
  return (
    <Link to={`/hikes/${_id}`} className="box">
      <div className="column is-full HikeListCard">
        <div className="columns">
          <img src={images[0]} alt={name} className="column is-one-quarter is-mobile" />
          <div className="column columns is-multiline">
            <div className="column is-full">
              <h1 className="subtitle">{name}, {location.country}</h1>
              <h1>Difficulty: {difficulty}</h1>
              <h1>Seasons: {seasons.map(season => {
                return `${season}, `
              })}
              </h1>
              <h1>Time it takes: {timeToComplete}</h1>
            </div>
            <div className="column is-full">{description}</div>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default HikeListCard