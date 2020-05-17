import React from 'react'
import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const HikeMap = ({ hikes }) => {
  console.log(hikes)

  return (
    <MapGL
      mapboxApiAccessToken='pk.eyJ1IjoiYW5keThyYWRzaGF3IiwiYSI6ImNrYTU1ZnpoaDA2OXgzbW9kc3pqa3FrMXAifQ.v5LMEUumd8V04cvx7ed5ug'
      height={'100vh'}
      width={'100vw'}
      mapStyle='mapbox://styles/mapbox/outdoors-v11'
      latitude={50.00}
      longitude={7}
      zoom={3}>
        {hikes.map(hike => {
          return (
            <Marker
            latitude={hike.location.lat}
            longitude={hike.location.lon}
            key={hike._id}
            >
              <span className="map-pin" role="img" aria-label="marker">🔻</span>
            </Marker>
          )
        })}
    </MapGL>
  )
}

export default HikeMap