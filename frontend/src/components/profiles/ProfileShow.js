import React from 'react'
import { getToken } from '../../lib/auth'
import axios from 'axios'

class ProfileShow extends React.Component {

  state = {
    profile: []
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



  render() {
    const { profile } = this.state
    return (
<div className="tile is-ancestor">
  <div className="tile is-vertical is-5">
    <div className="tile">
      <div className="tile is-parent is-vertical">
      <div className="tile is-parent">
        <article className="tile is-child">
          <figure>
            <img src={profile.profileImage}/>
          </figure>
        </article>
      </div>
        <article className="tile is-child notification">
          <p className="title">Bio</p>
          <p>{profile.bio}</p>
        </article>
        <article className="tile is-child notification">
          <p className="subtitle">Hikes Completed: </p>
          <p className="subtitle">My favorite Hikes: </p>
        </article>
      </div>
   
    </div>
    <div className="tile is-parent">
      <article className="tile is-child notification is-danger">
        <p className="title">Wide tile</p>
        <p className="subtitle">Aligned with the right tile</p>
        <div className="content">
        </div>
      </article>
    </div>
  </div>
  <div className="tile is-parent">
    <article className="tile is-child notification is-success">
      <div className="content">
        <p className="title">Tall tile</p>
        <p className="subtitle">With even more content</p>
        <div className="content">
        </div>
      </div>
    </article>
  </div>
</div>

    )
  }
}


export default ProfileShow