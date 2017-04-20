var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
	event:String,
	place:String,
	date:String,
	stime:String,
	etime:String,
	description:String,
	
})

var Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;