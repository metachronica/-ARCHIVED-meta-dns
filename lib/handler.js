/**
 * handler.js
 *
 * @author Viacheslav Lotsmanov
 * @license GNU/GPLv3
 */

var dns = require('native-dns');
var config = require('./config');

function requestHandler(req, res) {
	if (config.logging_requests) console.log('Request:', req);

	var reqDomain = req.question[0].name;
	var found = false; // if true then all next domains will be skiped

	config.routing.forEach(function (item) {
		switch (item.type) {
			case 'A':
				if (item.filter.indexOf(reqDomain) < 0) return true;
				var resA;
				// return addresses
				item.address.forEach(function (addr) {
					resA = {
						name: reqDomain,
						address: addr,
						ttl: config.request_timeout
					};
					res.answer.push(dns.A(resA));
				});
				found = true;
				break;

			default:
				console.error('Unsupported record type:', type);
		}

		if (found) return false;
	});

	res.send();
	if (config.logging_requests) console.log('Response "A":', res.answer);
}

module.exports = requestHandler;
