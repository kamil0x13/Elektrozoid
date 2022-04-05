const mongoose = require('mongoose');


main().then(() => {
    console.log("Successfully connected to database");
  }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://Elektrozoid:Elektrozoid@cluster0.wdhfo.mongodb.net/Elektrozoid?retryWrites=true&w=majority');
}
