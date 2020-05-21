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

  handlePopupShow = event => {
    if (event.currentTarget.className === "small-popup") {
      event.currentTarget.className = "large-popup"
    } else {
      event.currentTarget.className = "small-popup"
    }
  }

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
              <div key={`popup${hike._id}`}>
                <Popup
                  latitude={hike.lat}
                  longitude={hike.lon}
                  closeButton={false}
                >
                  <div className="small-popup" onClick={this.handlePopupShow} >
                    <h1>{hike.name}, <span role="img" aria-label="marker">📍</span></h1>
                    <h2>{hike.country} - {hike.distance}, {hike.timeToComplete}</h2>
                    <h3>{hike.description.length > 150 ? hike.description.substr(0, 150) + '...' : hike.description}</h3>
                    <div className="popup-image">
                      <img src={hike.images[0]} alt={hike.name} />
                    </div>
                    <Link to={`/hikes/${hike._id}`}>
                      <p>See more...</p>
                    </Link>
                  </div>
                </Popup>
              </div>
            )
          })}
          <NavigationControl showZoom position='top-left' className="map-controls" />
        </MapGL>
      </div>

    )
  }
}

export default HikeMap