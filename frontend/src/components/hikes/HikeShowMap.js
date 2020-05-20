import React from 'react'
import MapGL, { Popup, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

class HikeMap extends React.Component {

  render() {
    const hike = this.props.hike
    return (
      <div className="hike-show-map">
        <MapGL
          width="100%"
          height="50vh"
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          latitude={hike.lat}
          longitude={hike.lon}
          zoom={11}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >

          <div className="">
            <Popup
            latitude={hike.lat}
            longitude={hike.lon}
            closeButton={false}
            >
              <h1 className="popup-text">{hike.name}, {hike.country}📍</h1>
            </Popup>
          </div>

        </MapGL>
      </div>
    )
  }
}

export default HikeMap