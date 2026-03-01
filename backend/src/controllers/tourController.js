const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');
const { cloudinary } = require('../config/cloudinary');

// Helper: build Prisma where clause from query params
const buildWhere = ({ search, category, difficulty, minPrice, maxPrice, featured }) => {
  const where = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (category && category !== 'All') where.category = category;
  if (difficulty && difficulty !== 'All') where.difficulty = difficulty;
  if (featured === 'true') where.featured = true;

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  return where;
};

// Helper: convert sort string to Prisma orderBy
const buildOrderBy = (sort = '-createdAt') => {
  const map = {
    '-createdAt': { createdAt: 'desc' },
    'createdAt': { createdAt: 'asc' },
    'price': { price: 'asc' },
    '-price': { price: 'desc' },
    '-rating': { rating: 'desc' },
    'duration': { duration: 'asc' },
    '-duration': { duration: 'desc' },
  };
  return map[sort] || { createdAt: 'desc' };
};

// Helper: format tour for response (match old MongoDB _id format)
const formatTour = (tour) => ({
  ...tour,
  _id: tour.id,
  createdBy: tour.createdBy ? { ...tour.createdBy, _id: tour.createdBy.id } : null,
});

// @desc    Get all tours (search, filter, pagination)
// @route   GET /api/tours
// @access  Public
const getTours = asyncHandler(async (req, res) => {
  const { page = 1, limit = 9, sort = '-createdAt', ...filterParams } = req.query;
  const where = buildWhere(filterParams);
  const orderBy = buildOrderBy(sort);
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [total, tours] = await Promise.all([
    prisma.tour.count({ where }),
    prisma.tour.findMany({
      where,
      orderBy,
      skip,
      take: parseInt(limit),
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
      },
    }),
  ]);

  res.json({
    tours: tours.map(formatTour),
    page: parseInt(page),
    totalPages: Math.ceil(total / parseInt(limit)),
    total,
  });
});

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
const getTour = asyncHandler(async (req, res) => {
  const tour = await prisma.tour.findUnique({
    where: { id: req.params.id },
    include: { createdBy: { select: { id: true, name: true, email: true } } },
  });

  if (!tour) {
    res.status(404);
    throw new Error('Tour not found');
  }

  res.json(formatTour(tour));
});

// @desc    Get featured tours
// @route   GET /api/tours/featured
// @access  Public
const getFeaturedTours = asyncHandler(async (req, res) => {
  const tours = await prisma.tour.findMany({
    where: { featured: true },
    orderBy: { rating: 'desc' },
    take: 6,
  });

  res.json(tours.map(formatTour));
});

// @desc    Create tour
// @route   POST /api/tours
// @access  Admin
const createTour = asyncHandler(async (req, res) => {
  const {
    title, description, price, duration, maxGroupSize,
    difficulty, location, category, highlights, included,
    notIncluded, featured,
  } = req.body;

  // Parse arrays (sent as JSON string from FormData)
  const parseArr = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter(Boolean);
    try { return JSON.parse(val).filter(Boolean); } catch { return []; }
  };

  const data = {
    title,
    description,
    price: parseFloat(price),
    duration: parseInt(duration),
    maxGroupSize: parseInt(maxGroupSize),
    difficulty,
    location,
    category,
    featured: featured === 'true' || featured === true,
    highlights: parseArr(highlights),
    included: parseArr(included),
    notIncluded: parseArr(notIncluded),
    createdById: req.user.id,
  };

  if (req.file) {
    data.image = req.file.path;
    data.imagePublicId = req.file.filename;
  }

  const tour = await prisma.tour.create({ data });
  res.status(201).json(formatTour(tour));
});

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Admin
const updateTour = asyncHandler(async (req, res) => {
  const existing = await prisma.tour.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    res.status(404);
    throw new Error('Tour not found');
  }

  const {
    title, description, price, duration, maxGroupSize,
    difficulty, location, category, highlights, included,
    notIncluded, featured,
  } = req.body;

  const parseArr = (val, fallback) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val.filter(Boolean);
    try { return JSON.parse(val).filter(Boolean); } catch { return fallback; }
  };

  const data = {
    title: title || existing.title,
    description: description || existing.description,
    price: price !== undefined ? parseFloat(price) : existing.price,
    duration: duration !== undefined ? parseInt(duration) : existing.duration,
    maxGroupSize: maxGroupSize !== undefined ? parseInt(maxGroupSize) : existing.maxGroupSize,
    difficulty: difficulty || existing.difficulty,
    location: location || existing.location,
    category: category || existing.category,
    featured: featured !== undefined ? (featured === 'true' || featured === true) : existing.featured,
    highlights: parseArr(highlights, existing.highlights),
    included: parseArr(included, existing.included),
    notIncluded: parseArr(notIncluded, existing.notIncluded),
  };

  // Handle new image
  if (req.file) {
    if (existing.imagePublicId) {
      await cloudinary.uploader.destroy(existing.imagePublicId).catch(() => {});
    }
    data.image = req.file.path;
    data.imagePublicId = req.file.filename;
  }

  const tour = await prisma.tour.update({
    where: { id: req.params.id },
    data,
  });

  res.json(formatTour(tour));
});

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Admin
const deleteTour = asyncHandler(async (req, res) => {
  const tour = await prisma.tour.findUnique({ where: { id: req.params.id } });
  if (!tour) {
    res.status(404);
    throw new Error('Tour not found');
  }

  if (tour.imagePublicId) {
    await cloudinary.uploader.destroy(tour.imagePublicId).catch(() => {});
  }

  await prisma.tour.delete({ where: { id: req.params.id } });
  res.json({ message: 'Tour deleted successfully', id: req.params.id });
});

module.exports = { getTours, getTour, createTour, updateTour, deleteTour, getFeaturedTours };
