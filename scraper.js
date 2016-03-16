var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "http://substack.net/images/";

request(url, function(error, response, body){
	if (!error && response.statusCode == 200){
    $ = cheerio.load(body);
    var urlStr = "";

		$('a').map(function(ind, ele){
      var link = $(this).text();
      var extension = link.substr(link.length -4);
      if (extension[0] === '.'){
        var code = $(this).closest('tr').find('code').first().text();
        var add = code+","+url+link+","+extension+",";
        urlStr += add;
      }
    });

  fs.writeFile("./scrapped.csv", urlStr, function(err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
	}
});
