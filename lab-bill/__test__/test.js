'use strict';

const client = require('../lib/client.js');
const cmd = require('../lib/cmd.js');
const server = require('../server.js');

describe('#Floor', function() {
    it('should take in a floating point number, and return the previous whole integer', function() {
      expect(math.floor(1.123)).toEqual(1)
      expect(math.floor(1.123)).not.toEqual(1.123)
    })