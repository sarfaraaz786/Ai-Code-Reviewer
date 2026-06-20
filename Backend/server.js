require('dotenv').config();
const app = require('./src/app.js');
const connectToDB = require('./src/config/database.js')

const PORT = process.env.PORT;


connectToDB();

app.listen(PORT,() => { // server will start from here and execute this arrow function
    console.log(`Server is running on port: ${PORT}` );
});