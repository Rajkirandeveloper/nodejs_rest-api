const express = require('express')
const feedCotrollers=require('../controllers/feed')
const {body} =require('express-validator');

const router=express.Router()

router.get('/posts',feedCotrollers.getPosts)
router.post('/post',[body('title').trim().isLength({min:7}),body('content').trim().isLength({min:5})
],feedCotrollers.createPost)

router.get('/post/:postId',feedCotrollers.getPost)
router.put('/updatepost/:postId',feedCotrollers.updatePost)
module.exports=router