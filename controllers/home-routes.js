const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/home', async (req, res) => {
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


// experimental func to get all users in insomnia
router.get('/all', async (req, res) => {
  try{
    const allUsers = await User.findAll();

    res.status(200).json(allUsers)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

// GET one User
// Use the custom middleware before allowing the user to access the User
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user, 
      logged_in: true 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Redirect to new Blog 
router.get('/new-blog', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
    res.render('new-blog', {
      ...user,
      logged_in: true 
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
    const blog = dbBlogData.get({ plain: true });

    res.render('blog', { 
      ...blog, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;