const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Admin
router.get('/', protect, adminOnly, asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(users.map(u => ({ ...u, _id: u.id, role: u.role.toLowerCase() })));
}));

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Admin
router.delete('/:id', protect, adminOnly, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user.role === 'ADMIN') {
    res.status(400);
    throw new Error('Cannot delete admin users');
  }
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ message: 'User deleted', id: req.params.id });
}));

module.exports = router;
