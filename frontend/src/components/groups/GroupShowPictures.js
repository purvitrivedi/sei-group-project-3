import React from 'react'
import { getUserId } from '../../lib/auth'
import GroupImgNew from './GroupImgNew'

const GroupShowPictures = ({ images, name, handleDeletePhoto, currentlyDisplayed, member, handleUploadPhoto }) => {
  return(
    <section className="section">
      <div
        className="container"
        style={{ 
          minHeight: 500,
          display: `${currentlyDisplayed === 'pictures' ? 'block' : 'none' }` 
        }}
        >
        <h1 className="subtitle">Group Pictures</h1>
        <div className="columns is-multiline">
          <div className="container" style={{ minHeight: 500}}>
            {images.map((img, index) => (
              <div className="column is-4" key={index}>
                <figure className="image">
                  <img src={img.images} alt={name} style={{height: 250}}/>
                </figure>
                {(img.user._id === getUserId() ) && <button value={img._id} onClick={handleDeletePhoto}>x</button>}
              </div>
            ))
            }
            {member && 
              <GroupImgNew
                onChange={handleUploadPhoto}
                name="images"
              />
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default GroupShowPictures