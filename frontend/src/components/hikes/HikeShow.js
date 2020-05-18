import React from 'react'
import axios from 'axios'

import { getSingleHike, deleteHikeReview } from '../../lib/api'
import { isAuthenticated, getUserId, getToken, isOwner } from '../../lib/auth'

import HikeReviews from './HikeReviews'



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


  handleAddToFavorites = async () => {
    try {
      console.log(getUserId())
      const userId = getUserId()
      const hikeId = { hike: this.props.match.params.id }

      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }

      const res = await axios.post(`/api/profiles/${userId}/favorites`, hikeId, withHeaders())
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  handleReviewDelete = async event => {
    event.preventDefault()
    const hikeId = this.props.match.params.id
    const reviewId = event.target.id
    try {
      await deleteHikeReview(hikeId, reviewId)
      this.props.history.push(`/hikes/${hikeId}`)
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.hike) return null


    const { hike } = this.state
    return (

      <div className="HikeShow box">
        <div className="hero is-medium is-success">
          <div className="hero-body" style={{ backgroundImage: `url(${hike.images[0]})` }}>
            <h1 className="title-logo">{hike.name}, {hike.country}</h1>
          </div>
        </div>
        <div className="box">
          <section className="hike-info">
          <h1>{hike.description}</h1>

          <h1>Difficulty: {hike.difficulty.map(difficulty => {
            return `${difficulty}, `
          })}</h1>

          <h1>Seasons: {hike.seasons.map(season => {
            return `${season}, `
          })}
          </h1>

          <h1>Country: {hike.country}</h1>
          <h1>Time the hike takes: {hike.timeToComplete}</h1>
          <hr />

          </section>
          <section className="buttons">
            {isAuthenticated() &&
              <button
                className="button is-success"
                onClick={this.handleAddToFavorites}
              >Add Hike to Favorites</button>}
            {isOwner(hike.user._id) &&
              <button
                className="button is-info"
                // onClick={this.handleAddToFavorites}
              >Update this Hike</button>}
            {isOwner(hike.user._id) &&
              <button
                className="button is-danger"
                // onClick={this.handleAddToFavorites}
              >Delete this Hike</button>}
            {isAuthenticated() &&
              <button
                className="button is-warning"
                // onClick={this.handleAddToFavorites}
              >Add your Images from this hike</button>}
            <hr />
          </section>
          <section className="reviews">
            <h1>Add a HIKR Review:</h1>
            <br/>
              <HikeReviews 
                reviews={this.state.hike.reviews}
                handleReviewDelete={this.handleReviewDelete}
              />
          </section>
        </div>
      </div>
    )
  }
}

export default HikeShow


//* /api/profiles/userId/favorites
// * { hike: id}