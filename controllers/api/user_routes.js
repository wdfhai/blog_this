const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Blog } = require('../../models');

router.get('/', async (req,res) => {
  try {
    const userData = await User.findAll({
      include: [{
        model: Blog,
        where: User.id = Blog.author_id,
        attributes: ['title'],
      }],
    });
    if (!userData.length){
      res.status(200).json('No users found')
    } else {
      const users = userData.map((user) => user.get({ plain: true }));
      // res.render('dashboard', {
      // users,
      // loggedIn: req.session.loggedIn
      // });
      res.status(200).json(userData);
  }
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  } 
})

router.get('/dashboard', async (req,res) => {
  try {
    const userBlogData = await Blog.findAll({
        include: [{
            model: User,
            where: Blog.author_id = User.id,
            attributes: ['name'],
        }]
    });
    if (!userBlogData.length){
            res.status(200).json('No blogs found')
    } else {
            const userBlogs = [];
            const blogs = userBlogData.map((blog) => {
                if (blog.userId === User.id){
                    userBlogs.push(blog);
                };
                const renderUserBlogs = userBlogs.map((userBlogs) => {
                  blog.get({ plain: true });
                  // res.render('dashboard', { renderUserBlogs });
                })
            });                
            res.status(200).json(userBlogs);
        }       
} catch (err) {
    res.status(400).json(err);
    console.log(err);
}
})

router.post('/signup', async (req, res) => {
  try {
    const newUser = {
      name : req.body.name,
      email : req.body.email,
      password : await bcrypt.hash(req.body.password, 10)
    };

    const duplicatesFound = [];
    const allUsers = await User.findAll();
    const duplicateUser = allUsers.map((user) => {
      if (user.email === newUser.email){
        duplicatesFound.push(user);
      };
    })

    if (!duplicatesFound.length){
      res.status(200).json('Unique email accepted. New User created!!')
      const newUserData = await User.create(newUser);

      // req.session.save(() => {
      // req.session.loggedIn = true;
      // });
    }
     else {
      res.status(500).json('Email already signed up. Please Log In or try a different email to sign up.');
    };  
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json({ message: 'You are now logged in!' });
    });

    } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = router;
