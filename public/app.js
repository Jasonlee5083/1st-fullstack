var app = angular.module("scheduleApp",[]);
console.log("success")
app.controller("scheduleController",function($scope,scheduleService) {
	$scope.schedule =[];
	scheduleService.getSchedule().then(function(response){
		$scope.schedule = response;
		console.log(response);
	})
	
	$scope.submit = function(input) {
		scheduleService.postSchedule(input).then(function(data){
			$scope.schedule.push(data);
		})
	}
	
	$scope.remove = function(index,id) {
		
		scheduleService.removeSchedule(id).then(function(response){
			$scope.schedule.splice(index,1);
		})
	}
	
	$scope.save = function(editItem) {
		scheduleService.saveSchedule(editItem);
	}

})