$(document).ready(function(){

	var previousArticle = 0;
	var currentArticle = 0;
	var nextArticle = 0;
	var articleList = [];

	// scrape();
	// getArticles();

	// var scrape = function() {
		$.ajax({
		type: "GET",
		url: '/scrape'
		}).done(function() {
			console.log('scraped');
		}).fail(function() {
			alert("Sorry. Server unavailable.");
		});
	// };	

		$.getJSON('/articles', function(data) {
			for( var i = 0; i < data.length; i++) {
				articleList.push(data[i]);
			}
		}).done(function() {
			console.log(articleList);
		});





});