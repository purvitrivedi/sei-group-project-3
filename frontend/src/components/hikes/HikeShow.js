import React from 'react'
import { Link } from 'react-router-dom'

import { getSingleHike, deleteHikeReview, addHikeToFavorites, reviewHike, deleteHike } from '../../lib/api'
import { isAuthenticated, getUserId, isOwner } from '../../lib/auth'

import HikeReviews from './HikeReviews'
import HikeUpdate from './HikeUpdate'



class HikeShow extends React.Component {
  state = {
    hike: null,
    reviewData: {
      text: '',
      rating: ''
    },
    averageRating: ''
  }

  async componentDidMount() {
    try {
      const hikeId = this.props.match.params.id
      const res = await getSingleHike(hikeId)
      this.setState({ hike: res.data },
        () => {
          this.getAverageRating()
        })
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteHike = async () => {
    try {
      const hikeId = this.props.match.params.id
      await deleteHike(hikeId)
      this.props.history.push('/hikes')
    } catch (err) {
      console.log(err);
    }
  }

  handleAddToFavorites = async () => {
    try {

      const userId = getUserId()
      const hikeId = { hike: this.props.match.params.id }
      const res = await addHikeToFavorites(userId, hikeId)
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmitReview = async (event, reviewData) => {
    event.preventDefault()
    try {
      const hikeId = this.props.match.params.id
      await reviewHike(hikeId, reviewData)
      const res = await getSingleHike(hikeId)
      this.setState({ hike: res.data }, 
        () => {
          this.getAverageRating()
        })
    } catch (err) {
      console.log(err);
    }
  }

  handleReviewDelete = async event => {
    event.preventDefault()
    const hikeId = this.props.match.params.id
    const reviewId = event.target.id
    try {
      await deleteHikeReview(hikeId, reviewId)
      const res = await getSingleHike(hikeId)
      this.setState({ hike: res.data }, 
        () => {
          this.getAverageRating()
        })
    } catch (err) {
      console.log(err)
    }
  }

  getAverageRating = () => {
    const reviews = this.state.hike.reviews
    const ratings = reviews.map(review => {
      return review.rating
    })
    const averageRating = (ratings.reduce((a,b) => a + b, 0) / ratings.length).toFixed(2)
    this.setState({ averageRating })
  }


  render() {
    if (!this.state.hike) return null

    const { hike, averageRating } = this.state
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
            <hr/>
            <h1>Difficulty: {hike.difficulty.map(difficulty => {
              return `${difficulty}, `
            })}</h1>

            <h1>Seasons: {hike.seasons.map(season => {
              return `${season}, `
            })}
            </h1>

            <h1>Country: {hike.country}</h1>
            <h1>Time the hike takes: {hike.timeToComplete}</h1>
            <h1>Average Rating: {averageRating}/5</h1>
            <hr />
          </section>

          <section className="buttons">
            {isAuthenticated() &&
              <button
                className="button is-success"
                onClick={this.handleAddToFavorites}
              >Add Hike to Favorites</button>}

            {isOwner(hike.user._id) &&
              <Link 
                to={`/hikes/${hike._id}/update`}
                className="button is-info"
              // onClick={this.handleAddToFavorites}
              >Update this Hike</Link>}

            {isOwner(hike.user._id) &&
              <button
                className="button is-danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this Hike?')) {
                    this.handleDeleteHike()
                  }
                }}>Delete this Hike</button>}

            {isAuthenticated() &&
              <button
                className="button is-warning"
              onClick={this.getAverageRating}
              >Log ave rating</button>}

            <hr />
          </section>
          <section className="reviews">
            
            <HikeReviews
              reviews={this.state.hike.reviews}
              handleReviewDelete={this.handleReviewDelete}
              handleSubmitReview={this.handleSubmitReview}
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