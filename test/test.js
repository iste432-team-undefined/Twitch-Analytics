var assert = require('assert');
var DBconn = require('../db');

describe('Database', function() {
  describe('#testConn()', function() {
    it('Should return a result with 1 row ', async function() {
        const data = await DBconn.testConn();
        assert.strictEqual(data.length, 1);
    });
  });
});