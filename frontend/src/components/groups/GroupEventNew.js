import React from 'react'
import axios from 'axios'
import { getToken, getUserId } from '../../lib/auth'
import Select from 'react-select'

class GroupEventNew extends React.Component {
  state = {
    formData : {
      eventName: '', 
      startDate: '',
      endDate: '',
      description: '',
      hike: ''
    },
    errors: {},
    hikes: ['']
  }

  async componentDidMount() {
    try {
      const hikes = await axios.get('/api/hikes')
      this.setState({ hikes: hikes.data })
    } catch (err) {
      this.props.history.push('/notfound')
      this.setState({ errors: err })
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleHikeOptions = () => {
    let options = []
    this.state.hikes.map( hike => {
      let obj = {value: '', label: ''}
      obj.value = hike._id
      obj.label = hike.name
      options.push(obj)
    })
    return options
  }

  handleHikeChange = selected => {
    // const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, hike: selected.value }
    this.setState({ formData })
  }
  
  handleClear = () => {
    const formData = {
      eventName: '', 
      startDate: '',
      endDate: '',
      description: '',
      hike: ''
    }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const groupId = this.props.match.params.id
    const userId = getUserId()
    const user = await axios.get(`/api/profiles/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    const formData = { ...this.state.formData }
    this.setState({ formData })

    try {
      await axios.post(`/api/groups/${groupId}/events`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      await axios.get(`/api/groups/${groupId}`)
      this.props.history.push(`/groups/${groupId}`)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <section className="ContentNew section">
        <div className="container">
          <header>
              <div className='columns'>
                <div className='column'>
                  <figure className="image is-128x128">
                    <img src="https://blog-assets.thedyrt.com/uploads/2018/06/outdoor-event-hiking-group-1263x560.jpg" />
                  </figure>
                </div>
                <div className='column is-12' >
                  <p style={{fontSize: 30}}>Update the event</p>
                  <p>* Required</p>
                  <br />
                  <p style={{fontSize: 20}}>If you are not our member, please register your information <a href="/login">here</a>!</p>
                  <br />
                  <p>For more infomation, visit <a href='#' style={{fontColor: 'red'}}>our site</a></p>
                </div>
              </div>
            </header>


            <form onSubmit={this.handleSubmit} className="columns box">
            <div className="column">

              <div className="field">
                <div className="control">
                  <div className='columns'>

                      <div className='column is-3'><label><strong>Event Name*:</strong></label></div>
                        <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.eventName ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="Event Name"
                            value={this.state.formData.eventName}
                            name="eventName"
                            onChange={this.handleChange}  
                          />
                        </div>
                    </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>From*:</strong></label></div>
                        <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.startDate ?  '' : 'is-danger'}`}
                            type="date"
                            placeholder="From"
                            value={this.state.formData.startDate.slice(0, 10)}
                            name="startDate"
                            onChange={this.handleChange}  
                          />
                        </div>
                    </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>To*:</strong></label></div>
                        <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.startDate ?  '' : 'is-danger'}`}
                            type="date"
                            placeholder="To"
                            value={this.state.formData.endDate.slice(0, 10)}
                            name="endDate"
                            onChange={this.handleChange}  
                          />
                        </div>
                    </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Description*:</strong></label></div>
                      <div className='column is-8'>
                        <textarea 
                          className="textarea" 
                          placeholder="Description" 
                          onChange={this.handleChange} 
                          name='description'
                          value={this.state.formData.description}
                        />
                      </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Hike:</strong></label></div>
                      <Select
                        className={`column is-8 ${!this.state.errors.Hike ?  '' : 'is-danger'}`}
                        onChange={this.handleHikeChange}  
                        options={this.handleHikeOptions()}
                        style={{minWidth: 200}}
                      />
                    </div>
                </div>
              </div>

              <div className="field">
                <div className="buttons is-right">
                  <button className="button is-link is-hovered" onClick={this.handleClear}>Clear Input</button>
                  <button type='submit' className="button is-danger is-hovered">SUBMIT</button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default GroupEventNew