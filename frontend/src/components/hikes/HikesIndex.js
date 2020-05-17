import React from 'react'

import { getAllHikes } from '../../lib/api'

import HikeListCard from './HikeListCard'

class HikesIndex extends React.Component {
  state = {
    hikes: null
  }

  async componentDidMount() {
    try {
      const res = await getAllHikes()
      this.setState({ hikes: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.hikes) return null

    return (
      <div className="HikesIndex">
        <div className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <h1>Hero image goes here!</h1>
          </div>
        </div>
        <div className="field box">
          <div className="control">
            <input
              className="input is-rounded is-primary"
              type="text"
              placeholder="Search for Country..."
            />
            <button className="button">Map View</button>
            <button className="button">List View</button>
            <button className="button">Card View</button>
          </div>
        </div>
        <section className="section Home-list">
          <div className="container">
            {this.state.hikes.map(hike => {
              return (
                <HikeListCard key={hike._id} {...hike} />
              )
            })}
          </div>
        </section>
      </div>
    )
  }
}

export default HikesIndex