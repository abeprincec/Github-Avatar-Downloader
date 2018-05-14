var request = require('request');
var token = require('./secerts.js');

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
getRepoContributors('jquery', 'jquery', function(err, result) {
	if (err) {
		console.log('Errors:', err);
	}
	var avatar_url = JSON.parse(result);
	console.log('Result:');

	avatar_url.map(elem => console.log(elem.avatar_url));
});
