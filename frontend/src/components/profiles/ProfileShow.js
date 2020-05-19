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


  removeHike = async (e) => {
    const linkName = e.target.name
    const id = e.target.value



    try {
      const userId = this.state.profile._id
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }
      await axios.delete(`/api/profiles/${userId}/${linkName}/${id}`, withHeaders())
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
    if (e) { e.preventDefault() }
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
          return <ProfileComplete key={hike._id} {...hike} handleClick={this.removeHike} edit={this.state.edit} />
        })
      } else {
        if (isOwner(this.state.profile._id)) {
          completedHikes = <div>No new hikes yet. Add a new one below...</div>
        } else { completedHikes = <div> No completed hikes added</div> }
      }
    }
    let favoritedHikes
    if (profile.favoritedHikes) {
      if (profile.favoritedHikes.length > 0) {
        favoritedHikes = profile.favoritedHikes.map(hike => {
          return <ProfileFav key={hike._id} {...hike} edit={this.state.edit} handleClick={this.removeHike} />
        })
      } else {
        if (isOwner(this.state.profile._id)) {
          favoritedHikes = <Link to="/hikes"><div className="no-hikes">Explore Hikes</div></Link>
        } else { favoritedHikes = <div> No favorite hikes added</div> }

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
      <div className="background-profile">
        <div className="tile is-ancestor box">

          {/* // * profile image + groups */}

          <div className="tile is-parent is-vertical">
            <div className="tile is-child box profile-top">
              <figure>
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
                  <div className="control add-name">
                    <form className="columns" onSubmit={this.sendPutRequest}>
                      <input
                        type="text"
                        className="input fullname column"
                        placeholder="Add your Full name"
                        name="fullName"
                        value={this.state.fullName}
                        onChange={this.handleChange}
                      />
                      <button type="submit" className="column is-one-fifth name-btn">→</button>
                    </form>
                  </div>
                }
                <p className="column">@{profile.username}</p>

                {isOwner(profile._id) && <p onClick={this.enableEdit} className="edit">{this.state.editTerm}</p>}
              </figure>

            </div>

            <div className="tile is-child box groups">
              <article>
                <h1 className="subtitle">I've joined...</h1>
                {joinedGroups}
              </article>
            </div>

          </div>

          {/* // * favorites + bio */}

          <div className="tile is-vertical is-parent">
            <div className="tile is-child box">
              <div className="columns is-multiline">
                <article className="column is-full">
                  <h1 className="subtitle">I'd like to go to...</h1>
                  <div className="column columns is-multiline">
                    {favoritedHikes}
                  </div>
                </article>
              </div>
            </div>
            <div className="tile is-child box">
              <div className="columns is-multiline">
                <h1 className="subtitle column is-full">About me...</h1>
                {this.state.edit && <p onClick={this.enableEditBio} className="edit-bio">Edit bio</p>}
                {this.state.showBio && <div>
                  <p>
                    {profile.bio}
                  </p></div>}
                {!this.state.showBio &&
                  <div className="columns">
                    <textarea
                      className="textarea column"
                      value={this.state.bio}
                      onChange={this.handleChange}
                      name="bio"
                    />
                    <p className="edit-bio-btn column is-centered" onClick={this.sendPutRequest}>Submit</p>
                  </div>}
              </div>
            </div>

          </div>

          {/* // * Completed Hikes */}

          <div className="tile is-parent">
            <div className="tile is-child box">
              <div className="columns is-multiline">
                <article className="column is-full">
                  <h1 className="subtitle">Where I've been...</h1>
                  <div className="column columns is-multiline">
                    {completedHikes}
                  </div>
                  {isOwner(profile._id) &&
                    <div className="column is-full"> <AddCompletedHike id={profile._id} handleSubmit={this.addCompHike} /></div>
                  }
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default ProfileShow