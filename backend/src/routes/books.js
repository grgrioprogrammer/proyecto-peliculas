const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

// Todas las rutas protegidas por el middleware auth
router.get('/', auth, bookController.getBooks);
router.post('/', auth, bookController.addBook);
router.patch('/:id/read', auth, bookController.markAsRead);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
