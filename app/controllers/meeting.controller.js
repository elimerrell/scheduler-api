const Meeting = require('../models/meeting.model.js'); 

// create a new meeting 
exports.create = (req, res) => {
	// console.log(req)
	//validate request 
	if(!req.body.title) {
		return res.status(400).send({
			message: 'Meeting title cannot be empty' 
		});  
	}
	// console.log(req.body.title)
	// console.log(req.body.meetingTime)
	// console.log(req.body.comments)
	//create a new meeting 
	const meeting = new Meeting({
		title: req.body.title, 
		meetingTime: req.body.meetingTime, 
		comments: req.body.comments,
		dayOfWeek: req.body.dayOfWeek
	}); 

	//save meeting to mongo 
	meeting.save()
	.then(data => { 
		res.send(data); 
	}).catch(err => {
		res.status(500).send({ 
			message: err.message 
		});
	}); 

};  

//return all meetings from database 
exports.findAll = (req, res) => { 
	Meeting.find()
	.then(meetings => { 
		res.send(meetings); 
	}).catch(err => { 
		res.status(500).send({ 
			message: err.message 	
		}); 
	}); 

};  

//find a single meeting 
exports.findOne = (req, res) => { 
	Meeting.findById(req.params.meetingId) 
	.then(meeting => {
		if(!meeting) { 
			return res.status(404).send({ 
				message: "meeting not found with id " + req.params.meetingId
			}); 
		} 
		res.send(meeting); 
	}).catch(err => { 
		if(err.kind === 'ObjectId') { 
			return res.status(404).send({ 
				message: "Meeting not found with id " + req.params.meetingId
			}); 
		}
		return res.status(500).send({ 
			message: "Error retrieving meeting with id " + req.params.meetingId
		}); 
	}); 

} 

//update a meeting
exports.update = (req, res) => { 
	//validate request 
	if(!req.body.meetingTime) { 
		return res.status(400).send({ 
			message: "Meeting time cannot be empty" 
		}); 
	}

	//find meeting and update
	Meeting.findByIdandUpdate(req.params.meetingId, {
		title : req.body.title, 
		meetingTime: req.body.meetingTime, 
		comments: req.body.comments
	}, {new: true}) 
	.then(meeting  => { 
		if(!meeting) {
			return res.status(404).send({ 
				message: "Meeting not found with id " + req.params.meetingId
			}); 
		} 
		res.send(meeting); 
	}).catch(err => { 
		if(err.kind === 'ObjectId') { 
			return res.status(404).send({ 
				message: "meeting not found with id " + req.params.meetingId
			}); 
		} 
		return res.status(500).send({ 
			message: "Error updating meeting with id " + req.params.nodeId 
		}); 
	}); 
}; 
 
//delete a meeting
exports.delete = (req, res) => { 
	Meeting.findByIdAndRemove(req.params.meetingId) 
	.then(meeting => { 
		if(!meeting) { 
			return res.status(404).send({ 
				message: "meeting not found with id " + req.params.meetingId
			}); 
		}
		res.send({message: "Meeting deleted successfully!"}); 
	}).catch(err => { 
		if(err.kind === 'ObjectId'|| err.name === 'NotFound') { 
			return res.status(404).send({ 
				message: "Meeting not found with id " + req.params.meetingId
			}); 
		} 
		return res.status(500).send({ 
			message: "could not delete meeting with id " + req.params.meetingId
		}); 
	});  
}; 
