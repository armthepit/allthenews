var mongoose = require("mongoose");
var Comment = require("./comments");

var articlesSchema = new mongoose.Schema({
	title: {
		type: String, 
		// required: true
	},
	imgLink: {
		type: String, 
		// required: true
	},	
	storyLink: {
		type: String, 
/*		required: true*/
	},
	summary: {
		type: String, 
		// required: true
	},		
	comments: [Comment],
	createdAt: {
		type: Date, 
		default: Date.now
	}
});

var Articles = mongoose.model("Articles", articlesSchema);

module.exports = Articles;