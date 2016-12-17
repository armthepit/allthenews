// NPM Modules

var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');

var Articles = require("../models/articles");

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
	res.redirect('/index');
});

router.get('/scrape', function(req,res){
    request(url, function(error, response, html) {	
        // load that into cheerio and save it to $ for a shorthand selector
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
				if(err) throw err;
				if(articleRecord == null) {
					Articles.create(result[i], function(err, record) {
						if(err) throw err;
						console.log("Record Added");
					})
				} else {
					console.log("No Record Added");
				}
			});
		});
    });
});

router.get('/index', function(req, res){
	res.render('index');
})

router.get('/articles', function(req,res){
	Articles.find({}, function(err, doc){
		if(err) throw err;
		res.json(doc);
	})
})

module.exports = router;