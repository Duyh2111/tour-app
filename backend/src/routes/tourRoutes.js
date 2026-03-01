const express = require('express');
const router = express.Router();
const {
  getTours, getTour, createTour, updateTour, deleteTour, getFeaturedTours,
} = require('../controllers/tourController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/featured', getFeaturedTours);
router.get('/', getTours);
router.get('/:id', getTour);

// Admin routes
router.post('/', protect, adminOnly, upload.single('image'), createTour);
router.put('/:id', protect, adminOnly, upload.single('image'), updateTour);
router.delete('/:id', protect, adminOnly, deleteTour);

module.exports = router;
