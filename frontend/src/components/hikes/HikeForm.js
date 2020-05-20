import React from 'react'
import Select from 'react-select'

import ImageUpload from '../common/ImageUpload'

const HikeForm = ({
  title,
  formData,
  handleChange,
  handleSubmit,
  handleAddImage,
  handleImageChange,
  handleMultiChangeSeasons,
  handleMultiChangeDifficulty,
  btnTxt, 
  errors
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
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box hike-form">
        <h1 className="title"><i className="fas fa-mountain mountain"></i> {title} <i className="fas fa-mountain mountain"></i></h1>
        <hr />
        <div className='hike-form-fields'>
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
          {errors && errors.name && <small className="help is-danger">Name is required</small>}
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
          {errors && errors.difficulty && <small className="help is-danger">Difficulty is required</small>}
        </div>
        <div className="columns split-row">
          <div className="field column">
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
            {errors && errors.distance && <small className="help is-danger">Distance is required</small>}
          </div>
          <div className="field column">
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
            {errors && errors.timeToComplete && <small className="help is-danger">Time to Complete is required</small>}
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
          {errors && errors.seasons && <small className="help is-danger">Seasons is required</small>}
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
          {errors && errors.country && <small className="help is-danger">Country is required</small>}
        </div>
        <div className="columns split-row">
        <div className="field column">
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
          {errors && errors.lat && <small className="help is-danger">Latitude is required</small>}
        </div>
        <div className="field column">
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
          {errors && errors.lon && <small className="help is-danger">Longitude is required</small>}
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
          {errors && errors.description && <small className="help is-danger">Description is required</small>}
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
          {errors && errors.images && <small className="help is-danger">At least one image required</small>}
        </div>
        <div className="field">
          <button type="submit" className="button is-fullwidth hike-submit">{btnTxt}</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default HikeForm