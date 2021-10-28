const express = require('express');
const router = express.Router();
//require login middleware
const requireLogin = require('../middleware/requireLogin');

//modals
const Post = require('../modals/postSchema');
const User = require('../modals/userSchema');

//post created by individual
router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .sort('-createdAt')
    .then(result => res.status(200).json({
        message: "Fetched user posts successfully.",
        result
    })).catch(err => console.log(err, ' error'))
})

//create post
router.post('/createpost', requireLogin, (req, res) => {
    const { firstName, lastName, birthDate, description, email, phone } = req.body;
    if (!firstName || !lastName || !birthDate || !description || !email || !phone) {
        return res.status(422).json({
            error: 'Please add all the fields'
        })
    }
    const newPost = new Post({ firstName, lastName, birthDate, description, email, phone, postedBy: req.user })
    newPost.save()
        .then(result => res.status(200).json({
            message: 'Created Post succesfully.',
            data: result
        })).catch(err => console.log(err, ' error'))
})

//updated post
router.put('/updatepost', requireLogin, (req, res) => {
    const { firstName, lastName, birthDate, description, email, phone } = req.body;
    const data = { firstName, lastName, birthDate, description, email, phone }
    Post.findOneAndUpdate({ _id: req.body.postId }, data, { new: true })
        .exec((err, result) => {
            if(err){
                return res.status(422).json({ error: err })
            }else{
                res.status(200).json({
                    message: "Updated Successfully",
                    data: result
                })
            }
        })
})

//delete post
router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id: req.params.postId})
        .exec((err, post) => {
            if(err || !post){
                res.status(402).json({ error: err })
            }
            else {   
                post.remove()
                .then(result => {
                    res.status(200).json({
                        data: result,
                        message: 'Post deleted succesfully'
                    })
                }).catch(err => console.log(err, ' errr'))
            }
        })
})

module.exports = router