const express = require('express');
const app = require('../app');
const router = express.Router();

// This is a named import (require). Since /validation/blogs.js is exporting a whole object with key/value pairs, the constiable value that comes through the import will be that object. The easiest way to access the named functions is to write the key name in an object when you write the import (require) statement like this:
const { validateBlogData } = require("../validation/blogs");

const sampleBlogs = [
    {
          title: "dicta",
      text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
      author: "Darren Abbott",
      category: ["Lorem", "sit", "amet"],
      createdAt: "2022-03-22T10:36:37.176Z",
      lastModified: "2022-03-22T10:36:37.176Z",
    },
    {
          title: "ducimus",
      text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
      author: "Luke Rogahn PhD",
      category: ["Lorem", "ipsum"],
      createdAt: "2022-03-22T15:16:56.285Z",
      lastModified: "2022-03-22T15:16:56.285Z",
    },
    {
          title: "quod",
      text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
      author: "Maryann Schneider",
      category: ["Lorem", "ipsum", "dolor", "sit", "amet"],
      createdAt: "2022-03-21T20:09:32.298Z",
      lastModified: "2022-03-21T20:09:32.298Z",
    },
    {
          title: "ut",
      text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
      author: "Dr. Lorenzo Anderson",
      category: ["ipsum", "dolor", "sit", "amet"],
      createdAt: "2022-03-21T23:07:53.447Z",
      lastModified: "2022-03-21T23:07:53.447Z",
    },
    {
          title: "id",
      text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
      author: "Bobbie Dach",
      category: ["amet"],
      createdAt: "2022-03-22T15:14:39.819Z",
      lastModified: "2022-03-22T15:14:39.819Z",
    },
  ];
/////////////////////////////////////////////////////////////////////////////
//A get request for all titles
router.get('/all',function(req,res,next){
    res.json({ success: true, blogs: sampleBlogs });
});

// GET request for a single title
router.get('/single/:title',function(req,res,next){
    //res.send(res.json(sampleBlogs))
    const singleBlog = sampleBlogs.find((blog)=>{
        return blog.title === req.params.title
    })
    res.json({ 
        success: true, 
        blog: singleBlog 
    });
});
// DELETE request for a single title
router.delete('/delete/:title',function(req,res,next){
    const blogTitleToDelete = req.params.title
	
    const blogIndex = sampleBlogs.findIndex((blog)=>{
		return blog.title === blogTitleToDelete
	})
	
    sampleBlogs.splice(blogIndex, 1)
	
    res.json({
		success: true
	})
});
/////////////////////////////////////////////////////////////////////////////
//POST request for a new blog
router.post("/create-one", (req, res) => {
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

    sampleBlogs.push(blogData);

    console.log("sampleBlogs", sampleBlogs);

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
router.put("/update-one/:title", (req,res)=>{
 
  try{
    //creating a variable for blog title to update
    const titleToUpdate = req.params.title

    //iterating through the sampleBlogs array,and locating the blog with the blog title
    const originalBlog = sampleBlogs.find((blog)=>{
      return blog.title === titleToUpdate
    })

    //iterating through the sampleBlogs array,and locating the blog's index with the blog title
    const originalBlogIndex = sampleBlogs.findIndex((Blog)=>{
      return Blog.title === titleToUpdate
    })

    // JSON message for a blog that couldn't be located
    if (!originalBlog) {
      res.json({
        success: false,
        message: "Could not find Blog in sampleBlogs."
      })
      return
    }

    //Creating an updated blog object
	  const updatedBlog = {}

    if (req.body.title !== undefined){
      updatedBlog.title = req.body.title
    } else {
      updatedBlog.title = originalBlog.title
    }

    if (req.body.text !== undefined){
      updatedBlog.text = req.body.text
    } else {
      updatedBlog.text = originalBlog.text
    }

    if (req.body.author !== undefined){
      updatedBlog.author = req.body.author
    } else {
      updatedBlog.author = originalBlog.author
    }
    if (req.body.category !== undefined){
      updatedBlog.category = req.body.category
    } else {
      updatedBlog.category = originalBlog.category
    }
    //Using the blogData validator
    const blogDataCheck = validateBlogData(updatedBlog);

    //Transfering the original createdAt and pdating the lastModified
    updatedBlog.createdAt = originalBlog.createdAt;
    updatedBlog.lastModified = new Date();

    sampleBlogs[originalBlogIndex] = updatedBlog
    if (blogDataCheck.isValid === false) {
			throw Error(blogDataCheck.message)
    }


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

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('blogs page');
  res.send(res.json({success: true, route: "blogs", message:"Welcome to the blogs page."}));
});

module.exports = router;
