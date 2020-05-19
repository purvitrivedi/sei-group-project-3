import React from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'
import  GroupHeaderImgNew  from './GroupHeaderImgNew'

class GroupEdit extends React.Component {
  state = { 
    formData: {
      name: '',
      headerImage: '', 
      description: ''
    },
    errors: {}
  }

  async componentDidMount() {
    const groupId = this.props.match.params.id
    try {
      const content = await axios.get(`/api/groups/${groupId}`)
      this.setState({ formData: content.data })
    } catch(err) {
      console.log(err.response)
    }   
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleClear = () => {
    const formData = {
      name: '',
      headerImage: '', 
      description: ''
    }
    this.setState({ formData })
  }

  // added token auth
  handleSubmit = async event => {
    event.preventDefault()
    const groupId = this.props.match.params.id
    try {
      const group = await axios.put(`/api/groups/${groupId}`, this.state.formData, {
        headers: { Authorization: `Bearer ${getToken()}`}
      })
      this.props.history.push(`/groups/${groupId}`)
      console.log(group)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    return(
      <section className="ContentNew section">
        <div className="container">
          <header>
              <div className='columns'>
                <div className='column'>
                  <figure className="image is-128x128">
                    <img  src="https://spring.is/wp-content/uploads/2018/04/backlit-dawn-foggy-697243-1024x683.jpg" />
                  </figure>
                </div>
                <div className='column is-12' >
                  <p style={{fontSize: 30}}>Update Your Group!</p>
                  <p>* Required</p>
                  <br />
                  <p style={{fontSize: 20}}>If you are not our member, please register your information&nbsp;<a href="/login">here</a>!</p>
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
                      <div className='column is-3'><label><strong>Image*:</strong></label></div>
                      <div className='column is-8'>
                        <div className={`control ${!this.state.errors.headerImage ?  '' : 'is-danger'}`}>
                          <GroupHeaderImgNew
                            onChange={this.handleChange}
                            name="headerImage"
                          />
                        </div>
                          {/* <input
                            className={`input ${!this.state.errors.headerImage ?  '' : 'is-danger'}`}
                            type="text"
                            placeholder="Header image"
                            value={this.state.formData.headerImage}
                            name="headerImage"
                            onChange={this.handleChange}  
                          /> */}
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

export default GroupEdit
