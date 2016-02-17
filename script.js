var sites = ["Workshop", "Yard", "Warehouse"];
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

$(document).ready(function() {	
	for (var i = 0; i < sites.length; i++) {
		$('#site-menu').append($('<option value="'+sites[i].toLowerCase()+'">'+sites[i]+'</option>'));
	}
	
	$('#data-table').tablesorter();
	
	$('#reset-filter-button').click(resetAllFilters);
	$('#daterangeinput').daterangepicker();
	$('#id1').daterangepicker();
});