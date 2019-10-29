const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
// const { bookmarks } = require('../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

const bookmarks = [{
    name: 'Thinkful',
    description: 'Think outside the classroom',
    Rating: '5 Stars'
}]

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks);
    })
    .post(bodyParser, (req, res) => {
        const { name, description, rating } = req.body;

        if (!name) {
            logger.error(`Name is required`);
            return res
              .status(400)
              .send('Invalid data');
          }
          
          if (!description) {
            logger.error(`Description is required`);
            return res
              .status(400)
              .send('Invalid data');
          }

          if (!rating) {
            logger.error(`Rating is required`);
            return res
              .status(400)
              .send('Invalid data');
          }

          const id = uuid();

          const bookmark = {
              id,
              name,
              description,
              rating
          };

          bookmarks.push(bookmark);

          logger.info(`Bookmark with id ${id} created`);

            res
            .status(201)
            .location(`http://localhost:8000/bookmarks/${id}`)
            .json(bookmark);
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find(b => b.id == id);

        if (!bookmark) {
            logger.error(`Bookmark with ID ${id} not found.`);
            return res
                .status(404)
                .send('Bookmark not found.');
        }
    res.json(bookmark);    
    })
    .delete((req, res) => {
        const { id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with ID ${id} not found`);
            return res
                .status(404)
                .send('Not Found');
        }

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with ID ${id} deleted.`);
        res
            .status(204)
            .end();
    })

module.exports = bookmarksRouter
