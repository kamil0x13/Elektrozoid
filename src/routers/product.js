module.exports = function(app){
    const Product = require('../dbModels/product')
    const { adminAuth }  = require('../auth/auth')
    
    //Get all category products |  body: json {category} return (category(_id, name, number, fields))
    app.get('/products', async (req, res) => {
        try {
            let products = null;
            if(res.body.category){
                products = await Product.findByCategory(req.body.category)
            }else{
                products = await Product.find({})
            }
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    })

    //Create product
    app.post('/products', adminAuth, async (req, res) => {
        const product = new Product({
            ...req.body
        })
        try {
            await product.save()
            res.status(201).send(product)
        } catch (e) {
            res.status(400).send()
        }
    })
}