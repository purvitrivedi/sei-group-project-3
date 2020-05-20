import React from 'react'

import { createHike } from '../../lib/api'
import HikeForm from './HikeForm'



class HikeCreate extends React.Component {
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
    }, 
    errors: {}
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await createHike(this.state.formData)
      this.props.history.push(`/hikes/${res.data._id}`)
    } catch (err) {
      this.setState({ errors: err.response.data})
    }
  }

  handleAddImage = event => {
    event.preventDefault()
    const formData = { ...this.state.formData, images: [...this.state.formData.images, ''] }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
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

  handleMultiChangeSeasons = selected => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, seasons: selectedItems }
    this.setState({ formData })
  }

  handleMultiChangeDifficulty = selected => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, difficulty: selectedItems }
    this.setState({ formData })
  }

  render() {
    console.log(this.state.errors)

    return (
      <section className="section background-hike-form">
        <div className="container">
          <HikeForm
            title="Add Hike"
            formData={this.state.formData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleAddImage={this.handleAddImage}
            handleImageChange={this.handleImageChange}
            handleMultiChangeSeasons={this.handleMultiChangeSeasons}
            handleMultiChangeDifficulty={this.handleMultiChangeDifficulty}
            btnTxt="Add your Hike!"
            errors={this.state.errors}
          />
        </div>
      </section>
    )
  }
}

export default HikeCreate