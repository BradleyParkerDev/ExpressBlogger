const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();


const blogsController = require('../controllers/blogsController');

// GET All Blog Posts
router.get('/all',blogsController.getAllBlogs);
router.post("/create-one", blogsController.createOneBlog);
router.get('/get-one/:id', blogsController.getOneBlog);
router.put("/update-one/:id", blogsController.updateOneBlog);
router.delete("/delete-one/:id", blogsController.deleteOneBlog);

















// // const express = require('express');
// // const app = require('../app');
// // const router = express.Router();
// // const { db } = require('../mongo');
// const { v4: uuidv4 } = require("uuid");
// const express = require("express");
// const router = express.Router();

// const Blog = require('../models/Blogs');

// /* GET home page. */
// router.get('/all', async function(req, res) {

//     //query blogs 
//     try {
//       const allBlogs = await Blog.find({});
//       res.json({blogs: allBlogs });
//     }catch(e){
//       console.log(e);
//     }
// });

// router.get('/single/:title', async function(req, res) {

//   //query blogs 
//   try {
//     const singleBlog = await Blog.find({title:req.params.title});
//     res.json({blog: singleBlog });
//   }catch(e){
//     console.log(e);
//   }
// });

// router.post("/create-one", async function (req, res, next) {
//     try {
//       //parse out fields from POST request
//       const title  = req.body.title 
//       const text = req.body.text 
//       const author = req.body.author
//       const categories = req.body.category
//       const year =  req.body.year;
  
//       //pass fields to new Blog model 
//       //notice how it's way more organized and does the type checking for us
//       const newBlog = new Blog({
//           title,
//           text,
//           author,
//           categories,
//           year
//       });
  
//       //save our new entry to the database 
//       const savedData =  await newBlog.save();
      
//       //return the successful request to the user 
//       res.json({
//           success: true,
//           blogs: savedData
//       });
  
//     } catch (e) {
//       console.log(typeof e);
//       console.log(e);
//       res.json({
//         error: e.toString(),
//       });
//     }
//   });

//   router.put("/update-one/:title", async (req,res)=>{

//     //parse out fields from POST request
//     const title  = req.body.title 
//     const text = req.body.text 
//     const author = req.body.author
//     const categories = req.body.category
//     const year =  req.body.year;
  
//     //pass fields to new Blog model 
//     //notice how it's way more organized and does the type checking for us
//     const updatedBlog = new Blog({
//       title,
//       text,
//       author,
//       categories,
//       year
//     });
    
  

    
//   }





// // This is a named import (require). Since /validation/blogs.js is exporting a whole object with key/value pairs, the constiable value that comes through the import will be that object. The easiest way to access the named functions is to write the key name in an object when you write the import (require) statement like this:
// const { validateBlogData } = require("../validation/blogs");
// /////////////////////////////////////////////////////////////////////////////
// //A get request for all titles
// router.get('/all',async function(req,res,next){
//   const blogs = await db()
//   .collection('sample_blogs')
//   .find({})
//   .toArray(function(err, result){
//       if (err) {
//         res.status(400).send("error fetching blogs")
//       } else {
//         res.json(result);
//       }
//     }); 

//     res.json({
//       sucess:true,
//       blogs: blogs
//     });

// });

// // GET request for a single title
// router.get('/single/:title',async function(req,res,next){
//     // const singleBlog = sampleBlogs.find((blog)=>{
//     //     return blog.title === req.params.title
//     // })
//   const singleBlog = await db()
  
//     .collection('sample_blogs')
//     .find({title:req.params.title})
//     .toArray(function(err, result){
//         if (err) {
//           res.status(400).send("error fetching blog")
//         } else {
//           res.json(result);
//         }
//     }); 
//     console.log(singleBlog)
//     res.json({ 
//         success: true, 
//         blog: singleBlog 
//     });
// });
// // DELETE request for a single title
// router.delete('/delete/:title',async function(req,res,next){
  
//   const myQuery = {title:req.params.title}
// 	const blogTitleToDelete = await db()
//   await blogTitleToDelete
//     .collection('sample_blogs')
//     .deleteOne(myQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         res.status(200).send('1 document deleted');
//       }
//     });
//   // const blogIndex = sampleBlogs.findIndex((blog)=>{
// 	// return blog.title === blogTitleToDelete
// 	// })
	
//   // sampleBlogs.splice(blogIndex, 1)
	
//   res.json({
// 		success: true
// 	})
// });
// /////////////////////////////////////////////////////////////////////////////
// //POST request for a new blog
// router.post("/create-one", async (req, res) => {
//   const dbConnect = await db();
//   //try block, for validation code
//   try {
//     // anticipate fields of our post request /create-one
//     // parse out request data to local variables
//     const title = req.body.title;
//     const text = req.body.text;
//     const author = req.body.author;
//     const category = req.body.category;
//     //create blogData object fields
//     const blogData = {
//       title,
//       text,
//       author,
//       category,
//       createdAt: new Date(),
//       lastModified: new Date(),
//     };

//     //pass user data object to our validate function
//     const blogDataCheck = validateBlogData(blogData);

//     if (blogDataCheck.isValid === false) {
// 			throw Error(blogDataCheck.message)
//       // res.json({
//       //   success: false,
//       //   message: userDataCheck.message,
//       // });
//       // return;
//     }

//     dbConnect
//       .collection('sample_blogs')
//       .insertOne(blogData, function (err, result) {
//         if (err) {
//           res.status(400).send('Error inserting blogData into sample_blogs!');
//         } else {
//           console.log(`Added a new blog titled ${blogData.title}.`);
//           res.status(204).send();
//         }
//       });
//     res.json({
//       success: true,
//     });
//   } catch (e) {
//   // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
//     console.log(e);
//     res.json({
// 			success: false,
// 			error: String(e)
// 		});
//   }
// });

// /////////////////////////////////////////////////////////////////////////////
// //PUT request to update sampleBlogs array
// router.put("/update-one/:title", async (req,res)=>{
//   const dbConnect = await db();
//   const myQuery = { title: req.params.title };
//   const updatedBlog = {
//     title: req.body.title,
//     text: req.body.text,
//     author: req.body.author,
//     category: req.body.category,
//     lastModified: new Date()

//   }
//   try{
//     dbConnect
//       .collection('sample_blogs')
//       .updateOne(myQuery, {$set:updatedBlog}, function (err, _result) {
//         if (err) {
//           res
//             .status(400)
//             .send(`Error updating blog titled ${myQuery.title}!`);
//         } else {
//           res.status(200).send('1 document updated')
//         }
//       });
//   } catch (e) {
//     // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
//       console.log(e);
//       res.json({
//         success: false,
//         error: String(e)
//       });
//     }

//     res.json({
//         success: true
//     })
// })

// //Dominic's Code
// // router.get("/get-one/:id", async function (req, res, next) {
// //   //checking if the parameter ID was passed in 
// //   if (!req.params.id) {
// //     res.json({
// //       success: false,
// //       message: "The blog id must be provided in the url parameters",
// //     });
// //     return;
// //   }

// //   console.log("first");
// //   //await blocks the execution until the promise resolves
// //   // aka. make sure line 47 finishes before we get on 
// //   // with the rest of our program 
// //   const blogPosts = await db().collection("sample_blogs").findOne({
// //     id: req.params.id,
// //   }); /*.catch({
// //     console.log("something went wrong");
// //   });*/
// //   console.log("second");
// //   //we don't want to a user to see the result before post is loaded.
// //   // so we use await, to block this from happening.
// //   res.json({
// //     success: true,
// //     posts: blogPosts,
// //   });
// //   //NOTE: FIND ONE is READ operation, the output holds the results of the operation.
// //   // so we add it in our res.json()
// //   console.log("third");
// // });

// // router.get("/get-multi", async function (req, res) {
// //   const sortField = req.query.sortField;
// //   const sortOrder = Number(req.query.sortOrder);
// //   const limit = Number(req.query.limit);
// //   const page = Number(req.query.page);

// //   console.log(sortField, typeof sortField);
// //   console.log(sortOrder, typeof sortOrder);
// //   console.log(limit, typeof limit);
// //   console.log(page, typeof page);

// //   const skip = limit * (page - 1);
// //   console.log(skip);

// // 	const sortObject = {}
// // 	sortObject[sortField] = sortOrder 
// //   // {title: 1} -> sort ascending 
// //   // {title: -1} -> sort descending

// //   const blogs = await db()
// //   .collection("sample_blogs")
// //   .find({})
// //   .sort(sortObject)
// //   .limit(limit)
// //   .skip(skip)
// //   .toArray()

// //   res.json({
// // 		success: true,
// // 		blogs
// // 	});
// // });

// // router.delete('/delete-multi', async function (req, res) {
// // 	try {
      
// //       const idsToDelete = req.body

// //       if (idsToDelete.length < 1){
// //         throw Error("ids to delete empty!");
// //       }
// //       const deleteResult = await db().collection("sample_blogs").deleteMany({
// //         id: {
// //           $in: idsToDelete
// //         }
// //       })
  
// //   } catch (e) {
// //     res.send(e);
// //   }
// // 	res.json({
// // 		success: true,
// // 		deleteResult: deleteResult
// // 	})
// // })


// module.exports = router;


// /*

// /////////////////////////////////////////////////////////////////////////////
// //Below are my non-persistent requests
// /////////////////////////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////////////////////////
// //A get request for all titles
// router.get('/all',function(req,res,next){
//     res.json({ success: true, blogs: sampleBlogs });
// });
// /////////////////////////////////////////////////////////////////////////////
// // GET request for a single title
// router.get('/single/:title',function(req,res,next){
//     //res.send(res.json(sampleBlogs))
//     const singleBlog = sampleBlogs.find((blog)=>{
//         return blog.title === req.params.title
//     })
//     res.json({ 
//         success: true, 
//         blog: singleBlog 
//     });
// });
// /////////////////////////////////////////////////////////////////////////////
// // DELETE request for a single title
// router.delete('/delete/:title',function(req,res,next){
//     const blogTitleToDelete = req.params.title
	
//     const blogIndex = sampleBlogs.findIndex((blog)=>{
// 		return blog.title === blogTitleToDelete
// 	})
	
//     sampleBlogs.splice(blogIndex, 1)
	
//     res.json({
// 		success: true
// 	})
// });
// /////////////////////////////////////////////////////////////////////////////
// //POST request for a new blog
// router.post("/create-one", (req, res) => {
//   //try block, for validation code
//   try {
//     // anticipate fields of our post request /create-one
//     // parse out request data to local variables
//     const title = req.body.title;
//     const text = req.body.text;
//     const author = req.body.author;

//     //create userData object fields
//     //create blogData object fields
//     const blogData = {
//       title,
//       text,
// @@ -118,8 +118,7 @@ router.post("/create-one", (req, res) => {
//       success: true,
//     });
//   } catch (e) {

// // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
//   // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
//     console.log(e);
//     res.json({
// 			success: false,
// @@ -128,8 +127,81 @@ router.post("/create-one", (req, res) => {
//   }
// });
// /////////////////////////////////////////////////////////////////////////////
// //PUT request to update sampleBlogs array
// router.put("/update-one/:title", (req,res)=>{

//   try{
//     //creating a variable for blog title to update
//     const titleToUpdate = req.params.title

//     //iterating through the sampleBlogs array,and locating the blog with the blog title
//     const originalBlog = sampleBlogs.find((blog)=>{
//       return blog.title === titleToUpdate
//     })

//     //iterating through the sampleBlogs array,and locating the blog's index with the blog title
//     const originalBlogIndex = sampleBlogs.findIndex((Blog)=>{
//       return Blog.title === titleToUpdate
//     })

//     // JSON message for a blog that couldn't be located
//     if (!originalBlog) {
//       res.json({
//         success: false,
//         message: "Could not find Blog in sampleBlogs."
//       })
//       return
//     }

//     //Creating an updated blog object
// 	  const updatedBlog = {}

//     if (req.body.title !== undefined){
//       updatedBlog.title = req.body.title
//     } else {
//       updatedBlog.title = originalBlog.title
//     }

//     if (req.body.text !== undefined){
//       updatedBlog.text = req.body.text
//     } else {
//       updatedBlog.text = originalBlog.text
//     }

//     if (req.body.author !== undefined){
//       updatedBlog.author = req.body.author
//     } else {
//       updatedBlog.author = originalBlog.author
//     }

//     //Using the blogData validator
//     const blogDataCheck = validateBlogData(updatedBlog);

//     //Transfering the original createdAt and pdating the lastModified
//     updatedBlog.createdAt = originalBlog.createdAt;
//     updatedBlog.lastModified = new Date();

//     sampleBlogs[originalBlogIndex] = updatedBlog
//     if (blogDataCheck.isValid === false) {
// 			throw Error(blogDataCheck.message)
//     }


//   } catch (e) {
//     // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
//       console.log(e);
//       res.json({
//         success: false,
//         error: String(e)
//       });
//     }

//     res.json({
//         success: true
//     })
// })


// */
module.exports = router;