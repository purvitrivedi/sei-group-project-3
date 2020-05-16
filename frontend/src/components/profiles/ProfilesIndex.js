import React from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'
import ProfilesList from './ProfilesList'

class ProfilesIndex extends React.Component {

  state = {
    profiles: []
  }

  async componentDidMount() {
    try {
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }
      const res = await axios.get('/api/profiles', withHeaders())
      console.log(res.data)
      this.setState({ profiles: res.data })
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          {/* <h1 className="packs-index-title title">All Packs</h1> */}
          <div className="columns is-multiline">
            {this.state.profiles.map(profile => <ProfilesList key={profile._id} {...profile} />)}
          </div>
        </div>
      </section>
    )
  }

}

  export default ProfilesIndex