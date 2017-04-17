var express = require("express");
var Schedule = require("../models/schedule-schema");
var scheduleRoute = express.Router();

scheduleRoute

	.get("/",function(req,res){
		Schedule.find(req.params,function(err,scheduleArray){
		res.send(scheduleArray)
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
			scheduleToBeDeleted.remove(function(err){
				res.send("your info has been deleted");
			})
		})
})

	.put("/:id",function(req,res){
		Schedule.findByIdAndUpdate(req.params.id, req.body, {new:true},
			function(err,editedSchedule){
				res.send(editedSchedule);
		})
})

module.exports = scheduleRoute;


