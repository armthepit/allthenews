// NPM Modules

var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');
var Promise = require("bluebird");

mongoose.Promise = Promise;

var Articles = require("../models/articles");
var Comments = require("../models/comments");

// Website To Be Scraped
var url = "http://www.goodnewsnetwork.org/latest-news/";

// Test Route To Verify Scraping Works From Route
router.get('/test', function(req, res) {
    // body of the html with request
    request(url, function(error, response, html) {
        // load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
		var result = [];
		$(".span6").each(function(i, element) {
			var title = $(element).find("a").find("img").attr("title");
			var storyLink = $(element).find("a").attr("href");
			var imgLink = $(element).find("a").find("img").attr("src");
			var summary = $(element).find(".td-post-text-excerpt").text();
			summary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
			result.push({ 
				Title: title,
				Story: storyLink,
				Link: imgLink,
				Summary: summary
			});
		});
		console.log(result);
		res.send(result);
    });
});

router.get('/', function(req, res){
	res.render('index');
});

router.get('/scrape', function(req,res){
    request(url, function(error, response, html) {	
        var $ = cheerio.load(html);
		var result = [];
		$(".span6").each(function(i, element) {
		    var title = $(element).find("a").find("img").attr("title");
		    var imgLink = $(element).find("a").find("img").attr("src");
		    var storyLink = $(element).find("a").attr("href");
		    var summary = $(element).find(".td-post-text-excerpt").text();
		    summary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
			result[i] = ({ 
				title: title,
				imgLink: imgLink,
				storyLink: storyLink,
				summary: summary
			});	
			Articles.findOne({'title': title}, function(err, articleRecord) {
				if(err) {
					console.log(err);
				} else {
					if(articleRecord == null) {
						Articles.create(result[i], function(err, record) {
							if(err) throw err;
							console.log("Record Added");
						});
					} else {
						console.log("No Record Added");
					}					
				}
			});	
		});
    });	
});

router.get('/articles', function(req,res){
	Articles.find().sort({ createdAt: -1 }).exec(function(err, data) { 
		if(err) throw err;
		res.json(data);
	});
});

router.get('/getcomments/:id', function(req,res){
	Comments.find({'articleId': req.params.id}).exec(function(err, data) {
		if(err) {
			console.log(err);
		} else {
			res.json(data);
		}	
	});
});

module.exports = router;