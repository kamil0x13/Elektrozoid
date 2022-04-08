const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        min:0,
    },
    parameters: [{
        title: {
            type: String,
            required: true,
            trim: true,
        },
        value: {
            type: String
        },
    }]
})

//Szukanie produktów danej kategorji
productSchema.statics.findByCategory = async (category) => {
    const products = await Product.find({ category })
    return products
}


const Product = mongoose.model('Product', productSchema)

module.exports = Product