'use strict';
var helpers = require('broccoli-kitchen-sink-helpers');
var crypto = require('crypto');
var statPathsFor = require('./lib/stat-paths-for');

/* @public
 *
 * @method hashForDep
 * @param {String} name name of the dependency
 * @param {String} dir (optional) root dir to run the hash resolving from
 * @param {String} _hashTreeOverride (optional) private, used internally for testing
 * @return {String} a hash representing the stats of this module and all its descendents
 */
module.exports = function hashForDep(name, dir, _hashTreeOverride) {
  var inputHashes = statPathsFor(name, dir).map(_hashTreeOverride || helpers.hashTree).join(0x00);

  return crypto.createHash('sha1').
    update(inputHashes).digest('hex');
};
