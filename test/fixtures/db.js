const User = require('../../src/dbModels/user')

const setupDatabaseUser = async () => {
    await User.deleteMany()
}

module.exports = {
    setupDatabaseUser
}