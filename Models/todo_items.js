const mongoose = require('mongoose');

const Todo = mongoose.Schema({
    todo: {
        type: String,
        required: true
    }
})

const ToDo = mongoose.model("Items",Todo);

module.exports = { ToDo };
