const validateBlogData = (blogData) => {
	if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 40) {
		// title is required and it must be a string
		return {
			isValid: false,
			message: "A title is required, it must be a string and under 40 characters."
		}
	}
	if (blogData.text === undefined || typeof(blogData.text) !== "string") {
		// text is required and it must be a string
		return {
			isValid: false,
			message: "Text is required and it must be a string."
		}
	}
	if (blogData.author === undefined || typeof(blogData.author) !== "string" || blogData.author.length > 40) {
		// author is required and it must be a string
		return {
			isValid: false,
			message: "An author's name is required, it must be a string and under 40 characters"
		}
	}
	// This is where I added the category to the validator
	const blogCategories = ["Lorem","ipsum","dolor","sit","amet"]
	let containsBlogCategory = false;

	for(let i = 0; i < blogData.category.length; i++){
		let j = 0;
		while(j < blogCategories.length){
			if(blogData.category[i] === blogCategories[j]){
				containsBlogCategory = true;
				break;
			} 
			j++;
		}
		if(containsBlogCategory === true){
			break;
		}
	}



	// Since all array's in JS are objects behind the scenes, typeof(array) will return 'object'. So in order to verify that the variable is actually an array, we have to do the Array.isArray() check.
	if (blogData.category === undefined || !Array.isArray(blogData.category) || blogData.category.length === 0) {
		return {
			isValid: false,
			message: "category must be an array and must have length"
		}
	}
	if(containsBlogCategory === false){
		return {
			isValid: false,
			message: "The category array must contain one of the following: Lorem, ipsum, dolor, sit, amet."
		}
	}
	if(blogData.category.length > 5){
		return {
			isValid: false,
			message: "The category array can only have five elements."
		}
	}
	// We are going to use .filter() to iterate through category and will only bring through values that are NOT strings. Then we will check if the resultant array has any length, in which case we know there are non-string values in the array.
	const nonStringCategory = blogData.category.filter((category)=>{
		// If the callback function in .filter() returns true, then the item will be kept in the resultant array. If the callback returns false, the item will be filtered out
		if (typeof(category) !== 'string') {
			return true
		} else {
			return false
		}
	})

	console.log("nonStringCategory ", nonStringCategory)
	if (nonStringCategory.length > 0) {
		return {
			isValid: false,
			message: "Category must be an array of strings"
		}
	}
	
    return {
		isValid: true
	}
}
module.exports = {
	// These two lines are equivalent because the variable name and the key for the object are the same name. Typically, we write the short-hand version.
	// validateBlogData: validateBlogData
	validateBlogData,
}