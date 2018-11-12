const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';
const userInfo = 'userInfo';

const findOneUserInfo = function (contact) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, function (err, db) {
            const dbo = db.db(dbName);
            dbo.collection(userInfo).findOne(
                contact,
                function (err, res) {
                    db.close();
                    resolve(res);
                });
        });
    });
}

const registerUserInfo = function (contact) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, function (err, db) {
            var dbo = db.db(dbName);
            dbo.collection(userInfo).insertOne(contact, function (err, res) {
                db.close();
                resolve(res);
            });
        });
    });
}

module.exports = {
    findOneUserInfo, registerUserInfo
};