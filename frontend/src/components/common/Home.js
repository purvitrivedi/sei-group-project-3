import React from 'react'

const Home = () => {
  return (
    <section className="Home hero is-fullheight-with-navbar is-success is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="field column is-one-third is-offset-one-third">
              <div className="control">
                <input
                  className="input is-rounded is-primary"
                  type="text"
                  placeholder="Where do you want to go HIKR?..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home