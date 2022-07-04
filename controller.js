const Categories = require("./model")

const getCategories = async (req, res, next) => {
    try {
        const categories = await Categories.find().populate('subCategories')
        res.status(200).send(categories)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const createCategory = async (req, res, next) => {
    try {
        const payload = req.body
        const newCategory = await Categories({
            name: payload.name,
            isSub: true,
        })
        await newCategory.save()
        await Categories.updateOne({ _id: payload.parent }, {
            $addToSet: {
                subCategories: newCategory._id
            }
        })
        res.status(200).send(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = { getCategories, createCategory }