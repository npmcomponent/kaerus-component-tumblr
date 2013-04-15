var ajax = require('ajax');

var api_url = "http://api.tumblr.com/v2/blog/";


function Tumblr(user,key){

	this.path = api_url + user + '.tumblr.com' + '/';
	this.key = key;

	/* initialize plugins */
	for(var i = 0; Tumblr.prototype.plugin[i]; i++ )
		Tumblr.prototype.plugin[i].apply(this);
}

Tumblr.prototype.plugin = [];

Tumblr.prototype.url = function(api,options){
	if(typeof options === 'object'){
		options = Object.keys(options).reduce(function(a,b,c){
        	c = b + '=' + options[b];
        	return !a ? '&' + c : a + '&' + c;
    	},'');
	} 
	else options = '';

	return this.path+api+'/?api_key='+this.key+options;
}

Tumblr.prototype.get = function(api,options,requestOptions){
	return ajax.get(this.url(api,options),requestOptions);
}

Tumblr.prototype.post = function(api,data,options,requestOptions){
	return ajax.post(this.url(api,options),requestOptions,data);
}

module.exports = Tumblr;