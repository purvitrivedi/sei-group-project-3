const User = require('../models/user')
const { notFound, unauthorized } = require('../lib/errorMessages')


// * for URL: /profiles -- everyone can see

async function userIndex(req, res, next) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}


//* for URL: profiles/:id --

async function userShow(req, res, next) {
  const userId = req.params.id
  try {
    const user = await (await User.findById(userId)
      .populate('favoritedHikes')
      .populate('completedHikes')
    )
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}


// * To update user (to be used with SecureRoute) 

async function userUpdate(req, res, next) {
  const userId = req.params.id
  try {
    const userToUpdate = await User.findById(userId)
    if (!userToUpdate) throw new Error(notFound)

    if (!userToUpdate.user.equals(req.currentUser._id)) throw new Error(unauthorized)

    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()

    res.status(202).json(userToUpdate)
  } catch (err) {
    next(err)
  }
}


// * URL: /profiles/:id/favourites

async function userFavoriteHikeCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const userId = req.params.id

    const user = await User.findById(userId)
    if (!user) throw new Error(notFound)

    user.favoritedHikes.push(req.body)
    await user.save()

    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

//* DELETE URL: /profiles/:id/favorites/:favId

async function userFavoriteHikeDelete(req, res, next) {
  try {
    const userId = req.params.id
    const favId = req.params.favId

    const user = await User.findById(userId)
    if (!user) throw new Error(notFound)

    const favHikeToRemove = user.favoritedHike.id(favId)
    if (!favHikeToRemove) throw new Error(notFound)

    if (!favHikeToRemove.user.equals(req.currentUser._id)) throw new Error(unauthorized)

    await favHikeToRemove.remove()
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}


// * URL: /profiles/:userId/completed

async function userCompletedHikeCreate(req, res, next) {
  try {
    req.body.user = req.currentUser
    const userId = req.params.userId

    const user = await User.findById(userId)
    if (!user) throw new Error(notFound)

    user.completedHikes.push(req.body)
    await user.save()

    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

//* DELETE URL: /profiles/:id/completed/:compId

async function userCompletedHikeDelete(req, res, next) {
  try {
    const userId = req.params.id
    const compId = req.params.compId

    const user = await User.findById(userId)
    if (!user) throw new Error(notFound)

    const compHikeToRemove = user.completedHike.id(compId)
    if (!compHikeToRemove) throw new Error(notFound)

    if (!compHikeToRemove.user.equals(req.currentUser._id)) throw new Error(unauthorized)

    await compHikeToRemove.remove()
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
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