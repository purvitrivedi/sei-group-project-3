import React from 'react'
// import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    searchTerm: ''
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.history.push(`/hikes?searchQuery=${this.state.searchTerm}`)
  }

  render() {
    console.log(this.state.searchTerm)

    return (
      <section className="Home hero is-fullheight-with-navbar is-success is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title-logo has-text-centered">HIKR</h1>
            <div className="columns">
              <form
                onSubmit={this.handleSubmit}
                className="column is-one-third is-offset-one-third">
                <div className="field ">
                  <div className="control">
                    <input
                      className="input is-rounded is-primary"
                      type="text"
                      name="searchTerm"
                      placeholder="Hey HIKR, Where do you want to go?..."
                      onChange={this.handleChange}
                      value={this.state.searchTerm}
                    />
                  </div>
                </div>
                <input type="submit" className="button is-rounded is-success" label="hikr"/>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default Home