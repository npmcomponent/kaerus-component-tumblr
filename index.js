var ajax = require('ajax'),
	script = require('script'),
	promise = require('promise'),
	api_url = "http://api.tumblr.com/v2/blog/";


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

function mergeOptions(target,source){
    for(var key in source) {
        target[key] = source[key];
    }
    
    return target;
}

Tumblr.prototype.get = function(api,options,requestOptions){
	var ret = new promise();

	options = mergeOptions({jsonp:"tumblrCallback"},options); 

	window[options.jsonp] = function(data){
		ret.fulfill(data);
	}	

	script(this.url(api,options),requestOptions).then(function(loaded){
		/* ok, great */
	},function(error){
		ret.reject(error);
	});

	return ret;
}

Tumblr.prototype.post = function(api,data,options,requestOptions){
	return ajax.post(this.url(api,options),requestOptions,data);
}

module.exports = Tumblr;