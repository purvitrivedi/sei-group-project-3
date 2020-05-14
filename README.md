# sei-group-project-3
Main repo for SEI Group Project 3
Andy Bradshaw
Purvi Trivedi
Kuriko IWAI


### Hikr

## Backend 

### Database

- Users
- Groups
- Hikes

## Pages
Home - has button in the middle 
Hike Index - list of filtered 
Show Hike
User Profile
Login/Register
Group index
Group Profile

### Third party Info
- Fake users ?
- Hikes ?

### Models
Users
- username
- email
- password
- profile image
- biography
- completed hikes - embedded
- favourited hikes - embedded
(group members, user added images, user created hike)

Groups
- group name
- group members - referenced (to user)
- list of events/meetups - form (add new event - date, time, selection of hikes)
- imageHeader - 
- user added images - embedded
- group messages - embedded

Hikes
- name
- location (lat/long)
- country
- description
- distance
- difficulty rating - 
- time to complete
- images 
- user added images - referenced (to user)
- comments - embedded
- stars out of 5 - embedded
- approprite seasons
- user created hike - referenced (to user)


### Controllers

User 
- Create user
- Read SingleUser
- Update
- Delete

Groups
- Create Group
- Read
- Update
- Delete
- comment/messages
- add new event

Hikes
- Create 
- Find by Id
- Update
- Delete
- Comment
- Add Favourite
- Add image


### Routes
