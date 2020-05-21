const mongoose = require('mongoose')
const Hike = require('../models/hike')
const User = require('../models/user')
// const Group = require('../models/group')
const { dbURI } = require('../config/environment')
const hikeData = require('./data/hikes')
const userData = require('./data/users')
// const groupData = require('./data/groups')

const faker = require('faker')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {


    if (err) return console.log(err)

    try {
      await db.dropDatabase()

      const users = await User.create(userData)

      for (let i = 0; i < 300; i++) {
        const name = faker.name.findName()
        const image = faker.image.avatar()
        users.push({
          username: name.split(' ')[0].toLowerCase(),
          email: `${name.split(' ').join('').toLowerCase()}@email.com`,
          password: 'pass',
          passwordConfirmation: 'pass',
          fullName: name,
          profileImage: image

        })
      }


      const createdUsers = await User.create(users)

      console.log(`${createdUsers.length} Users created`)

      const hikesWithUsers = hikeData.map(hike => {
        return { ...hike, user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id }
      })

      // const groupsWithMembers = groupData.map(group => {
      //   return { ...group, member: members[Math.floor(Math.random() * members.length)]._id }
      // })

      const hikes = await Hike.create(hikesWithUsers)
      console.log(`${'⛰️'.repeat(hikes.length)} Hikes created`)

    } catch (err) {
      console.log(err)
    }
    await mongoose.connection.close()
    console.log('Cheers Then!')
  })




