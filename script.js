var sites = ["Workshop", "Yard", "Warehouse"];
/*
var MobileServiceClient = WindowsAzure.MobileServiceClient;
var client = new MobileServiceClient('',
			'');
var userTable = client.getTable('devTestUser');

var query = userTable.where({}).read().done(function(results) {
	alert("Done");
}, function(err) {
	alert(err);
});
*/
$(document).ready(function() {
	$('input[name="daterange"]').daterangepicker();
	for (var i = 0; i < sites.length; i++) {
		$('#site-menu').append($('<option value="'+sites[i].toLowerCase()+'">'+sites[i]+'</option>'));
	}
	$('#data-table').tablesorter();
});