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
              {!isAuthenticated() && <Link to="/hikes"><div className="navbar-item main-nav">Hikes</div></Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${hikesIsOpen ? 'is-active' : ''}`} onClick={() => this.handleToggle('hikes')}>
                <span className="main-nav">Hikes</span>
                <div className="navbar-dropdown">
                  <Link to="/hikes"><div className="navbar-item nav-color">All Hikes</div></Link>
                  <Link to="/hikes/new"><div className="navbar-item nav-color">Add a New Hike</div></Link>
                </div>
              </div>}
              {!isAuthenticated() && <Link to="/groups" className="navbar-item main-nav">Community</Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${communityIsOpen ? 'is-active' : ''}`} onClick={() => this.handleToggle('community')}>
                <span className="main-nav">Community</span>
                <div className="navbar-dropdown">
                  <Link to="/profiles"><div className="navbar-item nav-color">Hikrs</div></Link>
                  <Link to="/groups"><div className="navbar-item nav-color">Groups</div></Link>
                  <Link to="/groups/register"><div className="navbar-item nav-color">Add a New Group</div></Link>
                </div>
              </div>}
              {!isAuthenticated() && <Link to="/login" className="navbar-item main-nav">Log In</Link>}
              {isAuthenticated() && <div className={`navbar-item has-dropdown ${accountIsOpen ? 'is-active' : ''}`} onClick={() => this.handleToggle('account')}>
                <span className="main-nav">Account</span>
                <div className="navbar-dropdown">
                  <Link to={`/profiles/${userId}`}><div className="navbar-item nav-color">Profile</div></Link>
                  <span onClick={this.handleLogout} className="navbar-item nav-color">Logout</span>
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