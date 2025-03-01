const Task = require('../models/task');
const asyncWrapper = require('../middlewares/async');

const getAllTasks = asyncWrapper(async (req, res) => {
		const tasks = await Task.find({});
		res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
});

const getOneTask = asyncWrapper(async (req, res, next) => {
		const { id: taskID } = req.params
		const task = await Task.findOne({ _id: taskID }).exec();

		if (!task) {
			const error = new Error("Not found");
			error.status = 404;
			return next(error)
		}
		res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
		const { id: taskID } = req.params
		const task = await Task.findOneAndDelete({ _id: taskID }).exec();

		if (!task) {
			return res.status(404).json({ message: `No task with id: ${taskID}`});
		}
		res.status(200).json({ message: 'Task deleted' });
});

const updateTask = asyncWrapper(async (req, res) => {
		const { id: taskID } = req.params;
		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
			new: true,
			runValidators: true,
		});

		if (!task) {
			return res.status(404).json({ message: `No task with id: ${taskID}`});
		}
		res.status(200).json({ task });
});

module.exports = {
	getAllTasks,
	createTask,
	getOneTask,
	deleteTask,
	updateTask
}