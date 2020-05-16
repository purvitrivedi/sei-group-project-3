import React from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'
import ProfilesList from './ProfilesList'

class ProfilesIndex extends React.Component {

  state = {
    profiles: [],
    search: ''
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

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})

  }

  filteredNames = () => {
    const { profiles, search } = this.state
    const regexp = new RegExp(search, 'i')
    return profiles.filter(profile => {
      return regexp.test(profile.fullName)
    })
  }


  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">The Hikr Community</h1>
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                name="search"
                type="text"
                placeholder="Search for a Hikr"
                onChange={this.handleChange}
                value={this.state.searchTerm}
              />
            </div>
          </div>
          <div className="columns is-multiline">
            {this.filteredNames().map(profile => <ProfilesList key={profile._id} {...profile} />)}
          </div>
        </div>
      </section>
    )
  }

}

export default ProfilesIndex