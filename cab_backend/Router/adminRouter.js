var express              = require('express');
const router             = express.Router();
const adminController    = require ('../admin/controller/adminController');
const adminAuthorization = require('../Authorization/adminAuthorization');

router.post('/login',         adminAuthorization.hashToPasswordFunction, adminController.adminLoginDetails)
router.post('/view-drivers',  adminAuthorization.hashToPasswordFunction, adminController.viewDriversFunction)
router.post('/view-booking',  adminAuthorization.hashToPasswordFunction, adminController.viewUserDetailsFunction)
router.post('/driver-assign', adminAuthorization.hashToPasswordFunction, adminController.assignDriverFunction)
module.exports= router