var sites = ["Workshop", "Yard", "Warehouse"];
var dataList;

/*
var MobileServiceClient = WindowsAzure.MobileServiceClient;
var client = new MobileServiceClient('https://tapintosafetydev.azure-mobile.net/',
			'');
var userTable = client.getTable('devTestUser');

var query = userTable.where({}).read().done(function(results) {
	alert("Done");
}, function(err) {
	alert(err);
});
*/

function resetAllFilters() {
	dataList.search();
	dataList.filter();
	$('#site-menu').prop('selectedIndex', 0);
	$('.result-range-box').val('');
}

function searchTable() {
	dataList.search($('#search-field').val(), ['firstName', 'lastName']);
}

function filterTestResult() {
	dataList.filter(function(item) {
		console.log($('#lower-range').val()=='');
		var testResult = item.values().testResult.split('/')[0];
		var lower = ($('#lower-range').val() == '') ? '0' : $('#lower-range').val();
		var upper = ($('#upper-range').val() == '') ? '20' : $('#upper-range').val();
		console.log(lower);
		if (parseInt(testResult) >= parseInt(lower) && parseInt(testResult) <= parseInt(upper))
			return true;
		return false;
	});
}

$(document).ready(function() {	
	for (var i = 0; i < sites.length; i++) {
		$('#site-menu').append($('<option value="'+sites[i].toLowerCase()+'">'+sites[i]+'</option>'));
	}
	
	$('#data-table').tablesorter();
	
	var options = {
	valueNames: ['firstName', 'lastName', 'site', 'dateJoined', 'testResult', 'testDate']
	};
	dataList = new List('table-container', options);
	
	$('#reset-filter-button').click(resetAllFilters);
	
	$('#search-button').click(searchTable);
	$('#search-field').keyup(searchTable);
	$('#lower-range').keyup(filterTestResult);
	$('#upper-range').keyup(filterTestResult);
	
	$('#site-menu').change(function() {
		dataList.search(document.getElementById('site-menu').value, ['site']);
		console.log(document.getElementById('site-menu').value);
	});
	
	$('#daterangeinput').daterangepicker({
			locale: {
				format: 'DD/MM/YYYY'
			}
		},
		function(start, end, label) {
			dataList.filter(function(item) {
				console.log(start);
				var parts = item.values().dateJoined.split("/");
				var itemDate = new Date(parseInt(parts[2], 10),
					parseInt(parts[1], 10) - 1,
					parseInt(parts[0], 10));
				parts = start.format('DD/MM/YYYY').split("/");
				var startDate = new Date(parseInt(parts[2], 10),
					parseInt(parts[1], 10) - 1,
					parseInt(parts[0], 10));	
				parts = end.format('DD/MM/YYYY').split("/");
				var endDate = new Date(parseInt(parts[2], 10),
					parseInt(parts[1], 10) - 1,
					parseInt(parts[0], 10));
				if (itemDate >= startDate && itemDate <= endDate)
					return true;
				else
					return false;
			});
		}
	);
});