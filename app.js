var	express = require('express'),
	app = express(),
	uaParser = require('ua-parser2')(),
	langParser = require('accept-language-parser');
	//requestLanguage = require('express-request-language');
	
/*app.use(requestLanguage({
	languages:['zh-CN']
}));*/

app.set('port',process.env.PORT || 3000);
	
app.get('/',function(req,res) {
	console.log(req.ips);
	var osName = uaParser.parse(req.headers['user-agent']).os.toString(),
		languageObj = langParser.parse(req.headers['accept-language'])[0],
		language = languageObj.code + (languageObj.region ? '-' + languageObj.region : '');
	res.send({ip:req.ip,os:osName,language:language});
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});