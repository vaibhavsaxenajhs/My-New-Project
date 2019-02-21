var express             = require('express');
const router            = express.Router();
const userService       = require('../customer/services/userServices')
const userController    = require ('../customer/controller/userController');
const userValidator     = require('../customer/validator/userValidator')
const userAuthorization = require('../Authorization/userAuthorization')

router.post('/signup',                userValidator.inputValidateFunction,             userAuthorization.passwordToHashFunction,  userService.addSignupFunction )
router.post('/login',                 userAuthorization.checkCredentialsFunction,      userAuthorization.generateTokenFunction,   userService.fetchLoginDetails)
router.post('/create-booking',        userAuthorization.validateTokenFunction,         userController.createBookingFunction)
router.get('/view-bookings',          userAuthorization.validateTokenFunction )
router.post('./booking-complete',     userAuthorization.validateTokenFunction ,        userController.completeBookingFunction       )

module.exports=router;