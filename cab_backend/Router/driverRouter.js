var express                = require('express');
const router               = express.Router();
const driverService        = require('../driver/services/driverServices')
const driverController     = require ('../driver/controller/driverController');
const driverValidator      = require('../driver/validator/driverValidator')
const driverAuthorization  = require('../Authorization/driverAuthorization')

router.post('/signup',     driverValidator.inputValidationFunction,              driverAuthorization.passwordToHash,               driverService.insertDriverValues)       
router.post('/login',      driverAuthorization.checkCredentialFunction,          driverAuthorization.hashToPassword,               driverAuthorization.generateToken,                 driverController.loginSuccessFunction)
//router.post('/getbook',);

module.exports= router
