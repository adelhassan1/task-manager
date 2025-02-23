require('dotenv').config();
const express = require('express');
const tasksRouter = require('./routes/tasks');
const mongoose = require('mongoose');


const app = express();


const mongoConnection = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoConnection);
}

//middleware
app.use(express.json());


// routes
app.use('/api/v1/tasks', tasksRouter);


const port = 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
})