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
    submitted: false
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

  handleSubmit = async (event, selectedHike) => {
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

  render() {
    console.log(this.state.submitted)

    const { profile } = this.state
    let completedHikes
    if (profile.completedHikes) {
      completedHikes = profile.completedHikes.map(hike => {
        return <ProfileComplete key={hike._id} {...hike} />
      })
    }
    return (
      <div className="tile is-ancestor box profile-show">
        <div className="tile is-vertical is-3">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <div className="tile is-parent">
                <article className="tile is-child">
                  <figure>
                    <img src={profile.profileImage} alt="profileImage" />
                  </figure>
                </article>
              </div>
              <article className="tile is-child bio">
                <p>{profile.bio}</p>
              </article>
              <article className="tile is-child notification">
                <ProfileGroups />
              </article>
            </div>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification is-success">
            <div className="content">
              <ProfileFav />
              <div className="content">
              </div>
            </div>
          </article>
        </div>
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <div className="tile is-parent notification is-warning columns is-multiline">
              <article className="column is-full">
                <h1 className="subtitle">Where I've been...</h1>
              </article>
              <div className="column columns is-multiline">
                {completedHikes}
              </div>
              {isOwner(profile._id) &&
                <div className="column is-full"> <AddCompletedHike id={profile._id} handleSubmit={this.handleSubmit} /></div>
              }

            </div>
            <article className="tile is-child notification">
            </article>
          </div>
        </div>
      </div>

    )
  }
}


export default ProfileShow