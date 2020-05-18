import React from 'react'
import { getToken, isOwner } from '../../lib/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'


import ProfileGroups from './ProfileGroups'
import ProfileFav from './ProfileFav'
import ProfileComplete from './ProfileComplete'
import AddCompletedHike from './AddCompletedHike'
import ProfileImageUpload from './ProfileImageUpload'

import defaultImage from './defaultProfilePic.png'

class ProfileShow extends React.Component {

  state = {
    profile: [],
    edit: false,
    editTerm: 'Edit',
    showBio: true,
    bio: '',
    image: '',
    fullName: ''
  }

  async componentDidMount() {
    try {
      const id = this.props.match.params.id
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }
      const res = await axios.get(`/api/profiles/${id}`, withHeaders())
      this.setState({ profile: res.data, bio: res.data.bio, image: res.data.profileImage, fullName: res.data.fullName })
    } catch (err) {
      console.log(err.response)
    }
  }

  addCompHike = async (event, selectedHike) => {
    event.preventDefault()
    try {
      const userId = this.state.profile._id
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }
      await axios.post(`/api/profiles/${userId}/completed`, selectedHike, withHeaders())
      const res = await axios.get(`/api/profiles/${userId}`, withHeaders())
      this.setState({ profile: res.data })


    } catch (err) {
      console.log(err)
    }

  }


  removeCompHike = async (e) => {
    const completedId = e.target.value

    try {
      const userId = this.state.profile._id
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }
      await axios.delete(`/api/profiles/${userId}/completed/${completedId}`, withHeaders())
      const res = await axios.get(`/api/profiles/${userId}`, withHeaders())
      this.setState({ profile: res.data })


    } catch (err) {
      console.log(err)
    }
  }

  enableEdit = () => {
    const editTerm = this.state.editTerm === 'Edit' ? 'Close edit' : 'Edit'
    this.setState({ edit: !this.state.edit, editTerm })
  }

  enableEditBio = () => {
    this.setState({ showBio: !this.state.showBio })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendPutRequest = async (e) => {
    e.preventDefault()
    const bio = this.state.bio
    const image = this.state.image
    const fullName = this.state.fullName
    try {
      const id = this.props.match.params.id
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }
      await axios.put(`/api/profiles/${id}`, { bio: bio }, withHeaders())
      await axios.put(`/api/profiles/${id}`, { profileImage: image }, withHeaders())
      await axios.put(`/api/profiles/${id}`, { fullName }, withHeaders())

      const resGet = await axios.get(`/api/profiles/${id}`, withHeaders())
      this.setState({ profile: resGet.data, bio: resGet.data.bio, showBio: true, image: resGet.data.profileImage, fullName: resGet.data.fullName })


    } catch (err) {
      console.log(err.response)
    }
  }

  handleImageChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.sendPutRequest()
    })


  }




  render() {
    const { profile } = this.state
    let completedHikes
    if (profile.completedHikes) {
      if (profile.completedHikes.length > 0) {
        completedHikes = profile.completedHikes.map(hike => {
          return <ProfileComplete key={hike._id} {...hike} handleClick={this.removeCompHike} edit={this.state.edit} />
        })
      } else {
        if (isOwner(this.state.profile._id)) {
          completedHikes = <div className="no-hikes">No new hikes yet. Why not add a new one?</div>
        } else { completedHikes = <div className="no-hikes"> No fav hikes added</div> }
      }
    }
    let favoritedHikes
    if (profile.favoritedHikes) {
      if (profile.favoritedHikes.length > 0) {
        favoritedHikes = profile.favoritedHikes.map(hike => {
          return <ProfileFav key={hike._id} {...hike} edit={this.state.edit} />
        })
      } else {
        if (isOwner(this.state.profile._id)) {
          favoritedHikes = <Link to="/hikes"><div>Explore Hikes</div></Link>
        } else { favoritedHikes = <div className="no-hikes"> No fav hikes added</div> }

      }
    }

    let joinedGroups
    if (profile.joinedGroups) {
      if (profile.joinedGroups.length > 0) {
        joinedGroups = profile.joinedGroups.map(groupId => (<ProfileGroups key={groupId} id={groupId} edit={this.state.edit} />))
      } else {
        if (isOwner(this.state.profile._id)) {
          joinedGroups = <Link to="/groups"> <div className="no-group">Explore Hikr Groups</div></Link>
        } else { joinedGroups = <div className="no-group"> No groups joined yet.</div> }

      }
    }
    return (
      <div className="profile-show">
        <div className="tile is-ancestor">
          <div className="tile-pad">
            <figure className="left-tile">
              {this.state.image && <img src={this.state.image} alt="profileImage" />}
              {!this.state.image && <img src={defaultImage} />}
              {this.state.edit &&
                <div className="control">
                  <ProfileImageUpload
                    onChange={this.handleImageChange}
                    name="image"
                  />
                </div>
              }
              {(profile.fullName) && <p className="subtitle">{profile.fullName}</p>}
              {!(profile.fullName) && this.state.edit &&
                <div className="name control">
                  <form className="columns" onSubmit={this.sendPutRequest}>
                    <input
                      type="text"
                      className="input fullname column"
                      placeholder="Add your Full name"
                      name="fullName"
                      value={this.state.fullName}
                      onChange={this.handleChange}
                    />
                    <button type="submit" className="column name-btn">→</button>
                  </form>
                </div>
              }


              <p className="column">@{profile.username}</p>

              {isOwner(profile._id) && <p onClick={this.enableEdit} className="edit">{this.state.editTerm}</p>}
            </figure>

            <div className="tile is-child groups box">
              <article>
                <h1 className="subtitle">I've joined...</h1>
                {joinedGroups}
              </article>
            </div>

          </div>
          <div className="tile-pad">
            <div className="notification fav is-success columns is-multiline">
              <article className="column is-full">
                <h1 className="subtitle">I'd like to go to...</h1>
                <div className="column columns is-multiline">
                  {favoritedHikes}
                </div>
              </article>
            </div>
            <div className="bio-box notification columns is-multiline">
              {/* <article> */}

              <div className="subtitle">About me...</div>
              {this.state.edit && <p onClick={this.enableEditBio} className="edit-bio">Edit bio</p>}
              {this.state.showBio && <div className="bio">
                <p>
                  {profile.bio}
                </p></div>}

              {!this.state.showBio &&
                <div>
                  <textarea
                    className="textarea"
                    value={this.state.bio}
                    onChange={this.handleChange}
                    name="bio"

                  />
                  <p className="edit-bio-btn" onClick={this.sendPutRequest}>Submit</p>
                </div>}
              {/* </article> */}
            </div>
          </div>

          <div className="tile-pad">
            <div className="notification comp columns is-multiline">
              <article className="column is-full">
                <h1 className="subtitle">Where I've been...</h1>
              </article>
              <div className="column columns is-multiline">
                {completedHikes}
              </div>
              {isOwner(profile._id) &&
                <div className="column is-full"> <AddCompletedHike id={profile._id} handleSubmit={this.addCompHike} /></div>
              }
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default ProfileShow