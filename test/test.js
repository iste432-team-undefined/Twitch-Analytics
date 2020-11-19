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
        assert.strictEqual(data[0].id_user, 1);
    });
  });

  describe('#getDashboard(1)', function() {
    it('Should return the dashboard of id 1 ', async function() {
        const data = await DBconn.getDashboard(1);
        assert.strictEqual(data[0].id_dashboard, 1);
    });
  });

  describe('#getView(1)', function() {
    it('Should return the view of id 1 ', async function() {
        const data = await DBconn.getView(1);
        assert.strictEqual(data[0].id_view, 1);
    });
  });

  describe('#getUserDashboardIds(1)', function() {
    it('Should return the dashboards for user with uid 1 ', async function() {
        const data = await DBconn.getUserDashboardIds(1);
        assert.strictEqual(data[0].id_dashboard, 1);
    });
  });

  describe('#getDashboardViewIds(1)', function() {
    it('Should return the views that relate to dashboard with id 1 ', async function() {
        const data = await DBconn.getDashboardViewIds(1);
        assert.strictEqual(data[0].id_view, 1);
    });
  });

  describe('#createDashboard("test", 1)', function() {
    it('Should return an int as the id that was inserted ', async function() {
        const data = await DBconn.createDashboard("test",1);
        assert.strictEqual(typeof data.id_dashboard, 'number');
    });
  });
});