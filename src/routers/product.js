module.exports = function(app){
    const Product = require('../dbModels/product')
    const { adminAuth }  = require('../auth/auth')
    const multer = require('multer')

    const storage = multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, './uploads')
        },
        filename: function(req, file, cb){
            cb(null, new Date().getTime() + '-' + file.originalname)
        }
      })

      const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true)
        } else {
          cb(null, false)
        }
      }

      const upload = multer({
        storage: storage,
        limits: {
          fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
      })
    
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
    app.post('/products', adminAuth, upload.single('productImage'), async (req, res) => {
        console.log(req.file)
        const product = new Product({
            ...req.body,
            productImage: req.file.path
        })
        try {
            await product.save()
            res.status(201).send(product)
        } catch (e) {
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