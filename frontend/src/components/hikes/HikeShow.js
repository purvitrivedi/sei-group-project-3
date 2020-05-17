import React from 'react'
import axios from 'axios'

import { getSingleHike } from '../../lib/api'
import { isAuthenticated, getUserId, getToken } from '../../lib/auth'



class HikeShow extends React.Component {
  state = {
    hike: null
  }

  async componentDidMount() {
    try {
      const hikeId = this.props.match.params.id
      const res = await getSingleHike(hikeId)
      this.setState({ hike: res.data })
    } catch (err) {
      console.log(err)
    }
  }


  handleAddToFavorites = async() => {
    try {
    console.log(getUserId())
    const userId = getUserId()
    const hikeId = { hike: this.props.match.params.id}

    const withHeaders = () => {
      return {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    }

    const res = await axios.post(`/api/profiles/${userId}/favorites`, hikeId, withHeaders())
    console.log(res.data)
  } catch(err) {
    console.log(err)
  }

  }


  render() {
    if (!this.state.hike) return null


    const { hike } = this.state
    return (

      <div className="HikeShow">
        <div className="hero is-medium is-success is-bold">
          <div className="hero-body">
            <h1>Hero image goes here!</h1>
          </div>
        </div>
        <div className="box">
          <img src={hike.images[0]} alt={hike.name} />
          <h1>Name of Hike: {hike.name}</h1>
          <h1>Difficulty: {hike.difficulty}</h1>
          <h1>Description: {hike.description}</h1>
          <h1>Country: {hike.location.country}</h1>
          <h1>Time the hike takes: {hike.timeToComplete}</h1>
          <h1>Suitable in the following seasons: {hike.seasons[0]}</h1>
          <hr />
          {isAuthenticated() &&
            <button
              className="button is-success"
              onClick={this.handleAddToFavorites}
            >Add Hike to Favorites</button>}
        </div>
      </div>
    )
  }
}

export default HikeShow


//* /api/profiles/userId/favorites
// * { hike: id}