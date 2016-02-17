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
	$('#site-menu').prop('selectedIndex', 0);
	$('.result-range-box').val('');
}

function searchTable() {
	dataList.search($('#search-field').val(), ['firstName', 'lastName']);
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
	
	$('#daterangeinput').daterangepicker();
	$('#id1').daterangepicker();
});