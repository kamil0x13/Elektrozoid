const { JWT_SECRET_ADMIN } = require('../../config/dev')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tokens: [{
        token:{
            type: String,
            required: true,
        }
    }]
})

//Dodaje nowy token i zwraca go w wyniku
adminSchema.methods.generateAuthToken = async function () {
    const token = jsonwebtoken.sign({ _id: this._id.toString() }, JWT_SECRET_ADMIN)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

//Static

//Szukanie po loginie
adminSchema.statics.findByLogin = async (login) => {
    const admin = await Admin.findOne({ login })
    if (!user) {
        throw new Error('Brak użytkownika w bazie!')
    }
    return user
}

//Sprawdzanie logowania
adminSchema.statics.findByCredentials = async (login, password) => {
    const admin = await Admin.findOne({ login })
    if (!admin) {
        throw new Error('Niepoprawne dane logowania!')
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
        throw new Error('Niepoprawne dane logowania!')
    }
    return admin
}

//Hash hasło przed zapisaniem
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin