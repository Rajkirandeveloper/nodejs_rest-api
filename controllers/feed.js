const {validationResult } =require('express-validator/check');

const Post=require('../models/post');


exports.getPosts=(req,res,next)=>{
     Post.find()
     .then(posts=>{
        res.status(200).json({message:"fetched posts sucessfully",posts:posts})
     })
     .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
           }
           next(err)

     })
//dummy data i added before connecting db
    // res.status(200).json({    
    //     posts:[
    //         {_id:1,title:"raj",content:"important notes",imageUrl:"images/oneImage",creater:{name:"rajkiran"},createdAt:new Date()}
    //     ]
    // })
}

exports.createPost=(req,res,next)=>{
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        const error=new Error("validation failed entered data incorrect")
        error.statusCode=422
        throw error
        //return res.status(422).json({message:"validation failed entered data incorrect",errors:errors.array()})

        

    }
    const title=req.body.title;
    const content=req.body.content
    const post = new Post({
        title:title,
        content:content,
        imageUrl:"images/oneImage",
        creator:{name:"rajkiran"}
    })
    post.save().then(result=>{
        console.log(result)
        res.status(201).json({
            message: "Post created SuccessFully",
            post:result
        })
    }).catch(err=>{
       if(!err.statusCode){
        err.statusCode=500;
       }
       next(err)

    })
    
}

exports.getPost=(req,res,next)=>{
    const postId=req.params.postId

    Post.findById(postId).then(post=>{
        if(!post){
            const error=new Error('Could Not find post')
            error.statusCode=404;
            throw error
        }
        res.status(200).json({message:"Post fetched",post:post})
        
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
           }
           next(err)

    })
}

exports.updatePost=(req,res,next)=>{
    const prodId=req.params.prodId
    const title=req.body.title;
    const imageUrl=req.body.imageUrl
    const content=req.body.content;

    Post.findById(prodId)
    .then(product=>{
        console.log(product)
        if(!product){
            console.log("here !product")
            const error=new Error('Could Not find post')
            error.statusCode=404;
            throw error
        }
        product.title=title;
        product.imageUrl=imageUrl;
        product.content=content;
       return  product.save()
    }).then(result=>{
        console.log(result)
        res.status(200).json({message:"Post Updated",posts:result})
    })
    .catch(err=>{
        console.log("here catch")

        if(!err.statusCode){
            err.statusCode=500;
           }
           next(err)

    })


}
