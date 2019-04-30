var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var TICKETS_COLLECTION = 'tickets';

var app = express();
app.use(bodyParser.json());

/* Create a database variable outside of the database connection  */
/* callback to reuse the connection pool in your app */
var db;

/* Connect to the database before starting the application server */
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
    if (err)
    {
        console.log(err);
        process.exit(1);
    }

/*     Save database object from the callback for reuse */
    db = client.db();
    console.log("Database connection ready");

/*     Initialize the app */
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port ", port);
    });
});

/* TICKETS API ROUTES BELOW */

/* Generic error handler used by all endpoints */
function handleError(res, reason, message, code)
{
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error" : message });
}

app.get('/rest/tickets', function(req, res) {
    db.collection(TICKETS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err)
        {
            handleError(res, err.message, "Failed to get tickets.");
        }
        else
        {
            res.status(200).json(docs);
        }
    });
});

app.post('rest/ticket', function(req, res) {
    var new_ticket = req.body;
    new_ticket.createDate = new Date();

    if (!req.body.created_at   ||
        !req.body.updated_at   ||
        !req.body.type         ||
        !req.body.subject      ||
        !req.body.description  ||
        !req.body.priority     ||
        !req.body.submitter    ||
        !req.body.assignee_id  ||
        !req.body.follower_ids ||
        !req.body.tags)
    {
        handleError(res, "Incomplete Ticket Info", "Fill All Fields", 400);
    }
    else
    {
        db.collection(TICKETS_COLLECTION).insertOne(new_ticket, function (err, doc) {
            if (err)
            {
                handleError(res, err.message, "Failed to create ticket.");
            }
            else
            {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});
