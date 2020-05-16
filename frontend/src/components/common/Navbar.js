import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'



class Navbar extends React.Component{
  state = { isOpen: false }
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }
  render() {
    const { isOpen } = this.state
    return (
      <nav className="navbar is-dark">
        <div className="container">
            <div className="navbar-end">
              <Link to="/hikes" className="navbar-item">Hikes</Link>
              {!isAuthenticated() && <Link to="/login" className="navbar-item">Log In</Link>}
              {isAuthenticated() && <span onClick={this.handleLogout} className="navbar-item">Logout</span>}
            </div>
        </div>
      </nav>
    )
  }
} 
export default withRouter(Navbar)