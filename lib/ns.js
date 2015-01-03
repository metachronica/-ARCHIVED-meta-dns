/**
 * ns.js
 *
 * @author Viacheslav Lotsmanov
 * @license GNU/GPLv3
 */

var dns = require('native-dns');
var posix = require('posix');

var config = require('./config');
var handler = require('./handler');

var uid = posix.getpwnam(config.privileges.user).uid;
var gid = posix.getgrnam(config.privileges.group).gid;

function onError(err, buff, req, res) {
	console.error(err.stack);
}

function onListening() {
	console.log('Server listening on', this.address());
	console.log('Drop privileges to %s:%s',
		config.privileges.user, config.privileges.group);
	process.setgid( gid );
	process.setuid( uid );
}

function onSocketError(err, socket) {
	console.error(err);
}

function onClose() {
	console.log('Server closed', this.address());
}

function initServer(server, port, host) {
	server.on('request', handler);
	server.on('error', onError);
	server.on('listening', onListening);
	server.on('socketError', onSocketError);
	server.on('close', onClose);
	server.serve(port, host);
}

var server = dns.createServer();
initServer(server, config.port, config.host);
