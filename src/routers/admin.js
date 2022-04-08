module.exports = function(app){
    const Admin = require('../dbModels/admin')

    const auth = async (req, res, next) => {
        const Admin = require('../dbModels/admin')
        const { JWT_SECRET_ADMIN } = require('../../config/dev')
        const jsonwebtoken = require('jsonwebtoken')
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jsonwebtoken.verify(token, JWT_SECRET_ADMIN)
            const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
            if (!admin) {
                throw new Error()
            }
            req.token = token
            next()
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' })
        }
    }

    //Login admin | body: json {login,password} | return token}
    app.post('/admin/login', async (req, res) => {
        try {
            await Admin.findByCredentials(req.body.login, req.body.password)
            const token = await Admin.generateAuthToken()
            res.send({ token })
        } catch (e) {
            res.status(400).send(e)
        }
    })

    //Logout | header Authorization ('Bearer token')
    app.post('/admin/logout', auth, async (req, res) => {
        try {
            req.admin.tokens = req.admin.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.admin.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    })

    //Change password | header Authorization ('Bearer token'), body: json {password}
    app.patch('/admin', auth, async (req, res) => {
        try {
            if (!req.body.password) {
                res.status(400).send()
            }
            req.admin['password'] = req.body.password
            req.admin.save()
            res.send()
        } catch (e) {
            res.status(400).send(e)
        }
    })

    //Creating admin | body: json {login(unique),password(minlength: 7)}
    app.post('/createAdmin', async (req, res) => {
        const admin = new Admin(req.body)
        try {
            await admin.save()
            res.status(201).send()
        } catch (e) {
            res.status(400).send(e)
        }
    })
}