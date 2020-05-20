import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone'

import { isOwner, getUserId, isAuthenticated } from '../../lib/auth'
import { getUser } from '../../lib/api'


class HikeReviews extends React.Component {
  state = {
    profileImage: '',
    reviewData: {
      rating: '',
      text: ''
    },
    newDate: ''
  }

  async componentDidMount() {
    try {
      const userId = getUserId()
      const res = await getUser(userId)
      this.setState({ profileImage: res.data.profileImage })
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = event => {    
    const reviewData = { ...this.state.reviewData, [event.target.name]: event.target.value }
    this.setState({ reviewData })
  }

  render() {
    const { handleReviewDelete, handleSubmitReview, reviews } = this.props
    
    return (
      <>
        {isAuthenticated() &&
          <form onSubmit={(event) => { handleSubmitReview(event, this.state.reviewData) }}>
            <h1 className="hikr-title">Add a HIKR Review:</h1>
            <br />
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={this.state.profileImage} alt="user profile pic"/>
                </p>
              </figure>
              <div className="media-content">
                <div className="field">
                  <p className="control">
                    <textarea
                      className="textarea"
                      placeholder="Add a review..."
                      name="text"
                      onChange={this.handleChange}
                      value={this.state.reviewData.text}
                    >
                    </textarea>
                  </p>
                </div>
                <div className="level">
                  <div className="level-left">
                    <div className="control">
                      <label className="radio">
                        <input
                          type="radio"
                          name="rating"
                          value="1"
                          onChange={this.handleChange}
                        // checked={this.state.reviewData.rating === }
                        />⭐️
                    </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="rating"
                          value="2"
                          onChange={this.handleChange}
                        // checked={this.state.reviewData.rating}
                        />⭐️⭐️
                    </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="rating"
                          value="3"
                          onChange={this.handleChange}
                        // checked={this.state.reviewData.rating}
                        />⭐️⭐️⭐️
                    </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="rating"
                          value="4"
                          onChange={this.handleChange}
                        // checked={this.state.reviewData.rating}
                        />⭐️⭐️⭐️⭐️
                    </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="rating"
                          value="5"
                          onChange={this.handleChange}
                        // checked={this.state.reviewData.rating}
                        />⭐️⭐️⭐️⭐️⭐️
                    </label>
                    </div>
                  </div>
                </div>
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <button type="submit" className="button hike-show-button is-success">Submit Review!</button>
                    </div>
                  </div>
                </nav>
                <hr />
              </div>
            </article>
          </form>}
        <article className="media">
          <h1 className="hikr-title">HIKR Reviews:</h1>
        </article>
        {reviews.map(review => {
          return (
            <article key={review._id} className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={review.user.profileImage} alt="profile pic"/>
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p><strong>{review.user.fullName}</strong> <small>{'⭐️'.repeat(review.rating)} </small> <small><Moment fromNow >{review.createdAt}</Moment></small>
                    <br />
                    {review.text}
                  </p>
                </div>
              </div>
              <div className="media-right">
                <form onSubmit={handleReviewDelete} id={review._id}>
                  {isOwner(review.user._id) && <button type="submit" className="delete"></button>}
                </form>
              </div>
            </article>
          )
        })}
      </>
    )
  }
}

export default HikeReviews