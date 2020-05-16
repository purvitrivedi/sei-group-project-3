const Group = require('../models/group')
const User = require('../models/user')
const { notFound, unauthorized } = require('../lib/errorMessages')

//* Group
// GET
// URL api/groups
async function groupsIndex(req, res, next) {
  try {
    const groups = await Group.find()
      .populate('members.user')
      .populate('createdMember')
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
      .populate('members.user')
      .populate('createdMember')
      .populate('messages.user')
      .populate('userAddedImages.user')
      // .populate('events.hike')
      .populate('events.participants')
      .populate('events.createdMember')
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
    req.body.createdMember = req.currentUser
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
    const group = await Group.findById(groupId)
      .populate('members.user')
      .populate('createdMember')
      .populate('messages.user')
      .populate('userAddedImages.user')
      // .populate('events.hike')
      .populate('events.participants')
      .populate('events.createdMember')
    if (!group) throw new Error(notFound)
    if (!group.createdMember.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(group, req.body)
    await group.save()
    res.status(202).json(group)
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
// URL = api/groups/:id/user-images
async function userAddedImageCreate(req, res, next) {
  try {
    const groupId = req.params.id
    const group = await Group.findById(groupId).populate('userAddedImages.user')
    if (!group) throw new Error(notFound)

    req.body.user = req.currentUser
    const adminId = group.createdMember._id
    if (!group.members.some(member => member.user._id.equals(req.body.user._id))
      && !adminId.equals(req.body.user._id) ) { 
      throw new Error(unauthorized)
    } // only group members or admin can add imgs

    group.userAddedImages.push(req.body)
    await group.save()
    res.status(201).json(group)
  } catch (err) {
    next(err)
  }
}

// DELETE
// URL = api/groups/:id/user-images/:userImageId
async function userAddedImageDelete(req, res, next) {
  try {
    // find group
    const groupId = req.params.id
    const userAddedImageId = req.params.userAddedImageId
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    // delete
    const imageToRemove = group.userAddedImages.id(userAddedImageId)
    if (!imageToRemove) throw new Error(notFound)

    const adminId = group.createdMember._id
    if (!imageToRemove.user.equals(req.currentUser._id) 
      && !adminId.equals(req.currentUser._id)) { // admin has right to del msg
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
async function groupsMessageCreate(req, res, next) {
  try {
    const groupId = req.params.id
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)
 
    req.body.user = req.currentUser
    const adminId = group.createdMember._id
    if (!group.members.some(member => member.user._id.equals(req.body.user._id))
      && !adminId.equals(req.body.user._id) ) {
      throw new Error(unauthorized)
    } // only group members or admin can send msg

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
    const groupId = req.params.id
    const messageId = req.params.messageId
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    const messageToRemove = group.messages.id(messageId)
    if (!messageToRemove) throw new Error(notFound)

    req.body.user = req.currentUser
    const adminId = group.createdMember._id
    if (!group.members.some(member => member.user._id.equals(req.body.user._id))
      && !adminId.equals(req.body.user._id) ) {
      throw new Error(unauthorized)
    } // only group members or admin can delete msg

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
    const groupId = req.params.id
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    // if (group.events.some( event =>  event.eventName === req.body.eventName )) throw new Error('Already exist. Try another event name!') //unique event name 

    req.body.createdMember = req.currentUser
    const adminId = group.createdMember._id
    if (!group.members.some(member => member.user._id.equals(req.body.createdMember._id))
      && !adminId.equals(req.body.createdMember._id) ) {
      throw new Error(unauthorized)
    } // only group members or admin can send msg

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
    const groupId = req.params.id
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    const eventId = req.params.eventId
    const eventToUpdate = group.events.id(eventId)
    if (!eventToUpdate) throw new Error(notFound)

    const adminId = group.createdMember._id
    if (!eventToUpdate.createdMember._id.equals(req.currentUser._id)
      && !adminId.equals(req.currentUser._id)) { // admin has right to update
      throw new Error(unauthorized) 
    }

    if (req.body.participants
      && !group.members.some( member => member.user._id.equals(req.body.participants._id)) ) {
      throw new Error('Participant need to join the group')
    } // only group members can participate events
    
    Object.assign(eventToUpdate, req.body)
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
    if (!eventToRemove) throw new Error(notFound)

    const adminId = group.createdMember._id
    if (!eventToRemove.createdMember.equals(req.currentUser._id) 
      && !adminId.equals(req.currentUser._id)) { // admin has right to del
      throw new Error(unauthorized) 
    }
    await eventToRemove.remove()
    await group.save()
    res.sendStatus(204).json(group)
  } catch (err) {
    next(err)
  }
}


//* Group memebers
// POST
// URL = api/groups/:id/members
// memo - only currentUser can become member
async function groupsMemberCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const groupId = req.params.id
    const group = await Group.findById(groupId).populate('members.user')
    if (!group) throw new Error(notFound)
   
    // const user = await User.findById(req.body.user._id)
    if (group.members.some( member =>  member.user._id.equals(req.body.user._id))) throw new Error('Already exist') //avoid double reg.

    group.members.push(req.body)
    await group.save()

    // req.body.user.groupsJoined.push(groupId)
    // await user.save()

    res.status(201).json(group)
  } catch (err) {
    next(err)
  }
}

// DELETE
// URL = api/groups/:id/members/memberId
async function groupsMemberDelete(req, res, next) {
  try {
    // find group
    const groupId = req.params.id
    const group = await Group.findById(groupId)
    if (!group) throw new Error(notFound)

    // delete
    const memberId = req.params.memberId
    const memberToRemove = group.members.id(memberId)
    if (!memberToRemove) throw new Error(notFound)

    const adminId = group.createdMember._id
    if (!memberToRemove.user.equals(req.currentUser._id) 
      && !adminId.equals(req.currentUser._id)) { // admin has right to del msg
      throw new Error(unauthorized) 
    }
    
    await memberToRemove.remove()
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
  deleteEvent: groupsEventDelete,

  // members
  createMember: groupsMemberCreate,
  deleteMember: groupsMemberDelete
}