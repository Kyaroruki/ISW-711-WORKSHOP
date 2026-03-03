const express = require('express');
const router = express.Router();
const {professorPost, professorGet, professorPut, professorDelete} = require('../controllers/Professor');

router.post('/professor', professorPost);
router.get('/professor', professorGet);
router.put('/professor', professorPut);
router.delete('/professor', professorDelete);

module.exports = router;