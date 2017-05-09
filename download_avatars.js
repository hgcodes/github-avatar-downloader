var GITHUB_USER = "sevenveils";
var GITHUB_TOKEN = "6e2637ddad31997de7e89b662b64f8954620e75f";

var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'User-Agent': 'sevenveils'
  }
};
  request(options, cb);

}

getRepoContributors(process.argv[2], process.argv[3], function(err, response, body) {
  let parsedResults = JSON.parse(body);
  for (var i = 0; i < parsedResults.length; i++) {
    console.log(parsedResults[i]["avatar_url"]);
    downloadImageByURL(parsedResults[i]["avatar_url"], `avatars/${i}.jpg`)
  }
  // console.log(parsedResults);
  // console.log("Errors:", err);
  // console.log("Result:", parsedResults);
});
  function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath))
}

