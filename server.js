var express = require('express');
var chalk = require('chalk');
var app = express();
var router = express.Router();
var port = process.env.PORT || 80;

var tickets = [
    {
        "id": 35436,
        "created_at": "2015-07-20T22:55:29Z",
        "updated_at": "2016-05-05T10:38:52Z",
        "type": "incident",
        "subject": "MFP not working right",
        "description": "PC Load Letter? What does that even mean???",
        "priority": "med",
        "status": "open",
        "recipient": "support_example@selu.edu",
        "submitter": "Michael_bolton@selu.edu",
        "assignee_id": 235323,
        "follower_ids": [235323, 234],
        "tags": ["enterprise", "printers"],
    },
    {
        "id": 234,
        "created_at": "2015-07-20T22:55:29Z",
        "updated_at": "2016-05-05T10:38:52Z",
        "type": "incident",
        "subject": "MFP not working right",
        "description": "PC Load Letter? What does that even mean???",
        "priority": "med",
        "status": "open",
        "recipient": "support_example@selu.edu",
        "submitter": "Michael_bolton@selu.edu",
        "assignee_id": 235323,
        "follower_ids": [235323, 234],
        "tags": ["enterprise", "printers"],
    }
];

/* Endpoint for listing all ticket objects at URL/rest/list */
router.get('/list', function (req,res) {
    res.status(200).send(JSON.stringify(tickets));
});

/* Endpoint for retrieving a ticket object at URL/rest/ticket/#id */
router.get('/ticket/:id', function (req,res) {
    for ( i = 0; i < tickets.length; i++ )
    {
        if (tickets[i].id === req.params.id)
        {
            ticket.tickets[i];
        }
    }
    res.status(200).send(JSON.stringify(ticket));
});

/**
 *  Endpoint for posting a new ticket. Add JSON object to request
 *  body section of Postman for URL/ticket
 */
router.post('/ticket', function (req, res) {
    ticket = {
        id: req.body.id,
        createdat: req.body.createdat,
        updatedat: req.body.updatedat,
        type: req.body.type,
        subject: req.body.subject,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        recipient: req.body.recipient,
        submitter: req.body.submitter,
        assignee_id: req.body.assignee_id,
        follower_id: req.body.follower_id,
        tags: req.body.tags
    };
    tickets.push(ticket);
    res.status(200).send(JSON.stringify(ticket));
});


app.use('/rest', router);

app.listen(port, function() {
    console.log("Node app is running at localhost: " + port)
  });
