
import React from 'react'
import Login from './Login'
import Register from './Register'


const LoginOrRegister = (props) => {
  const { history } = props
  return (
    <div>
      <hr />
      <div className="columns">
        <Login history={history} />
        <Register history={history} />
      </div>
    </div>

  )
}


export default LoginOrRegister