import React from 'react'

import { getSingleHike } from '../../lib/api'

import Navbar from '../common/Navbar'


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


  render() {
    if (!this.state.hike) return null


    const { hike } = this.state
    return (

      <div className="HikeShow">
        <div className="hero is-medium is-success is-bold">
          <div className="hero-head">
            <Navbar />
          </div>
          <div className="hero-body">
            <h1>Hero image goes here!</h1>
          </div>
          <div className="hero-foot"></div>
        </div>
        <div className="tile is-ancestor box">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification is-primary">
                  <p className="title">Vertical...</p>
                  <p className="subtitle">Top tile</p>
                </article>
                <article className="tile is-child notification is-warning">
                  <p className="title">...tiles</p>
                  <p className="subtitle">Bottom tile</p>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification is-info">
                  <p className="title">Middle tile</p>
                  <p className="subtitle">With an image</p>
                  <figure className="image is-4by3">
                  </figure>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <p className="title">Wide tile</p>
                <p className="subtitle">Aligned with the right tile</p>
                <div className="content">
                </div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-success">
              <div className="content">
                <p className="title">Tall tile</p>
                <p className="subtitle">With even more content</p>
                <div className="content">
                </div>
              </div>
            </article>
          </div>
        </div>
        <img src={hike.images[0]} alt={hike.name} />
        <h1>Name of Hike: {hike.name}</h1>
        <h1>Difficulty: {hike.difficulty}</h1>
        <h1>Description: {hike.description}</h1>
        <h1>Country: {hike.location.country}</h1>
        <h1>Time the hike takes: {hike.timeToComplete}</h1>
        <h1>Suitable in the following seasons: {hike.seasons[0]}</h1>
        <hr />
      </div>
    )
  }
}

export default HikeShow