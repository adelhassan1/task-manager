const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "must provide name."],
		trim: true,
		maxLength: [20, "name can't be more than 20 characters."]
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Task", taskSchema);