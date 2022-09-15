const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const { ToDo } = require('./Models/todo_items');

require('dotenv').config();

const app = express();

const connectionUrl = process.env.MONGO_URI;
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/view', (req, res) => {
    ToDo.find({}, (err, doc) => {
        if(err) return err;
        res.status(200).send(doc)
    })
})

app.post('/add', (req, res) => {
    const todo = new ToDo(req.body);
    todo.save( (err, doc) => {
        if(err) return res.send(err)
        res.status(200).send(doc);
    } )
})

app.post('/delete', (req, res) => {
    ToDo.findByIdAndDelete(req.body.id, (err, doc) => {
        if(err) return err;
        res.status(200).json({ msg: `${doc} was deleted` })
    })
})

const PORT = process.env.PORT || 9000

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
