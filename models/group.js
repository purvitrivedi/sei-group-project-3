const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  hike: { type: mongoose.Schema.ObjectId, ref: 'Hike', required: true },
  participants: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const groupMessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const userAddedImageSchema = new mongoose.Schema({
  images: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

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

groupSchema.plugin(require('mongoose-unique-validator'))
module.exports = mongoose.model('Group', groupSchema)

// updated readme
// - groupName
// - groupMembers - referenced (to user)
// - headerImage
// - user added images - embedded
// - group messages - embedded

// - events - eventSchema -- (add new event - date, time, description, participants, selection of hikes) - referenced