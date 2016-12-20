$(document).ready(function(){

	var previousArticle = 0;
	var currentArticle = [];
	var nextArticle = 0;
	var articleList = [];
	var display = '';

	$.getJSON('/scrape', function(){
	});

	$(document).on('click','#getArticles', function(){
		$.getJSON('/articles', function(data){
			currentArticle = data[0];
			buildArticle(currentArticle);
		}); 		
	});



	var buildArticle = function(currentArticle) {
		$('#title').text(currentArticle.title);
		$("#image").removeClass("hidden");
		$('#image').attr('src', currentArticle.imgLink);
		$('#summary').text(currentArticle.summary);
		$("#readArticle").removeClass("hidden");
		$('#article').attr('href', currentArticle.storyLink);
		$("#getArticles").addClass("hidden");
		$("#comments").removeClass("hidden");		
	}




});