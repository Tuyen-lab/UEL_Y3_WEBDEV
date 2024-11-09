const mongoose = require('mongoose');
require('dotenv/config')
async function connect() {
try {
await mongoose.connect( process.env.DB_URL, {});
console.log('Connect successful!');
} catch (error) {
console.log(error.message);
}
};
module.exports = { connect };