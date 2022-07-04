const express = require('express')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const cors = require('cors')
const { getCategories, createCategory } = require('./controller')

const port = 8085
const rootId = '62bfd4c158c0a636474a8b7f'

const initialize = async () => {
    const app = express();

    // parse json request body
    app.use(cors())
    app.use(express.json());

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));

    // v1 api routes
    app.get('/categories', getCategories);
    app.post('/categories', createCategory);

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
        res.status(401).send('Not found')
    });

    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    })
}

const manageDefaultCategory = async () => {
    const Categories = require('./model')
    const existingRoot = await Categories.countDocuments({
        _id: ObjectId(rootId)
    })
    if (existingRoot) return
    const rootCategory = new Categories({
        _id: ObjectId(rootId),
        name: 'ROOT'
    })
    await rootCategory.save()
    console.log('Default category saved.')
}

mongoose.connect('mongodb://localhost:27017/test1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to MongoDB');
    await manageDefaultCategory()
    await initialize();
})
