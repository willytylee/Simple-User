var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
	text: String,
	created_by: String,
	created_at: {type: Date, default: Date.now}
});

//declare a model called User which has schema userSchema
mongoose.model("User", userSchema);
mongoose.model("Post", postSchema);