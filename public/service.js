var app = angular.module("scheduleApp");

app.service("scheduleService",function($http){
	this.getSchedule = function() {
		return $http.get("/schedule").then(function(response){
			return response.data;
		})
	}
	
	this.postSchedule = function(newitem) {
		return $http.post("/schedule", newitem).then(function(response){
			return response.data;
		})
	}
		
	
	this.removeSchedule = function(id) {
		return $http.delete("/schedule/" + id).then(function(response){
			return "you item has been deleted";
		})
	}
	
	
	this.saveSchedule = function(newitem) {
		return $http.put("/schedule/"+ newitem._id, newitem).then(function(response){
			return response.data;
		})
	}
})