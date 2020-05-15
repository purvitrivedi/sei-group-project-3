const Group = require('../models/group')
const { notFound, unauthorized } = require('../lib/errorMessages')

//* Group
// GET
// URL api/groups
async function groupsIndex(req, res, next) {
  try {
    const groups = await Group.find().populate('members.user').populate('createdMember')
    if (!groups) throw new Error(notFound)
    res.status(200).json(groups)
  } catch (err) {
    next(err)
  }
}

// SHOW
// URL api/groups/:id
async function groupsShow(req, res, next) { 
  try {
    const groupId = req.params.id
    const group = await Group.findById(groupId)
      .populate('members')
      .populate('createdMember')
      .populate('messages')
      .populate('userAddedImages')
      .populate('events')
    if (!group) throw new Error(notFound)
    res.status(200).json(group)
  } catch (err) {
    next(err)
  }
}

// POST
// URL api/groups
async function groupsCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const createdGroup = await Group.create(req.body)
    res.status(201).json(createdGroup)
  } catch (err) {
    next(err)
  }
}

// PUT
// URL api/groups/:id
async function groupsUpdate(req, res, next) {
  try {
    const groupId = req.params.id
    const group = await (await Group.findById(groupId))
      .populate('members')
      .populate('createdMember')
      .populate('messages')
      .populate('userAddedImages')
      .populate('events')
    if (!group) throw new Error(notFound)
    if (!group.createdMember.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(group, req.body)
    await group.save()
    res.status(202).json(`Edited: ${group}`)
  } catch (err) {
    next(err)
  }
}

// DELETE
// URL api/groups/:id
async function groupsDelete(req, res, next) {
  const groupId = req.params.id
  try {
    const groupToDelete = await Group.findById(groupId)
    if (!groupToDelete) throw new Error(notFound)
    if (!groupToDelete.createdMember.equals(req.currentUser._id)) throw new Error(unauthorized)
    await groupToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


//* UserAddedImages
// POST
// URL = api/groups/:id/userImages
async function userAddedImageCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const groupId = req.params.id
    const group = await Group.findById(groupId).populate('userAddedImages.user')
    if (!group) throw new Error(notFound)
    group.userAddedImages.push(req.body)
    await group.save()
    res.status(201).json(group)
  } catch (err) {
    next(err)
  }
}


// DELETE
// URL = api/groups/:id/userImages/:userImageId
async function userAddedImageDelete(req, res, next) {
  try {
    // find group
    const groupId = req.params.id
    const userAddedImageId = req.params.userAddedImageId
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    // delete
    const imageToRemove = group.userAddedImages.id(userAddedImageId)
    const adminId = group.createdMember._id
    if (!imageToRemove) throw new Error(notFound)
    if (!imageToRemove.user.equals(req.currentUser._id) 
      || !adminId.equals(req.currentUser._id)) { // admin has right to del msg
      throw new Error(unauthorized) 
    }
    await imageToRemove.remove()
    await group.save()
    res.sendStatus(204).json(group)
  } catch (err) {
    next(err)
  }
}

//* Messages
// POST
// URL = api/groups/:id/messages
async function groupsMessageCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const groupId = req.params.id
    const group = await Group.findById(groupId)
      .populate('messages.user')
    if (!group) throw new Error(notFound)
    group.messages.push(req.body)
    await group.save()
    res.status(201).json(group)
  } catch (err) {
    next(err)
  }
}

// DELETE
// URL = api/groups/:id/messages/:messageId
async function groupsMessageDelete(req, res, next) {
  try {
    // find group
    const groupId = req.params.id
    const messageId = req.params.messageId
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    // delete
    const messageToRemove = group.messages.id(messageId)
    const adminId = group.createdMember._id
    if (!messageToRemove) throw new Error(notFound)
    if (!messageToRemove.user.equals(req.currentUser._id) 
      || !adminId.equals(req.currentUser._id)) { // admin has right to del msg
      throw new Error(unauthorized) 
    }
    await messageToRemove.remove()
    await group.save()
    res.sendStatus(204).json(group)
  } catch (err) {
    next(err)
  }
}

//* Event
// POST
// URL = api/groups/:id/events
async function groupsEventCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const groupId = req.params.id
    const group = await Group.findById(groupId)
      .populate('events.hike')
      .populate('events.participants')
    if (!group) throw new Error(notFound)
    group.events.push(req.body)
    await group.save()
    res.status(201).json(group)
  } catch (err) {
    next(err)
  }
}

// PUT
// URL = api/groups/:id/events/:eventId
async function groupsEventUpdate(req, res, next) {
  try {
    // find group
    const groupId = req.params.id
    const eventId = req.params.eventId
    const group = await (await Group.findById(groupId))
    if (!group) throw new Error(notFound)

    // update
    const eventToUpdate = group.events.id(eventId)
    const adminId = group.createdMember._id
    if (!eventToUpdate) throw new Error(notFound)
    if (!eventToUpdate.user.equals(req.currentUser._id)
      || !adminId.equals(req.currentUser._id)) { // admin has right to del msg
      throw new Error(unauthorized) 
    }
    Object.assign(group.events, req.body)
    await group.save()
    res.status(202).json(group)
  } catch (err) {
    next(err)
  }
}

// DELETE
// URL = api/groups/:id/events/:eventId
async function groupsEventDelete(req, res, next) {
  try {
    // find group
    const groupId = req.params.id
    const eventId = req.params.eventId
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    // delete
    const eventToRemove = group.events.id(eventId)
    const adminId = group.createdMember._id
    if (!eventToRemove) throw new Error(notFound)
    if (!eventToRemove.user.equals(req.currentUser._id) 
      || !adminId.equals(req.currentUser._id)) { // admin has right to del msg
      throw new Error(unauthorized) 
    }
    await eventToRemove.remove()
    await group.save()
    res.sendStatus(204).json(group)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: groupsIndex,
  show: groupsShow,
  create: groupsCreate,
  update: groupsUpdate,
  delete: groupsDelete,

  //userAddedImages
  createGroupImage: userAddedImageCreate,
  deleteGroupImage: userAddedImageDelete,

  // messages
  createMessage: groupsMessageCreate,
  deleteMessage: groupsMessageDelete,

  // events
  createEvent: groupsEventCreate,
  updateEvent: groupsEventUpdate,
  deleteEvent: groupsEventDelete
}