const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
// const { cards, lists } = require('../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        // Get request code here
    })
    .post(bodyParser, (req, res) => {
        // Post request code here
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        // Get request code here
    })
    .delete((req, res) => {
        // Delete request code here
    })

module.exports = bookmarksRouter
