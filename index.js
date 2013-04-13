var ajax = require('ajax');

var api_url = "http://api.tumblr.com/v2/blog/";

function Tumblr(user,key){
	this.key = key;
	this.path = api_url + user + '.tumblr.com' + '/';
}

function urlOptions(o){
    if(typeof o !== 'object') return '';

    return Object.keys(o).reduce(function(a,b,c){
        c = b + '=' + o[b];
        return !a ? '?' + c : a + '&' + c;
    },'');
}

Tumblr.prototype = {
	"get": function(api,options,requestOptions){
		options = options ? options : {};
		options.api_key = this.key;

		return ajax.get(this.path+api+urlOptions(options),requestOptions);
	},
	"post": function(api,data,options,requestOptions){
		options = options ? options : {};
		options.api_key = this.key;

		return ajax.post(this.path+api+urlOptions(options),requestOptions,data);
	}
}

module.exports = Tumblr;