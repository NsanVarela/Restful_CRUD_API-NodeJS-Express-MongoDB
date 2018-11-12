const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';
const contact = 'contact';

const findContactWithLimit = function (limit) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, function (err, db) {
            const dbo = db.db(dbName);
            dbo.collection(contact).find({}).limit(limit).toArray(function (err, res) {
                db.close();
                resolve(res);
            });
        });
    });
}

const findOneContact = function (user) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, function (err, db) {
            const dbo = db.db(dbName);
            dbo.collection(contact).findOne(
                user,
                function (err, res) {
                    db.close();
                    resolve(res);
                });
        });
    });
}

const deleteContact = function (user) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, function (err, db) {
            const dbo = db.db(dbName);
            dbo.collection(contact).deleteOne(user, function (err, res) {
                db.close();
            });
            dbo.collection(contact).find({}).limit(20).toArray(function (err, res) {
                db.close();
                resolve(res);
            })
        });
    });
}

const addContact = function (contact) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, function (err, db) {
            const dbo = db.db(dbName);
            dbo.collection(contact).insertOne(user, function (err, res) {
                db.close();
                resolve(res);
            });
        });
    });
}

const updateContact = function (user, userUpdated) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        }, function (err, db) {
            const dbo = db.db(dbName);
            dbo.collection(contact).updateOne(user, userUpdated, function (err, res) {
                db.close();
            });
            dbo.collection(contact).find({}).limit(10).toArray(function (err, res) {
                db.close();
                resolve(res);
            });
        });
    });
}


module.exports = {
    findContactWithLimit,
    findOneContact,
    updateContact,
    deleteContact,
    addContact,
    
};