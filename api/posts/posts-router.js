const express = require("express")
const posts = require("./posts-model")

// create a standalone express router
const router = express.Router()


router.get("/api/posts", (req, res) => {
    const post = posts.find()
   if (post){
        res.json(post)
   } else {
       res.status(500).json({message: "The posts information could not be retrieved",})
   }
})


router.get("/api/posts/:id", (req, res) => {
    const post = posts.findById(req.params.id)
    if(post) {
    res.json(post)
    } else if (!post){
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        })
    } else {
        res.status(500).json({ message: "The post information could not be retrieved", })
    }
})



router.get("/api/posts/:id/comments", (req, res) => {
    const post = posts.findById(req.params.id)
    if(post) {
    res.json(post)
    } else if (!post){
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        })
    } else {
        res.status(500).json({ message: "The post information could not be retrieved", })
    }
})



router.post("/api/posts/", (req, res) => {
    const newPost = posts.insert({
       
        title: req.body.title, 
        contents: req.body.contents,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
    })
    if (newPost){ 
        res.status(201).json(newPost);
    } else if ( !newPost.title && !newPost.contents) {
        res.status(400).json({ message : "please provide title and contents for the post"})
    } else {
        res.status(500).json({ message: "There was an error while saving the post to the database"})
    }

})


router.put("/api/posts/:id", (req, res) =>{
    const post = posts.findById(req.params.id)
    if (post) {
        //update the user
        const updatedPost = posts.update(post.id, {
            id: req.body.id || updatedPost.id,
            title: req.body.title || updatedPost.title, 
            contents: req.body.contents || updatedPost.contents,
            created_at: req.body.created_at || updatedPost.created_at,
            updated_at: req.body.updated_at || updatedPost.updated_at,
        })
        res.json(updatedPost)
    } 
    else if (!post ){
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        })
    }  
    else if (!updatedPost.title && !updatedPost.contents) {
        res.status(400).json({ 
            message : "please provide title and contents for the post",
        }) 
    }
    else {
        res.status(500).json({message: "The post information could not be modified"})
    }
})


router.delete("/api/posts/:id", (req, res) =>{
    const post= posts.findById(req.params.id)
    if (post) {
        //update the user
        posts.remove(post.id)
        res.status(204).end
    } else if (!post){
        res.status(404).json({
            message: "The post with the specified ID does not exist",
        })
    } else {
        res.status(500).json({message : "The post could not be modified"})
    }
})


module.exports = router



// implement your posts router here
