import React from 'react'
import axios from 'axios'
import Select from 'react-select'

class AddCompletedHike extends React.Component {
  state = {
    hikes: [],
    hikeOptions: [],
    selectedHike: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/hikes')
      this.setState({ hikes: res.data })
      this.createHikeOptions()
    } catch (err) {
      console.log(err)
    }
  }


  createHikeOptions = () => {
    const { hikes } = this.state
    const hikeOptions = hikes.map(hike => ({ value: hike._id, label: hike.name }))
    this.setState({ hikeOptions })
  }



  handleMultiChange = async (selected) => {
    const selectedHike = selected ? { hike: selected.value } : ''
    this.setState({ selectedHike })

  }

  
  render() {
    return (
      <div>
        <form onSubmit={(event) => this.props.handleSubmit(event, this.state.selectedHike)} className="columns comp-form" >
          <Select
            className="column is-four-fifths"
            placeholder="Add a new hike..."
            options={this.state.hikeOptions}
            onChange={this.handleMultiChange}
          />
          <div className="column"> <button type="submit" className="button">+</button></div>
        </form>
      </div>
    )
  }
}

export default AddCompletedHike