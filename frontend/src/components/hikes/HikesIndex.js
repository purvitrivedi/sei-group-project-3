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
      <section className="section Home-list">
        <div className="container">
          {this.state.hikes.map(hike => {
            return (
              <HikeListCard key={hike._id} {...hike}/>
            )
          })}
        </div>
      </section>
    )
  }
}

export default HikesIndex