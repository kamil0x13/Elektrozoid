module.exports = function(app){
    const Product = require('../dbModels/product')
    const { adminAuth }  = require('../auth/auth')

    const {cloudinary} = require('../cloudinary/cloudinary')
    
    //Get all category products |  body: json {category} return (category(_id, name, number, fields))
    app.get('/products', async (req, res) => {
        try {
            let products = null;
            if(req.body.category){
                products = await Product.findByCategory(req.body.category)
            }else{
                products = await Product.find({})
            }
            res.send(products)
        } catch (e) {
            res.status(500).send()
        }
    })

    //Create product
    app.post('/products', adminAuth, async (req, res) => {
        try {
            const uploadedResponse = await cloudinary.uploader.upload(req.body.data,{upload_preset: 'ml_default',})
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                number: req.body.number,
                parameters: req.body.parameters,
                productImage: uploadedResponse.secure_url
            })
            await product.save()
            res.status(201).send(product)
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    })

    app.delete('/products', adminAuth, async (req, res) => {
        try {
            const product = await Product.find({ _id: req.body._id })
            if (!product) {
                res.status(404).send()
            }
            await product.remove()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    })
}