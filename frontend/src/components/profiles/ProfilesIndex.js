import React from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'

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
        <h1>This is the profile index page</h1>
      )
    }

  }

export default ProfilesIndex