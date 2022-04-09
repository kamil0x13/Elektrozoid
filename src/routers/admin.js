module.exports = function(app){
    const Admin = require('../dbModels/admin')

    const {adminAuth} = require('../auth/auth')

    //Login admin | body: json {login,password} | return token}
    app.post('/admin/login', async (req, res) => {
        try {
            const admin = await Admin.findByCredentials(req.body.login, req.body.password)
            const token = await admin.generateAuthToken()
            res.send({ token })
        } catch (e) {
            res.status(400).send(e)
        }
    })

    //Logout | header Authorization ('Bearer token')
    app.post('/admin/logout', adminAuth, async (req, res) => {
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
    app.patch('/admin', adminAuth, async (req, res) => {
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