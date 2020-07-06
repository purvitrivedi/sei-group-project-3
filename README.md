# General Assembly Project 2: Search + Play

**_Timeframe_**

9 Days

## Goal:

A group project to design a full-stack React app using Node.js, Express & MongoDB.

## Technologies Used

- React.js
- Node.js
- Express
- MongoDB/Mongoose
- SASS
- Bulma
- Axios
- React Mapbox GL
- Nodemon
- HTTP-proxy-middleware
- Bcrypt
- Body-parser
- jsonwebtoken
- Git/GitHub

# Hikr

A MERN-Stack Hike search & community app. Visitors can look up beautiful hikes in Europe and once registered they can leave reviews, ratings & add them to favourites or completed Hikes.

Registered users can also create & join Hiking Communities where they can chat with other members & create hiking events.

![Hikr Home Page](frontend/src/styles/assets/README/hikr-home.png)

### Deployed version

https://hikrr.herokuapp.com/

## Code Installation

https://github.com/purvitrivedi/sei-group-project-3

- Clone or download the repo
- Install npm i in Terminal
- Start the database by running mongodb
- Start the server by running nodemon
- Go to frontend folder using <code>cd frontend</code> terminal command
- Run the frontend using npm run start

## Planning

Since we were three group members, each of us decided to take ownership (Backend & Frontend) of the app. Andy did Hikes, Kuriko did Groups and I did user Authentication, Profiles & App Navigation.

### App Layout

Like project-2, we also planned out the user journey of Hikr on Miro.

<img src="frontend/src/styles/assets/README/hikr-home-miro.png" alt="home-page-miro" width="300" /> <img src="frontend/src/styles/assets/README/hike-index-miro.png" alt="hikr-index-miro" width="300" /> <img src="frontend/src/styles/assets/README/hike-show-miro.png" alt="hike-show-miro" width="300" /> <img src="frontend/src/styles/assets/README/login-miro.png" alt="login-miro" width="300" /> <img src="frontend/src/styles/assets/README/profile-miro.png" alt="profile-miro" width="300" /> <img src="frontend/src/styles/assets/README/group-miro.png" alt="group-miro" width="300" />

# Process

As each of us had our own Backend areas to workon, we first planned out what models, controllers & routes each of us will be creating before moving on to code session. We also decided on which aspects of our models will be embedded or referenced.

Our notes are outlined in the next section with code examples.

## Backend (Day 1 to 3)

We had a strong start as the three of us finished the Backend within the first two days. On Day one, each of us worked on our models, controller and routes. On Day 2, we helped each other test and troubleshoot bugs.

### Models

**From initial notes**:

> **Hike**
>
> - Name | Location (lat/long)| Country | Description | Distance | Difficulty | Duration | Images | Seasons | User images (referenced) | Reviews(embedded) |Ratings (embedded)

> **Group**:
>
> - Group Name | Group Members (referenced))| Events: name, date, duration, selection of hikes (referenced) | image | User Images (embedded) | group chat (embedded)

> **User**:
>
> - Username | Email | Password & validation | Image | Bio | Completed Hikes(embedded) | Favourite Hikes (embedded) | Groups Joined (referenced)

Each model had embedded and referenced data in them. For example, for user model I added favorited and completed hikes as embedded data:

        const favoriteHikesSchema = new mongoose.Schema({
          hike: { type: mongoose.Schema.ObjectId, ref: 'Hike', required: true }
        })

        const completedHikesSchema = new mongoose.Schema({
          hike: { type: mongoose.Schema.ObjectId, ref: 'Hike', required: true }
        })

        const userSchema = new mongoose.Schema({
          username: { type: String, required: true, unique: true, maxlength: 50 },
          email: { type: String, required: true, unique: true },
          password: { type: String, required: true },
          fullName: { type: String },
          bio: { type: String },
          profileImage: { type: String },
          favoritedHikes: [favoriteHikesSchema],
          completedHikes: [completedHikesSchema]
        }
        )

Andy then referenced the favorited & completed hikes in the Hike model to show a logged in user if they had taken any actions with the hike they were viewing:

    hikeSchema
      .virtual('usersFavorited', {
        ref: 'User',
        localField: '_id',
        foreignField: 'favoritedHikes'
      })

**Another example:**

Kuriko created the group model, with members as embedded data:

    const groupMemberSchema = new mongoose.Schema({
      user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
    }, {
      timestamps: true
    })

    const groupSchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      createdMember: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
      members: [ groupMemberSchema ],
      headerImage: { type: String, required: true },
      description: { type: String, required: true, maxlength: 500 },
      userAddedImages: [ userAddedImageSchema ],
      messages: [ groupMessageSchema ],
      events: [ eventSchema ]
    }, {
      timestamps: true
    })

I was then able to reference the Group model, so a profile would include the list of groups joined by the user:

        // * for groups joined by user
        userSchema
          .virtual('joinedGroups', {
            ref: 'Group',
            localField: '_id',
            foreignField: 'members.user'
          })

### Controllers

> Create, Read, Update and Delete Methods were written for:
>
> - Hikes, Reviews and Hike Images
> - Groups, Group Images, Chats, Events, Members
> - Login, Register, Profiles, user favorited Hikes and completed hikes

Since we had a lot of embedded and referenced data, we used array methods such as <code>flatMap</code> and <code>reduce</code> so we didn't populate unneccesary data in a request. For examples, in order to simply get the id of the groups a user has joined, I wrote this inside the <code>userShow</code> function:
  
    if (user.joinedGroups) {
      user.joinedGroups = user.joinedGroups.flatMap(item => item.\_id).reduce((arr,curr)  => {
      if (arr.length === 0) {
      arr.push(curr)
      }
      if (!arr.find(item => item.\_id === curr.\_id)) {
      arr.push(curr)
      }
      return arr
    }, [])

## Frontend (Day 4 to 8)

On day 4, we moved on to Frontend after setting up the React App, installing HTTP proxy middleware and Nodemon, we began our work on Hikes(Andy), Groups (Kuriko) and Users (me!).

For Authentication, I wanted a user to design the process like [Ableton's](https://www.ableton.com/en/login/), which meant:

- The Login and Register options were on the same page and;
- The used for logged in automatically after they registered.

To do this I ensured that the register and login controllers, both returned a token on the backend. On the frontend, once a user registered - I looged them and sent them to the Hikes page:

    handleSubmit = async (event, path) => {
      event.preventDefault()
      try {
        const res = await registerUser(this.state.formData)
        setToken(res.data.token)
        path.push('/hikes')

      } catch (err) {
        this.setState({ errors: err.response.data.errors })

      }
    }

For User Profile, I took the opportunity to explore **conditional rendering**. This meant:

- The user would never the leave the page when they wanted to make edits.
- The page would show different things based on a users actions

For example, on for the Bio on the user profile page:

    <div className="columns is-multiline">
      <h1 className="subtitle column is-full">About me...</h1>

      // * If "profile edit" is enabled, show the Edit Bio button 

      {this.state.edit && <p onClick={this.enableEditBio} className="edit-bio">Edit bio</p>}

      // * If showBio is true (i.e Edit Bio has not been clicked) - Show the Bio

      {this.state.showBio && <div>
      <p className="bio">
      {profile.bio}
      </p></div>}

      // * If showBio is false, then show a text area input wher user can edit the bio:

      {!this.state.showBio &&
        <div className="columns is-multiline">
            <textarea
            className="textarea column"
            value={this.state.bio}
            onChange={this.handleChange}
            name="bio"
            />
            <p className="edit-bio-btn column is-centered" onClick={this.   sendPutRequest}>Submit</p>
        </div>}
    </div>


The user profile page also showed different things based on whether the user was the owner of the profile. Fo example, for completed Hikes, the owner got an option to add Hikes from their profile page:

    <article className="column is-full">
      <h1 className="subtitle">Where I've been...</h1>
      <div className="column columns is-multiline">

      //* if user is the owner, give option to add Hikes:

        {isOwner(profile._id) &&
        _id} handleSubmit={this.addCompHike} /></div>
        }

        <div className="completed">{completedHikes}</div>
      </div>
    </article>




## Wins

## Challenges

### App Pages

On Homepage, search for a country:

<img src="frontend/src/styles/assets/README/hikr-home-italy.png" alt="home-page-miro" width="500" />

Explore Hikes in different views:

<img src="frontend/src/styles/assets/README/hikr-card.png" alt="hike-card-view" width="400" /><img src="frontend/src/styles/assets/README/hikr-list.png" alt="hike-list-view" width="400" /><img src="frontend/src/styles/assets/README/hikr-map.png" alt="hike-map-view" width="400" />

Login or register to unlock more features and view your profile:

<img src="frontend/src/styles/assets/README/login.png" alt="login-page" width="400" /> <img src="frontend/src/styles/assets/README/profile.png" alt="profile-page" width="400" />

View Hike in detail, leave rating & reviews, add to favorites:

<img src="frontend/src/styles/assets/README/hike-show-top.png" alt="hike-show-top" width="400" /> <img src="frontend/src/styles/assets/README/hike-show-bottom.png" alt="hike-show-bottom" width="400" />

Join or create a group:

<img src="frontend/src/styles/assets/README/group.png" alt="group-page" width="500" /> <img src="frontend/src/styles/assets/README/add-group.png" alt="add-group" width="500" />

Explore other Hikr Profiles:

<img src="frontend/src/styles/assets/README/profile-index.png" alt="hikr-community" width="500" />

## Future Improvements
