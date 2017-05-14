var express = require("express");
var Schedule = require("../models/schedule-schema");
var scheduleRoute = express.Router();

scheduleRoute

	.get("/",function(req,res){
			Schedule.find(req.query,function(err,scheduleArray){
			res.send(scheduleArray)
		})
	})
	.get("/content",function(req,res){
		Schedule.find({date: new Date(req.query.date)},function(err,scheduleArray){
		
			var sendString = "";	
			for (var i = 0; i < scheduleArray.length; i++){
				sendString += " " + scheduleArray[i].event;
			}


			res.send(sendString)
		})
	})


	.post("/",function(req,res){
		newSchedule = new Schedule(req.body);
		console.log(req.body);
		newSchedule.save(function(err,savedSchedule){
			res.send(savedSchedule);
		})
}) 

	.delete("/:id",function(req,res){
		Schedule.findByIdAndRemove(req.params.id,function(err,scheduleToBeDeleted){
				res.send("your info has been deleted");
		})
})

	.put("/:id",function(req,res){
		Schedule.findByIdAndUpdate(req.params.id, req.body, {new:true},
			function(err,editedSchedule){
				res.send(editedSchedule);
		})
})

module.exports = scheduleRoute;


