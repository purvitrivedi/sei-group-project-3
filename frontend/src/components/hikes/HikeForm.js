import React from 'react'
import Select from 'react-select'

import ImageUpload from '../common/ImageUpload'

const HikeForm = ({  
  formData, 
  handleChange, 
  handleSubmit, 
  handleAddImage, 
  handleImageChange, 
  handleMultiChangeSeasons, 
  handleMultiChangeDifficulty, 
  btnTxt 
}) => {

  const seasonOptions = [
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
    { value: 'Autumn', label: 'Autumn' },
    { value: 'Winter', label: 'Winter' }
  ]

  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' }
  ]

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
            <Select
              options={difficultyOptions}
              placeholder="Difficulty..."
              name="difficulty"
              isMulti
              onChange={handleMultiChangeDifficulty}
              
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
              placeholder="Seasons..."
              name="seasons"
              onChange={handleMultiChangeSeasons}
            
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <input
              className="input"
              placeholder="Country"
              name="country"
              onChange={handleChange}
              value={formData.country}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Latitude</label>
          <div className="control">
            <input
              className="input"
              placeholder="Latitude"
              name="lat"
              onChange={handleChange}
              value={formData.lat}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Longitude</label>
          <div className="control">
            <input
              className="input"
              placeholder="Longitude"
              name="lon"
              onChange={handleChange}
              value={formData.lon}
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