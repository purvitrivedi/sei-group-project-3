<<<<<<< HEAD
console.log('hello world routes')
=======
const router = require('express').Router()
const hikes = require('../controllers/hikes')
const auth = require('../controllers/auth')
const groups = require('../controllers/groups')
const users = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')


// * hikes

router.route('/hikes')
  .get(hikes.index)
  .post(secureRoute, hikes.create)

router.route('/hikes/:id')
  .get(hikes.show)
  .put(secureRoute, hikes.update)
  .delete(secureRoute, hikes.delete)

router.route('/hikes/:id/reviews')
  .post(secureRoute, hikes.createReview)

router.route('/hikes/:id/reviews/:reviewId')
  .delete(secureRoute, hikes.deleteReview)

router.route('/hikes/:id/user-images')
  .post(secureRoute, hikes.createUserImage)

router.route('/hikes/:id/user-images/:userImageId')
  .delete(secureRoute, hikes.deleteUserImage)

router.route('/hikes/:id/ratings')
  .post(secureRoute, hikes.createRating)

router.route('/hikes/:id/ratings/:ratingId')
  .put(secureRoute, hikes.updateRating)


// * Groups

router.route('/groups')
  .get(groups.index)
  .post(secureRoute, groups.create)

router.route('/groups/:id')
  .get(groups.show)
  .put(secureRoute, groups.update)
  .delete(secureRoute, groups.delete)

router.route('/groups/:id/user-images')
  .post(secureRoute, groups.createGroupImage)

router.route('/groups/:id/user-images/:userImageId')
  .delete(secureRoute, groups.deleteGroupImage)

router.route('/groups/:id/messages')
  .post(secureRoute, groups.createMessage)

router.route('/groups/:id/messages/:messageId')
  .delete(secureRoute, groups.deleteMessage)


router.route('/groups/:id/events')
  .post(secureRoute, groups.createEvent)

router.route('/groups/:id/events/:eventId')
  .delete(secureRoute, groups.deleteEvent)
  .put(secureRoute, groups.updateEvent)


//* auth

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)


// * Users

router.route('/profiles')
  .get(secureRoute, users.userIndex)

router.route('/profiles/:id')
  .get(secureRoute, users.userShow)
  .put(secureRoute, users.userUpdate)

router.route('/profiles/:id/favorites')
  .post(secureRoute, users.createFavHike)

router.route('/profiles/:id/favorites/favId')
  .delete(secureRoute, users.deleteFavHike)


router.route('/profiles/:id/completed')
  .post(secureRoute, users.createCompHike)

router.route('/profiles/:id/completed/compId')
  .delete(secureRoute, users.deleteCompHike)


module.exports = router
>>>>>>> 5609fb9e3338afe034c7d6146734cc56bc0d1095
