var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
	event:String,
	place:String,
	date:Number,
	stime:Number,
	etime:Number,
	description:String,
	todolists:[String]
	
})

var Schedule =mongoose.model('Schedule',scheduleSchema);

module.exports = Schedule;