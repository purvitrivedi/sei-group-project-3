import React from 'react'

import { createHike } from '../../lib/api'
import HikeForm from './HikeForm'



class HikeCreate extends React.Component {
  state = {
    formData: {
      name: '',
      description: '',
      location: {
        country: '',
        lat: '',
        lon: ''
      },
      difficulty: '',
      distance: '',
      timeToComplete: '',
      images: [''],
      seasons: ['']
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await createHike(this.state.formData)
      this.props.history.push(`/hike/${res.data._id}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  handleAddImage = event => {
    event.preventDefault()
    const formData = { ...this.state.formData, images: [...this.state.formData.images, ''] }
    this.setState({ formData })
  }

  handleImageChange = (event, i) => {
    const images = [...this.state.formData.images]
    const newImages = images.map((image, index) => {
      if (i === index) return event.target.value
      return image
    })
    const formData = { ...this.state.formData, images: newImages }
    this.setState({ formData })
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <HikeForm
            formData={this.state.formData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleAddImage={this.handleAddImage}
            handleImageChange={this.handleImageChange}
            btnTxt="Add your Hike!"
          />
        </div>
      </section>
    )
  }
}

export default HikeCreate