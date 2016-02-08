'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();
	var _this = $(this);

	// Get the div ID, e.g., "project3"
	var projectID = _this.closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("/project/" + idNumber, function (data) {
		_this.parent().find('.details').html(detailsHtml(data));
	});
}

function detailsHtml(data) {
	return '<div class="col-md-12"><h3>' + data.title + ' <span class="small"> ' + data.date + '</span></h3>' +
	'<p>' + data.summary + '</p>' +
	'<img src="' + data.image + '" alt="' + data.title + '" class="detailsImage"/></div>';
}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get('/palette', applyColors);
}

function applyColors(data) {
	var colors = data.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', 0.75);
}
