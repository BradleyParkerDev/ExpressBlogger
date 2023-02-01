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

    return {
		isValid: true
	}
}
module.exports = {
	// These two lines are equivalent because the variable name and the key for the object are the same name. Typically, we write the short-hand version.
	// validateBlogData: validateBlogData
	validateBlogData,
}