const router = require('express').Router();
const { User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
    try {
        const newBlogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req,res) => {
    try {
        const blogByID = await Blog.findByPk(req.params.id);
        const blog = blogByID.get({ plain: true });

        res.status(200).json('Blog found');
        res.render('blog', blog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;