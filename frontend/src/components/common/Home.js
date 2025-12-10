import React from "react";
// import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    searchTerm: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/hikes?searchQuery=${this.state.searchTerm}`);
  };

  render() {
    return (
      <section className="Home hero is-fullheight-with-navbar is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title-logo has-text-centered">HIKR</h1>
            <div className="columns">
              <form
                onSubmit={this.handleSubmit}
                className="column is-half is-offset-one-quarter search-section"
              >
                <div className="field searchbar">
                  <div className="control">
                    <input
                      className="input is-rounded is-primary"
                      type="text"
                      name="searchTerm"
                      placeholder="Hey HIKR, where do you want to go...?"
                      onChange={this.handleChange}
                      value={this.state.searchTerm}
                    />
                  </div>
                </div>
                <div className="field search-button">
                  <input
                    type="submit"
                    className="button is-rounded is-primary"
                    value="Go!"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
