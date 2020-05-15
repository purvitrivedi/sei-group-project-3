const User = require('../models/user')


// * for URL: /profiles -- everyone can see

async function userIndex(req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.json(err)
  }
}



//* for URL: profiles/:id --

async function userShow(req, res) {
  const userId = req.params.id
  try {
    const user = await (await User.findById(userId)
      .populate('favoritedHikes')
      .populate('completedHikes')
    )
    if (!user) throw new Error()
    res.status(200).json(user)
  } catch (err) {
    res.json(err)
  }
}


// * To update user (to be used with SecureRoute) 

async function userUpdate(req, res) {
  const userId = req.params.id
  try {
    const userToUpdate = await User.findById(userId)
    if (!userToUpdate) throw new Error()

    if (!userToUpdate.user.equals(req.currentUser._id)) throw new Error()

    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()

    res.status(202).json(userToUpdate)
  } catch (err) {
    res.json(err)
  }
}


// * URL: /profiles/:userId/favourites

async function userFavoriteHikeCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const userId = req.params.userId

    const user = await User.findById(userId)
    if (!user) throw new Error()

    user.favoritedHikes.push(req.body)
    await user.save()

    res.status(201).json(user)
  } catch (err) {
    res.json(err)
  }
}

//* DELETE URL: /profiles/:id/favorites/:favId

async function userFavoriteHikeDelete(req, res) {
  try {
    const userId = req.params.id
    const favId = req.params.favId

    const user = await User.findById(userId)
    if (!user) throw new Error()

    const favHikeToRemove = user.favoritedHike.id(favId)
    if (!favHikeToRemove) throw new Error()

    if (!favHikeToRemove.user.equals(req.currentUser._id)) throw new Error()

    await favHikeToRemove.remove()
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.json(err)
  }
}


// * URL: /profiles/:userId/completed

async function userCompletedHikeCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const userId = req.params.userId

    const user = await User.findById(userId)
    if (!user) throw new Error()

    user.completedHikes.push(req.body)
    await user.save()

    res.status(201).json(user)
  } catch (err) {
    res.json(err)
  }
}

//* DELETE URL: /profiles/:id/completed/:compId

async function userCompletedHikeDelete(req, res) {
  try {
    const userId = req.params.id
    const compId = req.params.compId

    const user = await User.findById(userId)
    if (!user) throw new Error()

    const compHikeToRemove = user.completedHike.id(compId)
    if (!compHikeToRemove) throw new Error()

    if (!compHikeToRemove.user.equals(req.currentUser._id)) throw new Error()

    await compHikeToRemove.remove()
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  userIndex: userIndex,
  userShow: userShow,
  userUpdate: userUpdate,
  createFavHike: userFavoriteHikeCreate,
  deleteFavHike: userFavoriteHikeDelete,
  createCompHike: userCompletedHikeCreate,
  deleteCompHike: userCompletedHikeDelete
}








