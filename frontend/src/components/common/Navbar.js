import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout, getUserId } from '../../lib/auth'



class Navbar extends React.Component {
  state = {
    burgerIsOpen: false,
    hikesIsOpen: false,
    communityIsOpen: false,
    accountIsOpen: false
  }


  handleToggle = (element) => {
    if (element === 'hikes') {
      this.setState({
        hikesIsOpen: !this.state.hikesIsOpen,
        communityIsOpen: false,
        accountIsOpen: false
      })
    }

    if (element === 'community') {
      this.setState({
        hikesIsOpen: false,
        communityIsOpen: !this.state.communityIsOpen,
        accountIsOpen: false
      })
    }

    if (element === 'account') {
      this.setState({
        hikesIsOpen: false,
        communityIsOpen: false,
        accountIsOpen: !this.state.accountIsOpen
      })
    }
  }

  handleBurger = () => {
    this.setState({ burgerIsOpen: !this.state.burgerIsOpen })
  }


  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        hikesIsOpen: false,
        communityIsOpen: false,
        accountIsOpen: false,
        burgerIsOpen: false
      })
    }
  }

  render() {
    const { hikesIsOpen, communityIsOpen, accountIsOpen, burgerIsOpen } = this.state
    const userId = getUserId()

    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">Hikr</Link>
            <span onClick={this.handleBurger} className={`navbar-burger ${burgerIsOpen ? 'is-active' : ''}`}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </span>
          </div>
          <div className={`navbar-menu ${burgerIsOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {!isAuthenticated() && <Link to="/hikes" className="navbar-item">Hikes</Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${hikesIsOpen ? 'is-active' : ''}`} onClick={() => this.handleToggle('hikes')}>
                <span>Hikes</span>
                <div className="navbar-dropdown">
                  <Link to="/hikes" className="navbar-item">All Hikes</Link>
                  <Link to="/hikes/new" className="navbar-item">Add a New Hike</Link>
                </div>
              </div>}
              {!isAuthenticated() && <Link to="/groups" className="navbar-item">Community</Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${communityIsOpen ? 'is-active' : ''}`} onClick={() => this.handleToggle('community')}>
                <span>Community</span>
                <div className="navbar-dropdown">
                  <Link to="/profiles" className="navbar-item">Hikrs</Link>
                  <Link to="/groups" className="navbar-item">Groups</Link>
                  <Link to="/groups/register" className="navbar-item">Add a New Group</Link>
                </div>
              </div>}
              {!isAuthenticated() && <Link to="/login" className="navbar-item">Log In</Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${accountIsOpen ? 'is-active' : ''}`} onClick={() => this.handleToggle('account')}>
                <span>Account</span>
                <div className="navbar-dropdown">
                  <Link to={`/profiles/${userId}`} className="navbar-item">Profile</Link>
                  <span onClick={this.handleLogout} className="navbar-item">Logout</span>
                </div>
              </div>}

            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)