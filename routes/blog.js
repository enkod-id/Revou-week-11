const path = require('path');
const express = require('express');
const blogController = require('../controllers/blogController');
const authorizationMiddleware = require('../middleware/authorization-middleware');
const router = express.Router();

router.get('/', blogController.getAlldata);
router.get('/blog/:id', blogController.getById);
router.post('/blog/create', authorizationMiddleware, blogController.blogCreate);
router.put('/blog/update/:id', blogController.blogUpdate);
router.delete('/blog/delete/:id', blogController.blogDelete);

module.exports = router;