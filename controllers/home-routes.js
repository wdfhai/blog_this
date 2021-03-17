const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
// experimental func to get all comments in insomnia
router.get('/allcs', async (req, res) => {
  try{
    const allComments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });
    res.status(200).json(allComments)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})
// experimental func to get all blogs in insomnia
router.get('/allblogs', async (req, res) => {
  try{
    const allBlogs = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment_text', 'commenter_id'],
        },
      ],
    });

    res.status(200).json(allBlogs)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user, 
      loggedIn: true 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
 
router.get('/new-blog', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
    res.render('new-blog', {
      ...user,
      loggedIn: true 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id,{
      include: [
        {
          model: User,
          attributes: ['name','id']
        },{
          model: Comment,
          attributes: ['commenter_id', 'comment_text', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ]
        }
      ],
  });

    const blog = dbBlogData.get({ plain: true });

    res.render('blog', { 
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
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;