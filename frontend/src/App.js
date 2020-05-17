import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SecureRoute from './components/common/SecureRoute'

//common
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'


// auth
import Login from './components/auth/LoginorRegister'

import ProfileIndex from './components/profiles/ProfilesIndex'
import ProfileShow from './components/profiles/ProfileShow'
import ProfileEdit from './components/profiles/ProfileEdit'

//hikes
import HikesIndex from './components/hikes/HikesIndex'
import HikeShow from './components/hikes/HikeShow'

// groups
import GroupIndex from './components/groups/GroupIndex'
import GroupCard from './components/groups/GroupCard'
import GroupMembersIndex from './components/groups/GroupMembersIndex'
import GroupImagesIndex from './components/groups/GroupImagesIndex'
import GroupMessagesIndex from './components/groups/GroupMessagesIndex'
import GroupEventsIndex from './components/groups/GroupEventsIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <SecureRoute path="/profiles/:id/edit" component={ProfileEdit} />
        <SecureRoute path="/profiles/:id" component={ProfileShow} />
        <SecureRoute path="/profiles" component={ProfileIndex} />

        <Route path="/hikes/:id" component={HikeShow} />
        <Route path="/hikes" component={HikesIndex} />

        <Route path="/groups/:id/members" component={GroupMembersIndex} />
        <Route path="/groups/:id/user-images" component={GroupImagesIndex} />
        <Route path="/groups/:id/messages" component={GroupMessagesIndex} />
        <Route path="/groups/:id/events" component={GroupEventsIndex} />
        <Route path="/groups/:id" component={GroupCard} />
        <Route path="/groups" component={GroupIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App