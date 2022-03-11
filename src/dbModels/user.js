const { JWT_SECRET } = require('../../config/dev')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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

//Dodaje nowy token do usera i zwraca go w wyniku
userSchema.methods.generateAuthToken = async function () {
    const token = jsonwebtoken.sign({ _id: this._id.toString() }, JWT_SECRET)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Static

//Szukanie usera po loginie
userSchema.statics.findByLogin = async (email) => {
    const user = await User.findOne({ login })
    if (!user) {
        throw new Error('Brak użytkownika w bazie!')
    }
    return user
}

//Sprawdzanie logowania
userSchema.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({ login })
    if (!user) {
        throw new Error('Niepoprawne dane logowania!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Niepoprawne dane logowania!')
    }
    return user
}

//Hash hasło przed zapisaniem
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User