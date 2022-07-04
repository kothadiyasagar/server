const { model, Schema, Types: { ObjectId } } = require("mongoose");

const CategorySchema = new Schema({
    name: { type: String, required: true },
    isSub: { type: Boolean, default: false },
    subCategories: [{ type: ObjectId, ref: 'categories' }],
})

const Categories = new model('categories', CategorySchema)

module.exports = Categories