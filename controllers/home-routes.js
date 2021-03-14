const router = require('express').Router();
const { User, Blog } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('home', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one User
// Use the custom middleware before allowing the user to access the User
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      attributes: {exclude: ['password'] },
      include: [{model: Blog}],
    });

    const User = dbUserData.get({ plain: true });

    res.render('dashboard', {
      ...user, 
      loggedIn: true 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Blog
// Use the custom middleware before allowing the user to access the Blog
router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id,{
      include: [
        {
          model: User,
          attributes: ['name',]
        },
      ],
  });
    const Blog = dbBlogData.get({ plain: true });

    res.render('Blog', { 
      ...blog, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;