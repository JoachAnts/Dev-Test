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
	
	$('#data-table').tablesorter({widgets: ['zebra']});//.tablesorterPager({container: $('#pager')});
	
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
	
	/*
	$('table.paginated').each(function() {
		var currentPage = 0;
		var numPerPage = 5;
		var $table = $(this);
		$table.bind('repaginate', function() {
			$table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
		});
		$table.trigger('repaginate');
		var numRows = $table.find('tbody tr').length;
		var numPages = Math.ceil(numRows / numPerPage);
		var $pager = $('<div class="pager"></div>');
		for (var page = 0; page < numPages; page++) {
			$('<span class="page-number"></span>').text(page + 1).bind('click', {
				newPage: page
			}, function(event) {
				currentPage = event.data['newPage'];
				$table.trigger('repaginate');
				$(this).addClass('active').siblings().removeClass('active');
			}).appendTo($pager).addClass('clickable');
		}
		$pager.insertBefore($table).find('span.page-number:first').addClass('active');
	});
	*/
});