const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        controller.getJokes()
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    })
    .post('/', (req, res) => {
        let joke = undefined;
        const { setup, punchline, jokeId } = req.body;
        controller.createJoke(setup, punchline)
            .then(jok => {
                joke = jok;
                return controller.getJoke(jokeId);
            })
            .then(() => res.json({ message: 'Joke Saved!' }))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    });

module.exports = router;