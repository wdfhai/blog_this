const router = require('express').Router();
const bcrypt = require('bcrypt');
// const Blog = require('../../models/Blog');
// const User = require('../../models/User');

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
      const users = userData.map((user) => User.get({ plain: true }));
      // res.render('dashboard', { users });
      res.status(200).json(userData);
    }
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  } 
})

router.post('/signup', async (req, res) => {
  try {
    const newUser = req.body;
    newUser.password = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
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
    res.status(200).json({ message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
