var request = require('request');
var token = require('./secerts.js');
var fs = require('fs');

console.log('Welcome to Github Avatar Downloader!');

var GITHUB_TOKEN = token.GITHUB_TOKEN;
function getRepoContributors(repoOwner, repoName, cb) {
	var options = {
		url:
			'https://api.github.com/repos/' +
			repoOwner +
			'/' +
			repoName +
			'/contributors',
		headers: {
			'User-Agent': 'Github-Avatar-Downloader',
			Authorization: GITHUB_TOKEN,
		},
	};

	request(options, function(err, res, body) {
		cb(err, body);
	});
}

// function getRepoContributors(repoOwner, repoName, cb) {
//     var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
//     request(url, function(err, res, body) {
//       cb(err, body);
//     });
//   }

var owner = process.argv[2];
var repo = process.argv[3];

if(!owner || !repo) {
   return console.log("Please insert owner and repo on command line")
}

getRepoContributors(owner, repo, function(err, result) {
	if (err) {
		console.log('Errors:', err);
	}
	var users = JSON.parse(result);

	var FILE_PATH = './avatars/';
	users.forEach(element => {
		downloadImageByURL(element.avatar_url, FILE_PATH + element.login + '.jpg');
	});
	//downloadImageByURL(contributors_url, "avatars/dhh.jpg")
});

function downloadImageByURL(url, filePath) {
	// ...
	request
		.get(url)
		.on('error', function(err) {
			throw err;
		})
		.on('response', function(response) {
			console.log(`Downloading image...`); // Note 3
			console.log('Response Status Code: ', response.statusMessage);
			response.headers['content-type'];
		})
		.pipe(fs.createWriteStream(filePath))
		.on('finish', function() {
			console.log('Downloading complete');
		});
}

//console.log(repoContributors());
