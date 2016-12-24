$(document).ready(function(){

	var previousArticle = 0;
	var currentArticle = 0;
	var nextArticle = 0;
	var article = '';
	var articleList = [];

	$.getJSON('/scrape', function(){
	});

	$(document).on('click','#getArticles', function(){
		$.getJSON('/articles', function(data){
			articleList = data;
			article = articleList[0];
			showArticle(article);
		}); 		
	});



	var showArticle = function(article) {
		$('#title').text(article.title);
		$("#image").removeClass("hidden");
		$('#image').attr('src', article.imgLink);
		$('#summary').text(article.summary);
		$("#readArticle").removeClass("hidden");
		$('#article').attr('href', article.storyLink);
		$("#getArticles").addClass("hidden");
		$("#comments").removeClass("hidden");
		previousArticle = currentArticle - 1;
		if(previousArticle > 0) {
			$('#navigation').append('<button id="'+previousArticle+'" class="btn btn-primary">Previous Article</button>');
		} else {
			$('#navigation').append('<button id="'+previousArticle+'" class="btn btn-primary disabled">Previous Article</button>');
		}
		nextArticle = currentArticle + 1;
		if(nextArticle < articleList.length) {
			$('#navigation').append('<button id="'+nextArticle+'" class="btn btn-primary pull-right">Next Article</button>');
		} else {
			$('#navigation').append('<button id="'+nextArticle+'" class="btn btn-primary pull-right disabled">Next Article</button>');
		}
		var articleId = article._id;
		showComments(articleId);
	}

	var showComments = function(articleId) {
		var comments = '';
		$.getJSON('getcomments/'+articleId, function(data){
			console.log(data.length);
			for(var i = 0; i < data.length; i++){
				comments = comments + '<p'+data[i]._id+'>'+data[i].comment+'<span id="deleteComment" class="glyphicon glyphicon-remove text-danger"></span></p>';
			}
			$("#comment").append(comments);
		});
	}


});