const Group = require('../models/group')

// GET
async function groupsIndex(req, res, next) {
  try {
    const groups = await Group.find().populate('user')
  } catch (err) {

  }
}

// POST 

// PUT

// Delete

// comment/messages
// add new event