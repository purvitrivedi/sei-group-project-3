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
import HikeCreate from './components/hikes/HikeCreate'

// groups
import GroupIndex from './components/groups/GroupIndex'
import GroupShow from './components/groups/GroupShow'
import GroupMembersIndex from './components/groups/GroupMembersIndex'
import GroupImagesIndex from './components/groups/GroupImagesIndex'
import GroupEventShow from './components/groups/GroupEventShow'
import GroupNew from './components/groups/GroupNew'
import GroupEdit from './components/groups/GroupEdit'

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

        <Route path="/hikes/new" component={HikeCreate} />
        <Route path="/hikes/:id" component={HikeShow} />
        <Route path="/hikes" component={HikesIndex} />

        <SecureRoute path="/groups/:id/members" component={GroupMembersIndex} />
        <SecureRoute path="/groups/:id/images" component={GroupImagesIndex} />
        <SecureRoute path="/groups/:id/events" component={GroupEventShow} />
        <SecureRoute path="/groups/register" component={GroupNew} />
        <SecureRoute path="/groups/:id/edit" component={GroupEdit} />
        <Route path="/groups/:id" component={GroupShow} />
        <Route path="/groups" component={GroupIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App