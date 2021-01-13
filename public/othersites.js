const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const controller = require('../controller/controller');

async function GET(url) {
    const OK = 200;
    let res = await fetch(url);
    if(res.status !== OK)
        throw new Error(res.status);
    return await res.json();
}

router
    .get('/', (req, res) => {
        GET('https://krdo-joke-registry.herokuapp.com/api/services')
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    })
    .get('/otherjokes/:site', (req, res) => {
        controller.getOtherSiteJokes(req.params.site)
            .then(result => res.json(result))
            .catch(err => console.log("error: " + err))
    });

module.exports = router;