import React from 'react'

import { getAllHikes } from '../../lib/api'

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
      <section className="section Home-list">
        <div className="container">
          {this.state.hikes.map(hike => {
            return (
              <div>
                <img src={hike.images[0]} alt={hike.name} />
                <h1>Name of Hike: {hike.name}</h1>
                <h1>Difficulty: {hike.difficulty}</h1>
                <h1>Description: {hike.description}</h1>
                <h1>Country: {hike.location.country}</h1>
                <h1>Time the hike takes: {hike.timeToComplete}</h1>
                <h1>Suitable in the following seasons: {hike.seasons[0]}</h1>
                <hr/>
              </div>
              
            )
          })}
        </div>
      </section>
    )
  }
}

export default HikesIndex