import React from 'react'
import { getToken, isOwner } from '../../lib/auth'
import axios from 'axios'


import ProfileGroups from './ProfileGroups'
import ProfileFav from './ProfileFav'
import ProfileComplete from './ProfileComplete'
import AddCompletedHike from './AddCompletedHike'

class ProfileShow extends React.Component {

  state = {
    profile: [],
    edit: false,
    editTerm: 'Edit'
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
      this.setState({ profile: res.data })
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

  render() {
    const { profile } = this.state
    console.log(profile)
    let completedHikes
    if (profile.completedHikes) {
      completedHikes = profile.completedHikes.map(hike => {
        return <ProfileComplete key={hike._id} {...hike} handleClick={this.removeCompHike} edit={this.state.edit}/>
      })
    }
    let favoritedHikes
    if (profile.favoritedHikes) {
      favoritedHikes = profile.favoritedHikes.map(hike => {
        return <ProfileFav key={hike._id} {...hike} edit={this.state.edit}/>
      })
    }

    let joinedGroups
    if (profile.joinedGroups) {
      joinedGroups = profile.joinedGroups.map(groupId => (<ProfileGroups id={groupId} edit={this.state.edit}/>))
    }

    return (
      <div className="profile-show">
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-3">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <figure>
                  <img src={profile.profileImage} alt="profileImage" />
                  {(profile.fullName) && <p className="subtitle fullname">{profile.fullName}</p>}
                  <p className="column">@{profile.username}</p>
                  {isOwner(profile._id) && <p onClick={this.enableEdit} className="edit">{this.state.editTerm}</p>}
                </figure>

                <div className="tile is-child groups box">
                  <article>
                    <h1 className="subtitle">I follow...</h1>
                    {joinedGroups}
                  </article>
                </div>

              </div>
            </div>
          </div>

          <div className="tile is-4">
            <div className="is-vertical tile-pad">
              <div className="notification is-success columns is-multiline">
                <article className="column is-full">
                  <h1 className="subtitle">I'd like to go to...</h1>
                  <div className="column columns is-multiline">
                    {favoritedHikes}
                  </div>
                </article>
              </div>
              <article className="box bio-box">
              { this.state.edit && <p className="edit-bio">Edit bio</p>}
                <div className="bio">
                  {profile.bio}
                </div>
              </article>
            </div>
          </div>

          <div className="tile is-4">
            <div className="tile is-parent tile-pad">
              <div className="notification is-warning columns is-multiline">
                <article className="column is-full">
                  <h1 className="subtitle">Where I've been...</h1>
                </article>
                <div className="column columns is-multiline">
                  {completedHikes}
                </div>
                {isOwner(profile._id) &&
                  <div className="column is-full"> <AddCompletedHike id={profile._id} handleSubmit={this.addCompHike}/></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default ProfileShow