import React from 'react'

import { isOwner, getUserId } from '../../lib/auth'

class HikeReviews extends React.Component {



  render() {
    
    const { handleReviewDelete, reviews } = this.props
    console.log(getUserId());

    return (
      <>
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src="" />
            </p>
          </figure>
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea className="textarea" placeholder="Add a review..."></textarea>
              </p>
            </div>
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <a className="button is-success">Submit</a>
                </div>
              </div>
            </nav>
          </div>
        </article>
        <article className="media">
          <h1>Other HIKR Reviews:</h1>
        </article>
        {reviews.map(review => {
          return (
            <article key={review._id} className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={review.user.profileImage} />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p><strong>{review.user.fullName}</strong> <small>Rating: {review.rating} Stars</small> <small>{review.createdAt}</small>
                    <br />
                    {review.text}
                  </p>
                </div>
              </div>
              <div className="media-right">
                <form onSubmit={handleReviewDelete}  id={review._id}>
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