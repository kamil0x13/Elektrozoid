const PORT = process.env.PORT || 3001
const MONGODB_URL = 'mongodb+srv://Elektrozoid:Elektrozoid@cluster0.wdhfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const JWT_SECRET = 'SecretFroGit'
const JWT_SECRET_ADMIN = 'SecretFroGit2'

module.exports = {
    PORT,
    MONGODB_URL,
    JWT_SECRET
}