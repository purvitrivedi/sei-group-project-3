const Hike = require('../models/hike')



// show all hikes
//* /hikes

async function hikesIndex(req, res) {
  try {
    const hikes = await Hike.find().populate('user')
    if (!hikes) throw new Error()
    res.status(200).json(hikes)
  } catch (err) {
    res.json(err)
  }
}



// create a new hike if you are a registered and logged in user
//* /hikes

async function hikesCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const createdHike = await Hike.create(req.body)
    res.status(201).json(createdHike)
  } catch (err) {
    res.json(err)
  }
}



// show a single hike by its ID
//* /hikes/:id

async function hikesShow(req, res) {
  const hikeId = req.params.index
  try {
    const hike = await Hike.findById(hikeId).populate('user')
    if (!hike) throw new Error()
    res.status(200).json(hike)
  } catch (err) {
    res.json(err)
  }
}



// edit a single hike found by its id if you are a registered and logged in user and you created the hike
//* /hikes/:id

async function hikesUpdate(req, res) {
  const hikeId = req.params.id
  try {
    const hike = await Hike.findById(hikeId)
    if (!hike) throw new Error('Not Found')
    if (!hike.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    Object.assign(hike, req.body)
    await hike.save()
    res.status(202).json(hike)
  } catch (err) {
    res.json(err)
  }
}



// delete a single hike found by its id if you are the user that created the hike
//* /hikes/:id

async function hikesDelete(req, res) {
  const hikeId = req.params.id
  try {
    const hikeToDelete = await Hike.findById(hikeId)
    if (!hikeToDelete) throw new Error('Not Found')
    if (!hikeToDelete.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await hikeToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}



// add a review to the hike if you are a registered and logged in user
//* /hikes/:id/review

async function hikesReviewCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const hikeId = req.params.id
    const hike = await Hike.findById(hikeId).populate('user')
    if (!hike) throw new Error('Not Found')
    hike.reviews.push(req.body)
    await hike.save()
    res.status(201).json(hike)
  } catch (err) {
    res.json(err)
  }
}



// delete a review if you are the creator of the review
//* /hikes/:id/review/:reviewId

async function hikesReviewDelete(req, res, next) {
  try {
    const hikeId = req.params.id
    const reviewId = req.params.reviewId
    const hike = await Hike.findById(hikeId)
    if (!hike) throw new Error('Not Found')

    const reviewToRemove = hike.reviews.id(reviewId)
    if (!reviewToRemove) throw new Error('Not Found')
    if (!reviewToRemove.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await reviewToRemove.remove()
    await hike.save()
    res.status(204).json(hike)
  } catch (err) {
    next(err)
  }
}



// add an image to the hike if you are a registered and logged in user
//* /hikes/:id/user-images/

async function hikesUserImageCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const hikeId = req.params.id
    const hike = await Hike.findById(hikeId).populate('user')
    if (!hike) throw new Error('Not Found')
    hike.imagesUser.push(req.body)
    await hike.save()
    res.status(201).json(hike)
  } catch (err) {
    res.json(err)
  }
}



// delete an image if you are the creator of the image
//* /hikes/:id/user-images/:imageId

async function hikesUserImageDelete(req, res, next) {
  try {
    const hikeId = req.params.id
    const imageId = req.params.imageId
    const hike = await Hike.findById(hikeId)
    if (!hike) throw new Error('Not Found')

    const imageToRemove = hike.images.id(imageId)
    if (!imageToRemove) throw new Error('Not Found')
    if (!imageToRemove.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await imageToRemove.remove()
    await hike.save()
    res.status(204).json(hike)
  } catch (err) {
    next(err)
  }
}



// add a rating from 1 to 5 to the hike if you are a registered and logged in user
//* /hikes/:id/ratings/

async function hikesUserRatingCreate(req, res) {
  try {
    req.body.user = req.currentUser
    const hikeId = req.params.id
    const hike = await Hike.findById(hikeId).populate('user')
    if (!hike) throw new Error('Not Found')
    hike.ratings.push(req.body)
    await hike.save()
    res.status(201).json(hike)
  } catch (err) {
    res.json(err)
  }
}



//updating the rating
//* /hikes/:id/ratings/:ratingId

async function hikesUserRatingUpdate(req, res) {
  const hikeId = req.params.id
  const ratingId = req.params.ratingId
  try {
    const hike = await Hike.findById(hikeId)
    if (!hike) throw new Error('Not Found')
    const ratingToUpdate = hike.ratings.id(ratingId)
    if (!ratingToUpdate) throw new Error('Not Found')
    if (!ratingToUpdate.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    Object.assign(ratingToUpdate, req.body)
    await ratingToUpdate.save()
    res.status(202).json(ratingToUpdate)
  } catch (err) {
    res.json(err)
  }
}



//exporting controllers for use in the router

module.exports = {
  index: hikesIndex,
  create: hikesCreate,
  show: hikesShow,
  update: hikesUpdate,
  delete: hikesDelete,
  createReview: hikesReviewCreate,
  deleteReview: hikesReviewDelete,
  createUserImage: hikesUserImageCreate,
  deleteUserImage: hikesUserImageDelete,
  createRating: hikesUserRatingCreate,
  updateRating: hikesUserRatingUpdate
}