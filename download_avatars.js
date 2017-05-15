var GITHUB_USER = "sevenveils";
var GITHUB_TOKEN = "6e2637ddad31997de7e89b662b64f8954620e75f";

var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName){
    console.log("ERROR! You did not enter a valid repo owner or repo name.");
  } else {
    var options =  {
      url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': 'sevenveils'
      }
    };

    request(options, cb);
  }
}

function downloadingImageByURL(url, filepath) {
  console.log('Downloading avatar', url, 'to:', filepath);
  request(url).pipe(fs.createWriteStream(filepath));
}
getRepoContributors(process.argv[2], process.argv[3], function(err, result, body) {
  if (err || result.statusCode !== 200) {
    console.log('Error retrieving avatars:', err);
    console.log('HTTP status code:', result.statusCode);
    console.log('Error message:', result.statusMessage);
  } else {
    let parsedResults = JSON.parse(body);
    for (var i = 0 ; i < parsedResults.length; i++) {
      let entry = parsedResults[i];
      let avatarUrl = entry['avatar_url'];
      downloadingImageByURL(avatarUrl, `avatars/${entry.login}.jpg`);
    }
  }
});
