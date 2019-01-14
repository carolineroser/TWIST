var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PresenterSchema = new Schema({
    lastName: {type: String, required: true,},
    firstName: {type: String, },
    occupation: {type: String, },
    mainPhone: {type: String, },
    mobilePhone: {type: String, },
    email: {type: String, },
});

// virtual for url
PresenterSchema
.virtual('url')
.get(function() {
    return '/catalog/presenter/' + this._id;
});

PresenterSchema
.virtual('name')
.get(function() {
	return this.lastName + ", " + this.firstName;
});
//export
module.exports = mongoose.model('Presenter', PresenterSchema);