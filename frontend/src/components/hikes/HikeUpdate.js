import React from 'react'
import { getSingleHike } from '../../lib/api'

import HikeForm from './HikeForm'

class HikeUpdate extends React.Component {
  state = {
    formData: {
      name: '',
      description: '',
      country: '',
      lat: '',
      lon: '',
      difficulty: [''],
      distance: '',
      timeToComplete: '',
      images: [''],
      seasons: ['']
    }
  }

  async componentDidMount() {
    const hikeId = this.props.match.params.id
    try {
      const res = await getSingleHike(hikeId)
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state.formData)
    
    return (
      <h1>you are editing the hike!</h1>
    )
  }
}

export default HikeUpdate