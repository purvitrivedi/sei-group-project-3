import React from 'react'

import { Link } from 'react-router-dom'

const HikeCard = ({ name, description, difficulty, country, timeToComplete, seasons, images, _id }) => {
  return (

    <Link to={`/hikes/${_id}`}>
      <div className="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src={images[0]} alt={name} />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{name}, {country}</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris.
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HikeCard