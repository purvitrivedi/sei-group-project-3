import React from 'react'
import Select from 'react-select'

import ImageUpload from '../common/ImageUpload'

const HikeForm = ({  formData, handleChange, handleSubmit, handleAddImage, handleImageChange, btnTxt }) => {
  // const { location } = formData
  const seasonOptions = [
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
    { value: 'Autumn', label: 'Autumn' },
    { value: 'Winter', label: 'Winter' }
  ]
  handleMultiChange = selected => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, breakfastOrder: selectedItems }
    this.setState({ formData })
  }

  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box">
        <p>Add a new hike</p>
        <hr />
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              placeholder="Name of Hike"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Difficulty</label>
          <div className="control">
            <input
              className="input"
              placeholder="THIS SHOULD BE A SELECTION OF OPTIONS"
              name="difficulty"
              onChange={handleChange}
              value={formData.difficulty}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Distance</label>
          <div className="control">
            <input
              className="input"
              placeholder="5km..."
              name="distance"
              onChange={handleChange}
              value={formData.distance}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Time to complete</label>
          <div className="control">
            <input
              className="input"
              placeholder="How long does it take to complete..."
              name="timeToComplete"
              onChange={handleChange}
              value={formData.timeToComplete}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Seasons</label>
          <div className="control">
            <Select
              options={seasonOptions}
              isMulti
              onChange={this.handleMultiChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <input
              className="input"
              placeholder="Country"
              name="location.country"
              onChange={handleChange}
              // value={location.country}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Latitude</label>
          <div className="control">
            <input
              className="input"
              placeholder="Latitude"
              name="location.lat"
              onChange={handleChange}
              // value={location.lat}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Longitude</label>
          <div className="control">
            <input
              className="input"
              placeholder="Longitude"
              name="location.lon"
              onChange={handleChange}
              // value={location.lon}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Tell us about the hike!"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            {formData.images.map((image, index) => {
              return (
                <ImageUpload
                  key={index}
                  onChange={args => handleImageChange(args, index)}
                  name="images"
                />
              )
            })}
            <button onClick={handleAddImage}>Add Another Image</button>
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-fullwidth is-success">{btnTxt}</button>
        </div>
      </form>
    </div>
  )
}

export default HikeForm