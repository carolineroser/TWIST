var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    topicCode: {type: String, required: true,},
    title: {type: String, },
    description: {type: String, max: 100},
});

// virtual for url
TopicSchema
.virtual('url')
.get(function() {
    return '/catalog/topic/' + this._id;
});

TopicSchema
.virtual('topic')
.get(function() {
	return this.title + ': ' + this.description;
});
//export
module.exports = mongoose.model('Topic', TopicSchema);