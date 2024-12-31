const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.contoller');

//result_12th
router.post('/upload/result', dashboardController.uploadDocument);
//Aadhar
router.post('/upload/aadhar', dashboardController.uploadDocument);
//pan card
router.post('/upload/pan',dashboardController.uploadDocument);
//mhtcetresult 
router.post('/upload/mhtcet',dashboardController.uploadDocument);
//Admission Card
router.post('/upload/admission',dashboardController.uploadDocument);
//CAP card
router.post('/upload/cap',dashboardController.uploadDocument);
//Domicile Certificate 
router.post('/upload/domicile', dashboardController.uploadDocument);
//Birth Certificate
router.post('/upload/birth', dashboardController.uploadDocument);
//leaving Certificate
router.post('/upload/leaving', dashboardController.uploadDocument);


router.get('/getDocuments', dashboardController.getDocuments);
module.exports = router;