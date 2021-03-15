const router = require('express').Router();

const userRoutes = require('./user_routes');
const blogRoutes = require('./blog_routes');
const commentRoutes = require('./comment_routes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
