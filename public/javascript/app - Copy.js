$(document).ready(function(){

	var previousArticle = 0;
	var currentArticle = 0;
	var nextArticle = 0;
	var articleList = [];
	var display = '';

	//Scrape for new articles
	$.ajax({
	type: "GET",
	url: '/scrape'
	}).done(function() {
		console.log('scraped');
	}).fail(function() {
		alert("Sorry. Server unavailable.");
	});

	//Read database for articles
	// $.getJSON('/articles', function(data) {
	// 	for( var i = 0; i < data.length; i++) {
	// 		articleList.push(data[i]);
	// 		console.log(articleList);
	// 	}
	// }).done(function() {
	// 	// console.log(articleList);
	// });

	$.getJSON('/articles', function(data) {
		for( var i = 0; i < data.length; i++) {
			articleList.push(data[i]);
			console.log(articleList);
		}
	}).done(function() {
		console.log(articleList);
	});	

	// Display First Article
	displayArticle(currentArticle);

 	function displayArticle(currentArticle) {
 		console.log(articleList[currentArticle]);
 		// display = articleList[currentArticle].title;
 		$(".content").append(display);
 	}

});