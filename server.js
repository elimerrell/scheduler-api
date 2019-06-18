const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//create express app 
const app = express(); 

//allow cors requests 
app.use(cors())

// parse requests of content-type application/url encoded 
app.use(bodyParser.urlencoded({ extended: true } ))

// parse requests of content-type application/json
app.use(bodyParser.json())

//configure mongo db 
const dbConfig = require('./config/database.config.js'); 
const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise 

//connect to mongo db 
mongoose.connect(dbConfig.url, { 
	useNewUrlParser: true 
}).then(() => {
	console.log('the database is connected'); 
}).catch(error => {
	console.log('Could not connect to the database', error); 
	process.exit(); 
}); 

// define a route
app.get('/', (req, resp) => { 
	resp.json({"message" : "Here is a test response from our express server"})
}); 

// require Meeting routes 
require('./app/routes/meeting.routes.js')(app);

//listen 
app.listen(3000, () => { 
	console.log('The express server is listening on port 3000')
}); 


