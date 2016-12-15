// NPM Modules

var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');

// Website To Be Scraped
var url = "http://www.goodnewsnetwork.org/latest-news/";

// Test Route To Verify Scraping Works From Route
router.get('/test', function(req, res) {
    // body of the html with request
    // request('http://www.goodnewsnetwork.org/latest-news/', function(error, response, html) {
    request(url, function(error, response, html) {	
        // load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
		var result = [];
		$(".span6").each(function(i, element) {
			var title = $(element).find("a").find("img").attr("title");
			var storyLink = $(element).find("a").attr("href");
			var imgLink = $(element).find("a").find("img").attr("src");
			var summary = $(element).find(".td-post-text-excerpt").text();
			// Push the image's URL (saved to the imgLink var) into the result array
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


module.exports = router;