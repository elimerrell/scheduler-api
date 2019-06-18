const mongoose = require('mongoose'); 

const MeetingSchema = mongoose.Schema({
	title: String, 
	meetingTime: Date, 
	comments: String,
	dayOfWeek: String
}, { 
	timestamps: true 
}); 

module.exports = mongoose.model('Meeting', MeetingSchema); 
