const express = require('express');
const router = express.Router();
const {coursePost, courseGet, coursePut, courseDelete} = require('../controllers/Courses');

router.post('/course', coursePost);
router.get('/course', courseGet);
router.put('/course', coursePut);
router.delete('/course', courseDelete);

module.exports = router;
