import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


//common
import Home from './components/common/Home'

//hikes
import HikesIndex from './components/hikes/HikesIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hikes" component={HikesIndex} />
      </Switch>
    </BrowserRouter>

  )
}

export default App
