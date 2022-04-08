const { JWT_SECRET } = require('../../config/dev')
const { JWT_SECRET_ADMIN } = require('../../config/dev')
const jwt = require('jsonwebtoken')
const User = require('../dbModels/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_SECRET_ADMIN)
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!admin) {
            throw new Error()
        }
        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = {
    auth, adminAuth
}