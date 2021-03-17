const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
    try {
        console.log(req.body);
        console.log(req.session.loggedIn);

        const newCommentData = await Comment.create({
            ...req.body,
            commenter_id: req.session.user_id,
        });
        console.log(newCommentData);
        res.status(200).json(newCommentData)
    } catch (err) {
        res.status(400).json(err);
        console.log(err)
    }
});

module.exports = router;