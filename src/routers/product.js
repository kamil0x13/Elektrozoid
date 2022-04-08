module.exports = function(app){
    const Product = require('../dbModels/product')

    //Get all category products |  body: json {category} return (category(_id, name, number, fields))
    router.get('/products', async (req, res) => {
        try {
            const products = await Product.findByCategory(req.body.category)
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    })

    //Create product
}