import React from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'

class GroupEventsShow extends React.Component {
  state = {
    formData : {
      eventName: '', 
      startDate: '',
      endDate: '',
      description: '',
      hike: '',
      participants: [''],
      createdMember: ''
    },
    errors: {}
  }

  async componentDidMount() {
    const groupId = this.props.match.params.id
    const eventId = this.props.match.params.eventId
    try {
      const res = await axios.get(`/api/groups/${groupId}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.setState({ formData: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
      this.setState({ errors: err })
    }
  }
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleClear = () => {
    const formData = {
      eventName: '', 
      startDate: '',
      endDate: '',
      description: '',
      hike: '',
      participants: [''],
      createdMember: ''
    }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const eventId = this.props.match.params.id
    const groupId = this.props
    try {
      await axios.put(`/api/groups/${groupId}/events/${eventId}`, this.state.formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      this.props.history.push(`/groups/${groupId}/events`)
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
                    <img className="is-rounded" src="https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy_s.gif" />
                  </figure>
                </div>
                <div className='column is-12' >
                  <p style={{fontSize: 30}}>Update Your TeddyBear!</p>
                  <p>* Required</p>
                  <br />
                  <p style={{fontSize: 20}}>If you are not our member, please register your information <a href="/register">here</a>!</p>
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

                      <div className='column is-3'><label><strong>Name*:</strong></label></div>
                        <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.name ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="Name"
                            value={this.state.formData.name}
                            name="name"
                            onChange={this.handleChange}  
                          />
                        </div>
                    </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Country of Origin*:</strong></label></div>
                        <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.origin ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="Country of Origin"
                            value={this.state.formData.origin}
                            name="origin"
                            onChange={this.handleChange}  
                          />
                        </div>
                    </div>
                </div>
              </div>


              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Image*:</strong></label></div>
                      <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.image ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="image"
                            value={this.state.formData.image}
                            name="image"
                            onChange={this.handleChange}  
                          />
                      </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Image:</strong></label></div>
                      <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.image1 ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="image(optional)"
                            value={this.state.formData.image1}
                            name="image1"
                            onChange={this.handleChange}  
                          />
                      </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Image:</strong></label></div>
                      <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.image2 ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="image(optional)"
                            value={this.state.formData.image2}
                            name="image2"
                            onChange={this.handleChange}  
                          />
                      </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Image:</strong></label></div>
                      <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.image3 ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="image(optional)"
                            value={this.state.formData.image3}
                            name="image3"
                            onChange={this.handleChange}  
                          />
                      </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Image:</strong></label></div>
                      <div className='column is-8'>
                          <input
                            className={`input ${!this.state.errors.image4 ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="image(optional)"
                            value={this.state.formData.image4}
                            name="image4"
                            onChange={this.handleChange}  
                          />
                      </div>
                  </div>
                </div>
              </div>
    
              <div className="field">
                <div className="control">
                  <div className='columns'>
                      <div className='column is-3'><label><strong>Description:</strong></label></div>
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

export default GroupEventsShow