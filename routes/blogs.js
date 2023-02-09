const express = require('express');
const app = require('../app');
const router = express.Router();
const { db } = require('../mongo');

// This is a named import (require). Since /validation/blogs.js is exporting a whole object with key/value pairs, the constiable value that comes through the import will be that object. The easiest way to access the named functions is to write the key name in an object when you write the import (require) statement like this:
const { validateBlogData } = require("../validation/blogs");
/////////////////////////////////////////////////////////////////////////////
//A get request for all titles
router.get('/all',async function(req,res,next){
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  .limit(11)
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 

    res.json({
      sucess:true,
      blogs: blogs
    });

});

// GET request for a single title
router.get('/single/:title',async function(req,res,next){
    // const singleBlog = sampleBlogs.find((blog)=>{
    //     return blog.title === req.params.title
    // })
  const singleBlog = await db()
  
    .collection('sample_blogs')
    .find({title:req.params.title})
    .toArray(function(err, result){
        if (err) {
          res.status(400).send("error fetching blog")
        } else {
          res.json(result);
        }
    }); 
    console.log(singleBlog)
    res.json({ 
        success: true, 
        blog: singleBlog 
    });
});
// DELETE request for a single title
router.delete('/delete/:title',async function(req,res,next){
  
  const myQuery = {title:req.params.title}
	const blogTitleToDelete = await db()
  await blogTitleToDelete
    .collection('sample_blogs')
    .deleteOne(myQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        res.status(200).send('1 document deleted');
      }
    });
  // const blogIndex = sampleBlogs.findIndex((blog)=>{
	// return blog.title === blogTitleToDelete
	// })
	
  // sampleBlogs.splice(blogIndex, 1)
	
  res.json({
		success: true
	})
});
/////////////////////////////////////////////////////////////////////////////
//POST request for a new blog
router.post("/create-one", async (req, res) => {
  const dbConnect = await db();
  //try block, for validation code
  try {
    // anticipate fields of our post request /create-one
    // parse out request data to local variables
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    const category = req.body.category;
    //create blogData object fields
    const blogData = {
      title,
      text,
      author,
      category,
      createdAt: new Date(),
      lastModified: new Date(),
    };

    //pass user data object to our validate function
    const blogDataCheck = validateBlogData(blogData);

    if (blogDataCheck.isValid === false) {
			throw Error(blogDataCheck.message)
      // res.json({
      //   success: false,
      //   message: userDataCheck.message,
      // });
      // return;
    }

    dbConnect
      .collection('sample_blogs')
      .insertOne(blogData, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting blogData into sample_blogs!');
        } else {
          console.log(`Added a new blog titled ${blogData.title}.`);
          res.status(204).send();
        }
      });
    res.json({
      success: true,
    });
  } catch (e) {
  // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
    console.log(e);
    res.json({
			success: false,
			error: String(e)
		});
  }
});

/////////////////////////////////////////////////////////////////////////////
//PUT request to update sampleBlogs array
router.put("/update-one/:title", async (req,res)=>{
  const dbConnect = await db();
  const myQuery = { title: req.params.title };
  const updatedBlog = {
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    category: req.body.category,
    lastModified: new Date()

  }
  try{
    dbConnect
      .collection('sample_blogs')
      .updateOne(myQuery, {$set:updatedBlog}, function (err, _result) {
        if (err) {
          res
            .status(400)
            .send(`Error updating sample_blogs ${myQuery.title}!`);
        } else {
          res.status(200).send('1 document updated')
        }
      });
  } catch (e) {
    // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
      console.log(e);
      res.json({
        success: false,
        error: String(e)
      });
    }

    res.json({
        success: true
    })
})


module.exports = router;
