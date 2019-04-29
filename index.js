let tickets = require('./data/ticket.json')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const morgan = require('morgan')
const filename = './data/tickets.json'

const PORT = process.env.PORT || 8080

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message : 'Hello World' })
})


const getNewId = (array) => {
    if (array.length > 0)
    {
        return array[array.length - 1].id + 1
    }
    else
    {
        return 1
    }
}

const newDate = new Date().toString()

function mustBeInteger(req, res, next)
{
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) { res.status(400).json({ message : "ID must be an integer" }) }
    else { next() }
}

function mustBeInArray(array, id)
{
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row)
        {
            reject({
                message : 'bad ID',
                status  : 404
            })
        }
        resolve(row)
    })
}

function writeJSONFile(filename, content)
{
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) { console.log(err) }
    })
}

function getTickets()
{
    return new Promise((resolve, reject) => {
        if (tickets.length === 0)
        {
            reject({
                message : 'no tickets available',
                status  : 202
            })
        }
    })
}

function getTicket(id)
{
    return new Promise((resolve, reject) => {
        mustBeInArray(tickets, id)
        .then(ticket => resolve(ticket))
        .catch(err => reject(err))
    })
}


/* GET All Tickets */
router.get('/rest/list', async (req, res) => {
    await pickets.getTickets()
    .then(tickets => res.json(tickets))
        .catch(err => {
            if (err.status) { res.status(err.status).json({ message : err.message }) }
            else { res.status(500).json({ message : err.message }) }
        })
})

/* GET Ticket By ID */
router.get('/ticket/:id', mustBeInteger, async (req, res) => {
    const id = req.params.id

    await ticket.getTicket(id)
    .then(ticket => res.json(ticket))
        .catch(err => {
            if (err.status) { res.status(err.status).json({ message : err.message }) }
            else { res.status(500).json({ message : err.message }) }
        })
})

app.listen('8080')
