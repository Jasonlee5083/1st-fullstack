var app = angular.module("scheduleApp");

app.service("scheduleService",function($http){
	this.getSchedule = function() {
		return $http.get("/schedule").then(function(response){
			return response.data;
		})
	}
	
	this.getScheduleContent = function(urlString) {
		return $http.get(urlString)
	}
	
	this.postSchedule = function(newitem) {
		
		newitem.date = new Date(newitem.date);
		newitem.date = newitem.date.toString();
		
		
		return $http.post("/schedule", newitem).then(function(response){
			response.data.date = new Date(response.data.date);
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