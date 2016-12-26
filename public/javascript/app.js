$(document).ready(function(){

	var articleList = [];
	var articleId = '';
	var article = '';
	var previousArticle = 0;
	var currentArticle = 0;
	var nextArticle = 0;	

	$('#comments').addClass('hidden');

	$.getJSON('/scrape', function(){
	});

	$(document).on('click','#getArticles', function(){
		$.getJSON('/articles', function(data){
			articleList = data;
			article = articleList[0];
			showArticle(article);
		}); 		
	});

	$(document).on('click','.previous', function(){
		article = articleList[previousArticle];
		currentArticle = previousArticle;
		showArticle(article);
	}); 

	$(document).on('click','.next', function(){
		article = articleList[nextArticle];
		currentArticle = nextArticle;
		showArticle(article);
	}); 

	$(document).on('click','#addComment', function(){
		if($('#commentText').val() != '') {
			var comment = $('#commentText').val();
			$.post("/addcomment/" + articleId, {comment: comment}, function(e) {
				e.preventDefault();
			});
			$('#commentText').val('');
			showComments(articleId);
		}
	});	
	

	var showArticle = function(article) {
		$('#title').text(article.title);
		$("#image").removeClass("hidden");
		$('#image').attr('src', article.imgLink);
		$('#summary').text(article.summary);
		$("#readArticle").removeClass("hidden");
		$('#article').attr('href', article.storyLink);
		$("#getArticles").addClass("hidden");
		$("#navigation").empty();
		previousArticle = currentArticle - 1;
		if(previousArticle >= 0) {
			$('#navigation').append('<button id="'+previousArticle+'" class="btn btn-primary previous">Previous Article</button>');
		} else {
			$('#navigation').append('<button id="'+previousArticle+'" class="btn btn-primary disabled previous">Previous Article</button>');
		}
		nextArticle = currentArticle + 1;
		if(nextArticle < articleList.length) {
			$('#navigation').append('<button id="'+nextArticle+'" class="btn btn-primary pull-right next">Next Article</button>');
		} else {
			$('#navigation').append('<button id="'+nextArticle+'" class="btn btn-primary pull-right disabled next">Next Article</button>');
		}
		articleId = article._id;
		showComments(articleId);
	}

	var showComments = function(articleId) {
		$("#comments").removeClass("hidden");
		$("#articleComments").empty();
		var commentText = '';
		$.getJSON('comments/'+articleId, function(data){
			for(var i = 0; i < data.length; i++){
				commentText = commentText + '<p'+data[i]._id+'>'+data[i].comment+'<span id="deleteComment" class="glyphicon glyphicon-remove text-danger"></span></p>';
			}
			$("#articleComments").append(commentText);
		});
	}



});