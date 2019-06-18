module.exports = (app) => { 
	const meetings = require('../controllers/meeting.controller.js'); 

	//new meeting
	app.post('/meetings', meetings.create); 

	//all meetings 
	app.get('/meetings', meetings.findAll); 

	//single meeting 
	app.get('/meetings/:meetingId', meetings.findOne); 

	//patch meeting 
	app.put('/meetings/:meetingId',  meetings.update); 

	//delete a meeting 
	app.delete('/meetings/:meetingId', meetings.delete); 
}
