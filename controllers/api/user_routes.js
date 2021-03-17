const router = require('express').Router();
const { User, Blog } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
      const newUserData = req.body;
      newUserData.password = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create(newUserData);

      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.loggedIn = true;
  
        res.status(200).json(newUser);
      }); 
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Login failed. Please try again!' });
      return;
    }
    const validPassword = await bcrypt.compareSync(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Invalid credentials. Please try again!' });
      return;
    }
    
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;

        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json(err);
  }
});

module.exports = router;
