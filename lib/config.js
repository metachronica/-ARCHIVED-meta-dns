/**
 * config.js
 *
 * @author Viacheslav Lotsmanov
 * @license GNU/GPLv3
 */

var path = require('path');

var configPath = path.join(process.cwd(), 'config.json');
if (process.env.CONFIG_PATH) configPath = process.env.CONFIG_PATH;

var config = require(configPath);

module.exports = config;
