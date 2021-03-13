const router = require('express').Router();

const { User, Blog } = require('../../models');

router.get('/', async (req,res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                where: Blog.author_id = User.id,
                attributes: ['name'],
            }]
        });
        if (!blogData.length){
                res.status(200).json('No blogs found')
        } else {
                const blogs = blogData.map((blog) => blog.get({ plain: true }));
                // res.render('home', { blogs });
                res.status(200).json(blogData);
            }       
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
})

router.get('/:id', async (req, res) => {

    try {
        const blogData = await Blog.findByPk(req.params.id);
        const blog = blogData.get({ plain: true });
        // res.render('painting', { painting, loggedIn: req.session.loggedIn });
        res.status(200).json(blog);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  });

router.post('/', async (req,res) => {
    try {
        const newBlog = {
            title: req.body.title,
            date: req.body.date_created,
            text: req.body.text,
        };
        const newBlogData = await Blog.create(newBlog);
        res.status(200).json('New blog posted!')
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', async (req,res) => {
    try {
        const blogByID = await Blog.findByPk(req.params.id);
        const blog = blogByID.get({ plain: true });

        res.status(200).json('Blog found');
        // res.render('blog', blog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const blogByID = await Blog.findByPk(req.params.id);
        const blog = blogByID.destroy();

        res.status(200).json('blog deleted');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})

module.exports = router;