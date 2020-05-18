import React from 'react'
import MapGL, { Popup, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Link } from 'react-router-dom'

class HikeMap extends React.Component {
  state = {
    viewport: {
      latitude: 50,
      longitude: 7,
      zoom: 4,
      bearing: 0,
      pitch: 0
    }
  }

  // handleShowPopup = event => {
  //   console.log(event.target.className)
  // }

  render() {
    const hikes = this.props.hikes
    return (
      <div className="HikeMap box">
        <MapGL
          {...this.state.viewport}
          width="95vw"
          height="95vh"
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          scrollZoom={false}
        >
          {hikes.map(hike => {
            return (
              <>
                <Popup
                  latitude={hike.lat}
                  longitude={hike.lon}
                  key={`${hike._id}${hike.name}`}
                  >
                  <Link to={`/hikes/${hike._id}`}>
                    <p>{hike.name}</p> 
                    <p>{hike.country}</p>
                    <img className="map-image" src={hike.images[0]} alt={hike.name} />
                  </Link>

                </Popup>
              </>
            )
          })}
          <NavigationControl showZoom position='top-left' className="map-controls"/>
        </MapGL>
      </div>

    )
  }
}

export default HikeMap