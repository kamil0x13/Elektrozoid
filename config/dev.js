const PORT = process.env.PORT || 3001
const MONGODB_URL = 'mongodb+srv://Elektrozoid:Elektrozoid@cluster0.wdhfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const JWT_SECRET = 'SecretFroGit'
const JWT_SECRET_ADMIN = 'SecretFroGit2'

const CLOUDINARY_API_KEY='394699458655173'
const CLOUDINARY_API_SECRET='FO9XopkGiEwyJvZajSg76-IUvC8'
const CLOUDINARY_NAME='elektrozoid'

module.exports = {
    PORT,
    MONGODB_URL,
    JWT_SECRET,
    JWT_SECRET_ADMIN,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME
}