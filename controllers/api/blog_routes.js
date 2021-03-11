const router = require('express').Router();

const { User, Blog } = require('../../models');

router.get('/', async (req,res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                where: Blog.author_id = User.id,
                attributes: ['name', 'email'],
            }]
        });
        if (!blogData.length){
                res.status(200).json('No blogs found')
        } else {
                const blogs = blogData.map((blog) => Blog.get({ plain: true }));
                // res.render('dashboard', { blogs });
                res.status(200).json(blogData);
            }       
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
})

router.post('/', async (req,res) => {

})

router.put('/:id', async (req,res) => {
    
})

router.delete('/:id', async (req,res) => {

})

module.exports = router;