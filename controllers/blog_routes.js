const router = require('express').Router();
const Blog = require('../models/Blog');

router.get('/', async (req,res) => {
    const blogData = await Blog.findAll().catch((err) => {res.json(error)});
    const blogs = blogData.map((blog) => dish.get({ plain: true }));
    res.render('dashboard', { blogs });
})

router.post('/', async (req,res) => {

})

router.put('/:id', async (req,res) => {
    
})

router.delete('/:id', async (req,res) => {

})

module.exports = router;