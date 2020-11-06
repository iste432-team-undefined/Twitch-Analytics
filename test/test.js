var assert = require('assert');
var DBconn = require('../db');

describe('Database', function() {
  describe('#testConn()', function() {
    it('Should return a result with 1 row ', async function() {
        const data = await DBconn.testConn();
        assert.strictEqual(data.length, 1);
    });
  });

  describe('#getUser(1)', function() {
    it('Should return the name of user id 1 ', async function() {
        const data = await DBconn.getUser(1);
        assert.strictEqual(data[0].username, "test1");
    });
  });

  describe('#getDashboardName(1)', function() {
    it('Should return the title of dashboard id 1 ', async function() {
        const data = await DBconn.getDashboardName(1);
        assert.strictEqual(data[0].title, "StreamerName");
    });
  });
});