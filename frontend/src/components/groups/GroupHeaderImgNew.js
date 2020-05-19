import React from 'react'
import axios from 'axios'
const uploadUrl = 'https://api.cloudinary.com/v1_1/dfeirxlea/image/upload'
const uploadPreset = 'ydhktetw'

class GroupHeaderImgNew extends React.Component {
  state = {
    image: ''
  }

  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    this.setState({
      image: res.data.url
    }, () => {
      this.props.onChange({ target: { name: this.props.name, value: this.state.image } })
    })
  }

  render() {
    console.log(this.props)
    const { image } = this.state
    return (
        <>
          <input
            className="input image-upload"
            type="file"
            onChange={this.handleUpload}
          />
        </>
    )
  }
}

export default GroupHeaderImgNew