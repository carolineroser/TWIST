var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    sessionNum: {type: Number, required: true},
	sessionName: {type: String, required: true}, //enum: ['Accounting/Finance', 'Attorney', 'City Government', 'Communications and Marketing', 'Food Science', 'Graphic Designer', 'Highway Patrol', 'Pediatric Care', 'Pharmacy', 'Pilot', 'Speech Pathology', 'Social Work/Mental Health', 'Zoo Veterinary Medicine'], default: 'Attorney'},
    time: {type: String, required: true}
});

// virtual for url
SessionSchema
.virtual('url')
.get(function() {
    return '/catalog/session/' + this._id;
});

//virtual for Description
SessionSchema
.virtual('Session')
.get(function() {
	return "Session " + this.sessionNum + ": " + this.sessionName;
});
//export
module.exports = mongoose.model('Session', SessionSchema);