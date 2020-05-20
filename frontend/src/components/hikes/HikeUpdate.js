import React from 'react'
import { getSingleHike, updateHike } from '../../lib/api'

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
    },
    errors: {}
  }

  async componentDidMount() {
    const hikeId = this.props.match.params.id
    try {
      const res = await getSingleHike(hikeId)
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const hikeId = this.props.match.params.id
    try {
      await updateHike(hikeId, this.state.formData)
      this.props.history.push(`/hikes/${hikeId}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  handleAddImage = () => {
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
      <section className="section background-hike-form-edit">
        <div className="container">
          <HikeForm
            title="Edit your Hike"
            formData={this.state.formData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleAddImage={this.handleAddImage}
            handleImageChange={this.handleImageChange}
            btnTxt='Save changes to Hike'
            errors={this.state.errors}
          />
        </div>
      </section>
    )
  }
}

export default HikeUpdate