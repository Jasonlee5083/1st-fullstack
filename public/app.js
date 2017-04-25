	var app = angular.module("scheduleApp", ["ngMaterial", "materialCalendar"]);

	app.config(function ($mdIconProvider, $$mdSvgRegistry) {
		// Add default icons from angular material
		$mdIconProvider
			.icon('md-close', $$mdSvgRegistry.mdClose)
			.icon('md-menu', $$mdSvgRegistry.mdMenu)
			.icon('md-toggle-arrow', $$mdSvgRegistry.mdToggleArrow);
	});

	app.controller("scheduleController", function ($window, $scope, scheduleService, $filter, MaterialCalendarData, $http) {
		$scope.schedule = [];
		
		scheduleService.getSchedule().then(function (response) {
			$scope.schedule = response;
			console.log(response);
		})

		$scope.submit = function (input) {
			scheduleService.postSchedule(input).then(function (data) {
				$window.location.reload();
			})
		}

		$scope.remove = function (index, id) {

			scheduleService.removeSchedule(id).then(function (response) {
				$scope.schedule.splice(index, 1);
				$window.location.reload();

			})
		}

		$scope.save = function (editItem) {
			scheduleService.saveSchedule(editItem).then(function(response){
				$state.reload();
			});
		}

		$scope.dayFormat = "d";

		// To select a single date, make sure the ngModel is not an array.
		$scope.selectedDate = null;

		// If you want multi-date select, initialize it as an array.
		$scope.selectedDate = [];

		$scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
		$scope.setDirection = function (direction) {
			$scope.direction = direction;
			$scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
		};

		$scope.dayClick = function (date) {
			$scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
		};

		$scope.prevMonth = function (data) {
			$scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
		};

		$scope.nextMonth = function (data) {
			$scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
		};

		$scope.tooltips = true;

		$scope.setDayContent = function (date, content) {
			
			// You would inject any HTML you wanted for
			// that particular date here.

			date = new Date(date)
			date = date.toString()
			console.log(date)
			console.log(typeof date)

			return scheduleService.getScheduleContent("/schedule/content?date=" + date).then(function (response) {
				if (!response.data) {
					return `<p></p>` 
				}
				return `<small><p class="one">${response.data}</p></small>`;


				//			return scheduleService.getScheduleContent("/schedule/content?place="+place).then(function(response){
				//				if (!response.data){
				//					return `<p>`
				//				}
				//				return `<p>${response.data}</p>`;

			})



		};

		$scope.day = new Date("2017/04/25");

		//	$scope.setDayContent(day, "<p>hey jason</p>")

	})
		app.filter("Event", function () {
		return function (info) {
			if (info === undefined) {
				return;
			}
			return 'Event: ' + info;
		}
	});

	app.filter("Place", function () {
		return function (info) {
			if (info === undefined) {
				return;
			}
			return 'Place: ' + info;
		}
	});

	app.filter("Date", function () {
		return function (info) {
			if (info === undefined) {
				return;
			}
			return 'Date: ' + info;
		}
	});

	app.filter("Stime", function () {
		return function (info) {
			if (info === undefined) {
				return;
			}
			return 'Start Time: ' + info;
		}
	});

	app.filter("Etime", function () {
		return function (info) {
			if (info === undefined) {
				return;
			}
			return 'End Time: ' + info;
		}
	});

	app.filter("Description", function () {
		return function (info) {
			if (info === undefined) {
				return;
			}
			return 'Description: ' + info;
		}
	});

	app.filter('removeCharacters', function(){
		return function(val, numberOfCharacters){
			if(val === "Invalid Date"){
				return "The date was either not submitted or submitted incorrectly"
			}
			
			return val.slice(0, val.length - numberOfCharacters);
		}
	})